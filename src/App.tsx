import React, { useState, useEffect, useMemo } from 'react';
import { 
  BookOpen, 
  Brain, 
  List, 
  ChevronRight, 
  ChevronLeft, 
  RotateCcw, 
  CheckCircle2, 
  XCircle,
  Volume2,
  Search,
  Trophy
} from 'lucide-react';
import { vocabulary, Word } from './data/words';
import { db } from '../firebase';
import { 
  collection, 
  addDoc, 
  onSnapshot, 
  query, 
  orderBy,
  Timestamp,
  updateDoc,
  doc
} from 'firebase/firestore';

type ViewMode = 'flashcards' | 'quiz' | 'list' | 'add';

export default function App() {
  const [viewMode, setViewMode] = useState<ViewMode>('flashcards');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [dbWords, setDbWords] = useState<Word[]>([]);
  
  // Form state
  const [newWord, setNewWord] = useState({
    chinese: '',
    pinyin: '',
    vietnamese: '',
    exampleChinese: '',
    examplePinyin: '',
    exampleVietnamese: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Quiz state
  const [quizScore, setQuizScore] = useState(0);
  const [quizFinished, setQuizFinished] = useState(false);
  const [quizOptions, setQuizOptions] = useState<string[]>([]);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);

  // Combine static vocabulary with database words
  // sources (original arrays) and local edits map for static entries
  const allVocabularySources = useMemo(() => {
    return [...vocabulary, ...dbWords];
  }, [dbWords]);

  const [localEdits, setLocalEdits] = useState<Record<string, Partial<Word>>>({});

  const allVocabulary = useMemo(() => {
    return allVocabularySources.map(w => ({ ...w, ...((localEdits[String(w.id)]) || {}) }));
  }, [allVocabularySources, localEdits]);

  // Fetch words from Firestore
  useEffect(() => {
    try {
      const q = query(collection(db, "words"), orderBy("createdAt", "desc"));
      const unsubscribe = onSnapshot(q, (snapshot) => {
        const words = snapshot.docs.map(doc => ({
          id: doc.id as any,
          ...doc.data()
        })) as Word[];
        setDbWords(words);
      }, (error) => {
        console.error("Lỗi Firestore:", error);
      });
      return () => unsubscribe();
    } catch (e) {
      console.error("Chưa cấu hình Firebase:", e);
    }
  }, []);

  const filteredVocabulary = useMemo(() => {
    return allVocabulary.filter(word => 
      word.chinese.toLowerCase().includes(searchQuery.toLowerCase()) ||
      word.pinyin.toLowerCase().includes(searchQuery.toLowerCase()) ||
      word.vietnamese.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [searchQuery, allVocabulary]);

  const currentWord = filteredVocabulary[currentIndex] || allVocabulary[0];

  // Initialize quiz options
  const generateQuizOptions = (correctWord: Word) => {
    const others = allVocabulary
      .filter(w => w.id !== correctWord.id)
      .sort(() => Math.random() - 0.5)
      .slice(0, 3)
      .map(w => w.vietnamese);
    
    const options = [...others, correctWord.vietnamese].sort(() => Math.random() - 0.5);
    setQuizOptions(options);
  };

  const handleAddWord = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newWord.chinese || !newWord.vietnamese) return;

    setIsSubmitting(true);
    try {
      await addDoc(collection(db, "words"), {
        ...newWord,
        createdAt: Timestamp.now()
      });
      setNewWord({
        chinese: '',
        pinyin: '',
        vietnamese: '',
        exampleChinese: '',
        examplePinyin: '',
        exampleVietnamese: ''
      });
      alert("Thêm từ mới thành công!");
      setViewMode('list');
    } catch (error) {
      console.error("Lỗi khi thêm từ:", error);
      alert("Lỗi: Bạn cần cấu hình Firebase API Key chính xác để sử dụng tính năng này.");
    } finally {
      setIsSubmitting(false);
    }
  };

  useEffect(() => {
    if (viewMode === 'quiz' && currentWord) {
      generateQuizOptions(currentWord);
      setSelectedOption(null);
      setIsCorrect(null);
    }
  }, [viewMode, currentIndex, currentWord]);

  const handleNext = () => {
    setIsFlipped(false);
    setCurrentIndex((prev) => (prev + 1) % filteredVocabulary.length);
  };

  const handlePrev = () => {
    setIsFlipped(false);
    setCurrentIndex((prev) => (prev - 1 + filteredVocabulary.length) % filteredVocabulary.length);
  };

  const handleQuizAnswer = (option: string) => {
    if (selectedOption) return;
    
    setSelectedOption(option);
    const correct = option === currentWord.vietnamese;
    setIsCorrect(correct);
    if (correct) setQuizScore(prev => prev + 1);

    setTimeout(() => {
      if (currentIndex === filteredVocabulary.length - 1) {
        setQuizFinished(true);
      } else {
        handleNext();
      }
    }, 1500);
  };

  const resetQuiz = () => {
    setCurrentIndex(0);
    setQuizScore(0);
    setQuizFinished(false);
    setSelectedOption(null);
    setIsCorrect(null);
  };

  const speak = (text: string) => {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'zh-CN';
    window.speechSynthesis.speak(utterance);
  };

  // Editing state for list mode
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editForm, setEditForm] = useState<Partial<Word>>({});
  const [editingIsFirestore, setEditingIsFirestore] = useState(false);

  const handleEditClick = (word: Word) => {
    setEditingId(String(word.id));
    setEditForm({
      chinese: word.chinese,
      pinyin: word.pinyin,
      vietnamese: word.vietnamese,
      exampleChinese: word.exampleChinese,
      examplePinyin: word.examplePinyin,
      exampleVietnamese: word.exampleVietnamese,
    });
    setEditingIsFirestore(typeof word.id === 'string');
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    setEditForm({});
    setEditingIsFirestore(false);
  };

  const handleSaveEdit = async () => {
    if (!editingId) return;
    const key = editingId;
    if (editingIsFirestore) {
      try {
        await updateDoc(doc(db, 'words', key), {
          ...editForm
        });
        handleCancelEdit();
      } catch (err) {
        console.error('Lỗi cập nhật Firestore:', err);
        alert('Lỗi khi lưu thay đổi vào Firestore.');
      }
    } else {
      setLocalEdits(prev => ({ ...prev, [key]: { ...(prev[key] || {}), ...editForm } }));
      handleCancelEdit();
    }
  };

  return (
    <div className="min-h-screen bg-stone-50 text-stone-900 font-sans">
      {/* Navigation Header */}
      <header className="bg-white border-b border-stone-200 sticky top-0 z-10">
        <div className="max-w-4xl mx-auto px-4 py-4 flex items-center justify-between">
          <h1 className="text-xl font-bold text-emerald-700 flex items-center gap-2">
            <BookOpen className="w-6 h-6" />
            <span>Học Tiếng Trung</span>
          </h1>
          <nav className="flex gap-1 bg-stone-100 p-1 rounded-lg">
            <button 
              onClick={() => setViewMode('flashcards')}
              className={`px-4 py-1.5 rounded-md text-sm font-medium transition-all ${viewMode === 'flashcards' ? 'bg-white shadow-sm text-emerald-700' : 'text-stone-500 hover:text-stone-700'}`}
            >
              Flashcards
            </button>
            <button 
              onClick={() => setViewMode('quiz')}
              className={`px-4 py-1.5 rounded-md text-sm font-medium transition-all ${viewMode === 'quiz' ? 'bg-white shadow-sm text-emerald-700' : 'text-stone-500 hover:text-stone-700'}`}
            >
              Trắc nghiệm
            </button>
            <button 
              onClick={() => setViewMode('list')}
              className={`px-4 py-1.5 rounded-md text-sm font-medium transition-all ${viewMode === 'list' ? 'bg-white shadow-sm text-emerald-700' : 'text-stone-500 hover:text-stone-700'}`}
            >
              Danh sách
            </button>
            <button 
              onClick={() => setViewMode('add')}
              className={`px-4 py-1.5 rounded-md text-sm font-medium transition-all ${viewMode === 'add' ? 'bg-white shadow-sm text-emerald-700' : 'text-stone-500 hover:text-stone-700'}`}
            >
              Thêm từ
            </button>
          </nav>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-8">
        {/* Add Word Mode */}
        {viewMode === 'add' && (
          <div className="max-w-lg mx-auto bg-white p-8 rounded-3xl shadow-xl border border-stone-100">
            <h2 className="text-2xl font-bold mb-6 text-emerald-700 flex items-center gap-2">
              <Brain className="w-6 h-6" />
              Thêm từ vựng mới
            </h2>
            <form onSubmit={handleAddWord} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-stone-700 mb-1">Chữ Hán *</label>
                <input 
                  required
                  type="text" 
                  className="w-full p-3 bg-stone-50 border border-stone-200 rounded-xl focus:ring-2 focus:ring-emerald-500/20 focus:outline-none"
                  value={newWord.chinese}
                  onChange={e => setNewWord({...newWord, chinese: e.target.value})}
                  placeholder="Ví dụ: 你好"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-stone-700 mb-1">Pinyin</label>
                <input 
                  type="text" 
                  className="w-full p-3 bg-stone-50 border border-stone-200 rounded-xl focus:ring-2 focus:ring-emerald-500/20 focus:outline-none"
                  value={newWord.pinyin}
                  onChange={e => setNewWord({...newWord, pinyin: e.target.value})}
                  placeholder="Ví dụ: nǐ hǎo"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-stone-700 mb-1">Nghĩa tiếng Việt *</label>
                <input 
                  required
                  type="text" 
                  className="w-full p-3 bg-stone-50 border border-stone-200 rounded-xl focus:ring-2 focus:ring-emerald-500/20 focus:outline-none"
                  value={newWord.vietnamese}
                  onChange={e => setNewWord({...newWord, vietnamese: e.target.value})}
                  placeholder="Ví dụ: Xin chào"
                />
              </div>
              
              <div className="pt-4 border-t border-stone-100">
                <h3 className="text-sm font-bold text-stone-400 uppercase tracking-wider mb-3">Ví dụ (Tùy chọn)</h3>
                <div className="space-y-3">
                  <input 
                    type="text" 
                    className="w-full p-3 bg-stone-50 border border-stone-200 rounded-xl focus:ring-2 focus:ring-emerald-500/20 focus:outline-none"
                    value={newWord.exampleChinese}
                    onChange={e => setNewWord({...newWord, exampleChinese: e.target.value})}
                    placeholder="Câu ví dụ tiếng Trung"
                  />
                  <input 
                    type="text" 
                    className="w-full p-3 bg-stone-50 border border-stone-200 rounded-xl focus:ring-2 focus:ring-emerald-500/20 focus:outline-none"
                    value={newWord.examplePinyin}
                    onChange={e => setNewWord({...newWord, examplePinyin: e.target.value})}
                    placeholder="Pinyin của ví dụ"
                  />
                  <input 
                    type="text" 
                    className="w-full p-3 bg-stone-50 border border-stone-200 rounded-xl focus:ring-2 focus:ring-emerald-500/20 focus:outline-none"
                    value={newWord.exampleVietnamese}
                    onChange={e => setNewWord({...newWord, exampleVietnamese: e.target.value})}
                    placeholder="Nghĩa của ví dụ"
                  />
                </div>
              </div>

              <button 
                type="submit"
                disabled={isSubmitting}
                className="w-full py-4 bg-emerald-600 text-white rounded-2xl font-bold hover:bg-emerald-700 transition-all shadow-lg shadow-emerald-600/20 disabled:opacity-50 mt-6"
              >
                {isSubmitting ? 'Đang lưu...' : 'Lưu từ vựng'}
              </button>
            </form>
          </div>
        )}
        {/* Flashcards Mode */}
        {viewMode === 'flashcards' && (
          <div className="flex flex-col items-center gap-8">
            <div className="w-full flex justify-between items-center text-stone-500 text-sm">
              <span>Từ vựng {currentIndex + 1} / {filteredVocabulary.length}</span>
              <div className="relative w-48">
                <Search className="absolute left-2 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400" />
                <input 
                  type="text" 
                  placeholder="Tìm kiếm..." 
                  className="w-full pl-8 pr-3 py-1 bg-white border border-stone-200 rounded-full text-xs focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
                  value={searchQuery}
                  onChange={(e) => {
                    setSearchQuery(e.target.value);
                    setCurrentIndex(0);
                  }}
                />
              </div>
            </div>

            <div className="relative w-full max-w-md aspect-[4/3] perspective-1000">
                <div
                  key={currentWord.id}
                  className="w-full h-full cursor-pointer"
                  onClick={() => setIsFlipped(!isFlipped)}
                >
                  <div
                    className={`w-full h-full relative card-inner ${isFlipped ? 'is-flipped' : ''}`}
                  >
                    {/* Front */}
                    <div className="absolute inset-0 backface-hidden bg-white rounded-3xl shadow-xl border border-stone-100 flex flex-col items-center justify-center p-8 text-center">
                      <div className="text-6xl font-bold mb-4 text-stone-800">{currentWord.chinese}</div>
                      <div className="text-xl text-stone-400 font-medium">{currentWord.pinyin}</div>
                      <button 
                        onClick={(e) => { e.stopPropagation(); speak(currentWord.chinese); }}
                        className="mt-6 p-3 bg-emerald-50 text-emerald-600 rounded-full hover:bg-emerald-100 transition-colors"
                      >
                        <Volume2 className="w-6 h-6" />
                      </button>
                      <div className="absolute bottom-6 text-stone-300 text-xs uppercase tracking-widest">Nhấn để xem nghĩa</div>
                    </div>

                    {/* Back */}
                    <div className="absolute inset-0 backface-hidden bg-emerald-600 rounded-3xl shadow-xl flex flex-col items-center justify-center p-8 text-center rotate-y-180">
                      <div className="text-4xl font-bold text-white mb-2">{currentWord.vietnamese}</div>
                      <div className="text-emerald-100/60 text-lg mb-6">{currentWord.chinese}</div>
                      
                      {currentWord.exampleChinese && (
                        <div className="bg-white/10 p-4 rounded-2xl w-full text-left border border-white/10">
                          <div className="text-xs text-emerald-200/60 uppercase tracking-wider mb-1">Ví dụ thực tế:</div>
                          <div className="text-white font-medium mb-1">{currentWord.exampleChinese}</div>
                          <div className="text-emerald-100/70 text-sm italic mb-1">{currentWord.examplePinyin}</div>
                          <div className="text-emerald-200 text-sm">{currentWord.exampleVietnamese}</div>
                        </div>
                      )}
                      
                      <div className="absolute bottom-6 text-emerald-200/40 text-xs uppercase tracking-widest">Nhấn để quay lại</div>
                    </div>
                  </div>
                </div>
            </div>

            <div className="flex gap-4">
              <button 
                onClick={handlePrev}
                className="p-4 bg-white border border-stone-200 rounded-2xl text-stone-600 hover:bg-stone-50 hover:border-stone-300 transition-all shadow-sm"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
              <button 
                onClick={handleNext}
                className="p-4 bg-white border border-stone-200 rounded-2xl text-stone-600 hover:bg-stone-50 hover:border-stone-300 transition-all shadow-sm"
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            </div>
          </div>
        )}

        {/* Quiz Mode */}
        {viewMode === 'quiz' && (
          <div className="max-w-md mx-auto">
            {!quizFinished ? (
              <div className="flex flex-col gap-6">
                <div className="flex justify-between items-center">
                  <span className="text-stone-500 font-medium">Câu {currentIndex + 1} / {filteredVocabulary.length}</span>
                  <span className="text-emerald-600 font-bold">Điểm: {quizScore}</span>
                </div>
                
                <div className="bg-white p-12 rounded-3xl shadow-lg border border-stone-100 text-center">
                  <div className="text-5xl font-bold mb-4">{currentWord.chinese}</div>
                  <div className="text-xl text-stone-400">{currentWord.pinyin}</div>
                </div>

                <div className="grid grid-cols-1 gap-3">
                  {quizOptions.map((option, idx) => {
                    const isSelected = selectedOption === option;
                    const isCorrectOption = option === currentWord.vietnamese;
                    let bgColor = 'bg-white hover:border-emerald-500';
                    let textColor = 'text-stone-700';
                    let icon = null;

                    if (selectedOption) {
                      if (isCorrectOption) {
                        bgColor = 'bg-emerald-500 border-emerald-500';
                        textColor = 'text-white';
                        icon = <CheckCircle2 className="w-5 h-5" />;
                      } else if (isSelected) {
                        bgColor = 'bg-rose-500 border-rose-500';
                        textColor = 'text-white';
                        icon = <XCircle className="w-5 h-5" />;
                      } else {
                        bgColor = 'bg-stone-50 border-stone-100 opacity-50';
                      }
                    }

                    return (
                      <button
                        key={idx}
                        disabled={!!selectedOption}
                        onClick={() => handleQuizAnswer(option)}
                        className={`w-full p-4 rounded-2xl border-2 text-left font-medium transition-all flex items-center justify-between ${bgColor} ${textColor}`}
                      >
                        <span>{option}</span>
                        {icon}
                      </button>
                    );
                  })}
                </div>
              </div>
            ) : (
              <div className="text-center py-12 bg-white rounded-3xl shadow-xl border border-stone-100 p-8">
                <Trophy className="w-20 h-20 text-yellow-500 mx-auto mb-6" />
                <h2 className="text-3xl font-bold mb-2">Hoàn thành!</h2>
                <p className="text-stone-500 mb-8 text-lg">Bạn đã trả lời đúng {quizScore} / {filteredVocabulary.length} câu hỏi.</p>
                <button 
                  onClick={resetQuiz}
                  className="flex items-center gap-2 mx-auto px-8 py-3 bg-emerald-600 text-white rounded-2xl font-bold hover:bg-emerald-700 transition-all shadow-lg shadow-emerald-600/20"
                >
                  <RotateCcw className="w-5 h-5" />
                  Làm lại
                </button>
              </div>
            )}
          </div>
        )}

        {/* List Mode */}
        {viewMode === 'list' && (
          <div className="flex flex-col gap-4">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-stone-400" />
              <input 
                type="text" 
                placeholder="Tìm kiếm từ vựng, pinyin hoặc nghĩa tiếng Việt..." 
                className="w-full pl-12 pr-4 py-3 bg-white border border-stone-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-emerald-500/20 shadow-sm"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            <div className="bg-white rounded-2xl shadow-sm border border-stone-200 overflow-hidden">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-stone-50 border-b border-stone-200">
                    <th className="px-6 py-4 text-xs font-bold text-stone-400 uppercase tracking-wider">Từ vựng</th>
                    <th className="px-6 py-4 text-xs font-bold text-stone-400 uppercase tracking-wider">Nghĩa</th>
                    <th className="px-6 py-4 text-xs font-bold text-stone-400 uppercase tracking-wider">Ví dụ</th>
                    <th className="px-6 py-4 text-xs font-bold text-stone-400 uppercase tracking-wider w-10"></th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-stone-100">
                  {allVocabularySources
                    .filter(word => (
                      (word.chinese || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
                      (word.pinyin || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
                      (word.vietnamese || '').toLowerCase().includes(searchQuery.toLowerCase())
                    ))
                    .map((word) => {
                      const key = String(word.id);
                      const effective = { ...word, ...(localEdits[key] || {}) } as Word;
                      const isEditing = editingId === key;

                      return (
                        <tr key={key} className="hover:bg-emerald-50/30 transition-colors group">
                          <td className="px-6 py-4">
                            {!isEditing ? (
                              <>
                                <div className="font-bold text-lg text-stone-800">{effective.chinese}</div>
                                <div className="text-xs text-stone-400 mt-1">{effective.pinyin}</div>
                                <div className="flex gap-2 mt-2 md:hidden">
                                  <button onClick={() => speak(effective.chinese)} className="p-2 text-stone-300 hover:text-emerald-600 transition-colors"><Volume2 className="w-5 h-5" /></button>
                                  <button onClick={() => handleEditClick(word)} className="px-3 py-1 text-sm bg-emerald-50 text-emerald-700 rounded">Sửa</button>
                                </div>
                              </>
                            ) : (
                              <div className="space-y-2">
                                <input value={editForm.chinese || ''} onChange={e => setEditForm(prev => ({ ...prev, chinese: e.target.value }))} className="w-full p-2 border rounded" />
                                <input value={editForm.pinyin || ''} onChange={e => setEditForm(prev => ({ ...prev, pinyin: e.target.value }))} className="w-full p-2 border rounded" />
                                <div className="flex gap-2 mt-2 md:hidden">
                                  <button onClick={handleSaveEdit} className="px-3 py-1 text-sm bg-emerald-600 text-white rounded">Lưu</button>
                                  <button onClick={handleCancelEdit} className="px-3 py-1 text-sm bg-stone-100 text-stone-700 rounded">Hủy</button>
                                </div>
                              </div>
                            )}
                          </td>
                          <td className="px-6 py-4">
                            {!isEditing ? (
                              <div className="text-emerald-700 font-medium">{effective.vietnamese}</div>
                            ) : (
                              <input value={editForm.vietnamese || ''} onChange={e => setEditForm(prev => ({ ...prev, vietnamese: e.target.value }))} className="w-full p-2 border rounded" />
                            )}
                          </td>
                          <td className="px-6 py-4">
                            {!isEditing ? (
                              effective.exampleChinese && (
                                <div className="max-w-xs">
                                  <div className="text-sm text-stone-700">{effective.exampleChinese}</div>
                                  <div className="text-xs text-stone-400 italic">{effective.examplePinyin}</div>
                                  <div className="text-xs text-emerald-600 mt-0.5">{effective.exampleVietnamese}</div>
                                </div>
                              )
                            ) : (
                              <div className="space-y-2">
                                <input value={editForm.exampleChinese || ''} onChange={e => setEditForm(prev => ({ ...prev, exampleChinese: e.target.value }))} className="w-full p-2 border rounded" placeholder="Ví dụ tiếng Trung" />
                                <input value={editForm.examplePinyin || ''} onChange={e => setEditForm(prev => ({ ...prev, examplePinyin: e.target.value }))} className="w-full p-2 border rounded" placeholder="Pinyin" />
                                <input value={editForm.exampleVietnamese || ''} onChange={e => setEditForm(prev => ({ ...prev, exampleVietnamese: e.target.value }))} className="w-full p-2 border rounded" placeholder="Nghĩa" />
                              </div>
                            )}
                          </td>
                          <td className="px-6 py-4">
                            <div className="hidden md:flex items-center gap-2 justify-end">
                              {!isEditing ? (
                                <>
                                  <button onClick={() => speak(effective.chinese)} className="p-2 text-stone-300 hover:text-emerald-600 transition-colors"><Volume2 className="w-5 h-5" /></button>
                                  <button onClick={() => handleEditClick(word)} className="px-3 py-1 text-sm bg-emerald-50 text-emerald-700 rounded">Sửa</button>
                                </>
                              ) : (
                                <>
                                  <button onClick={handleSaveEdit} className="px-3 py-1 text-sm bg-emerald-600 text-white rounded">Lưu</button>
                                  <button onClick={handleCancelEdit} className="px-3 py-1 text-sm bg-stone-100 text-stone-700 rounded">Hủy</button>
                                </>
                              )}
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                </tbody>
              </table>
              {filteredVocabulary.length === 0 && (
                <div className="p-12 text-center text-stone-400">
                  Không tìm thấy từ vựng nào phù hợp.
                </div>
              )}
            </div>
          </div>
        )}
      </main>

      <style>{`
        .perspective-1000 { perspective: 1000px; }
        .preserve-3d { transform-style: preserve-3d; }
        .backface-hidden { backface-visibility: hidden; }
        .rotate-y-180 { transform: rotateY(180deg); }
        .card-inner { transition: transform 0.6s; transform-style: preserve-3d; }
        .card-inner.is-flipped { transform: rotateY(180deg); }
      `}</style>
    </div>
  );
}
