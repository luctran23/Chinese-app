import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
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

type ViewMode = 'flashcards' | 'quiz' | 'list';

export default function App() {
  const [viewMode, setViewMode] = useState<ViewMode>('flashcards');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  
  // Quiz state
  const [quizScore, setQuizScore] = useState(0);
  const [quizFinished, setQuizFinished] = useState(false);
  const [quizOptions, setQuizOptions] = useState<string[]>([]);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);

  const filteredVocabulary = useMemo(() => {
    return vocabulary.filter(word => 
      word.chinese.toLowerCase().includes(searchQuery.toLowerCase()) ||
      word.pinyin.toLowerCase().includes(searchQuery.toLowerCase()) ||
      word.vietnamese.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [searchQuery]);

  const currentWord = filteredVocabulary[currentIndex] || vocabulary[0];

  // Initialize quiz options
  const generateQuizOptions = (correctWord: Word) => {
    const others = vocabulary
      .filter(w => w.id !== correctWord.id)
      .sort(() => Math.random() - 0.5)
      .slice(0, 3)
      .map(w => w.vietnamese);
    
    const options = [...others, correctWord.vietnamese].sort(() => Math.random() - 0.5);
    setQuizOptions(options);
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
          </nav>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-8">
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
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentWord.id}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="w-full h-full cursor-pointer"
                  onClick={() => setIsFlipped(!isFlipped)}
                >
                  <motion.div
                    animate={{ rotateY: isFlipped ? 180 : 0 }}
                    transition={{ duration: 0.6, type: 'spring', stiffness: 260, damping: 20 }}
                    className="w-full h-full relative preserve-3d"
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
                  </motion.div>
                </motion.div>
              </AnimatePresence>
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
                  {filteredVocabulary.map((word) => (
                    <tr key={word.id} className="hover:bg-emerald-50/30 transition-colors group">
                      <td className="px-6 py-4">
                        <div className="font-bold text-lg text-stone-800">{word.chinese}</div>
                        <div className="text-xs text-stone-400 mt-1">{word.pinyin}</div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-emerald-700 font-medium">{word.vietnamese}</div>
                      </td>
                      <td className="px-6 py-4">
                        {word.exampleChinese && (
                          <div className="max-w-xs">
                            <div className="text-sm text-stone-700">{word.exampleChinese}</div>
                            <div className="text-xs text-stone-400 italic">{word.examplePinyin}</div>
                            <div className="text-xs text-emerald-600 mt-0.5">{word.exampleVietnamese}</div>
                          </div>
                        )}
                      </td>
                      <td className="px-6 py-4">
                        <button 
                          onClick={() => speak(word.chinese)}
                          className="p-2 text-stone-300 hover:text-emerald-600 transition-colors"
                        >
                          <Volume2 className="w-5 h-5" />
                        </button>
                      </td>
                    </tr>
                  ))}
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
      `}</style>
    </div>
  );
}
