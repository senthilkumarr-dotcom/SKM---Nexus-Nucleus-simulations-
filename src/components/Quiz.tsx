import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { CheckCircle2, XCircle, HelpCircle, ArrowRight, RotateCcw, Award } from 'lucide-react';
import { QuizQuestion } from '../types';
import { cn } from '../utils';

interface QuizProps {
  questions: QuizQuestion[];
  onComplete?: (score: number) => void;
}

export default function Quiz({ questions, onComplete }: QuizProps) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [showResults, setShowResults] = useState(false);
  const [userAnswers, setUserAnswers] = useState<(number | null)[]>(new Array(questions.length).fill(null));

  const currentQuestion = questions[currentQuestionIndex];

  const handleOptionSelect = (index: number) => {
    if (isAnswered) return;
    setSelectedOption(index);
  };

  const handleCheckAnswer = () => {
    if (selectedOption === null) return;
    
    const isCorrect = selectedOption === currentQuestion.correctAnswer;
    if (isCorrect) {
      setScore(prev => prev + 1);
    }
    
    const newUserAnswers = [...userAnswers];
    newUserAnswers[currentQuestionIndex] = selectedOption;
    setUserAnswers(newUserAnswers);
    
    setIsAnswered(true);
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
      setSelectedOption(null);
      setIsAnswered(false);
    } else {
      setShowResults(true);
      onComplete?.(score + (selectedOption === currentQuestion.correctAnswer ? 1 : 0));
    }
  };

  const resetQuiz = () => {
    setCurrentQuestionIndex(0);
    setSelectedOption(null);
    setIsAnswered(false);
    setScore(0);
    setShowResults(false);
    setUserAnswers(new Array(questions.length).fill(null));
  };

  if (showResults) {
    const percentage = Math.round((score / questions.length) * 100);
    
    return (
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-white rounded-3xl p-8 border border-slate-200 shadow-xl text-center"
      >
        <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <Award className="w-10 h-10 text-blue-600" />
        </div>
        <h2 className="text-3xl font-black text-slate-900 mb-2">Quiz Complete!</h2>
        <p className="text-slate-500 mb-8 font-medium">You've finished the investigation assessment.</p>
        
        <div className="grid grid-cols-2 gap-4 mb-8">
          <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100">
            <div className="text-3xl font-black text-slate-900">{score}/{questions.length}</div>
            <div className="text-xs font-bold text-slate-400 uppercase tracking-widest mt-1">Score</div>
          </div>
          <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100">
            <div className="text-3xl font-black text-slate-900">{percentage}%</div>
            <div className="text-xs font-bold text-slate-400 uppercase tracking-widest mt-1">Accuracy</div>
          </div>
        </div>

        <button 
          onClick={resetQuiz}
          className="w-full py-4 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-2xl shadow-lg shadow-blue-200 transition-all flex items-center justify-center gap-2"
        >
          <RotateCcw className="w-5 h-5" />
          Retake Quiz
        </button>
      </motion.div>
    );
  }

  return (
    <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
      {/* Progress Bar */}
      <div className="h-1.5 bg-slate-100 w-full">
        <motion.div 
          initial={{ width: 0 }}
          animate={{ width: `${((currentQuestionIndex + 1) / questions.length) * 100}%` }}
          className="h-full bg-blue-600"
        />
      </div>

      <div className="p-8">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-2">
            <HelpCircle className="w-5 h-5 text-blue-600" />
            <span className="text-xs font-black text-slate-400 uppercase tracking-widest">Question {currentQuestionIndex + 1} of {questions.length}</span>
          </div>
          <div className="px-3 py-1 bg-blue-50 rounded-full text-[10px] font-bold text-blue-600 uppercase tracking-tighter border border-blue-100">
            Investigation Assessment
          </div>
        </div>

        <h3 className="text-xl font-bold text-slate-800 mb-8 leading-tight">
          {currentQuestion.question}
        </h3>

        <div className="space-y-3 mb-8">
          {currentQuestion.options.map((option, index) => {
            const isSelected = selectedOption === index;
            const isCorrect = isAnswered && index === currentQuestion.correctAnswer;
            const isWrong = isAnswered && isSelected && index !== currentQuestion.correctAnswer;

            return (
              <button
                key={index}
                onClick={() => handleOptionSelect(index)}
                disabled={isAnswered}
                className={cn(
                  "w-full p-4 rounded-2xl border-2 text-left transition-all flex items-center justify-between group",
                  isSelected && !isAnswered ? "border-blue-600 bg-blue-50/50" : "border-slate-100 hover:border-slate-200",
                  isCorrect ? "border-emerald-500 bg-emerald-50/50" : "",
                  isWrong ? "border-red-500 bg-red-50/50" : ""
                )}
              >
                <div className="flex items-center gap-4">
                  <div className={cn(
                    "w-8 h-8 rounded-xl flex items-center justify-center font-bold text-sm transition-colors",
                    isSelected && !isAnswered ? "bg-blue-600 text-white" : "bg-slate-100 text-slate-500 group-hover:bg-slate-200",
                    isCorrect ? "bg-emerald-500 text-white" : "",
                    isWrong ? "bg-red-500 text-white" : ""
                  )}>
                    {String.fromCharCode(65 + index)}
                  </div>
                  <span className={cn(
                    "font-bold text-slate-700",
                    isCorrect ? "text-emerald-700" : "",
                    isWrong ? "text-red-700" : ""
                  )}>{option}</span>
                </div>
                {isCorrect && <CheckCircle2 className="w-5 h-5 text-emerald-500" />}
                {isWrong && <XCircle className="w-5 h-5 text-red-500" />}
              </button>
            );
          })}
        </div>

        <AnimatePresence>
          {isAnswered && (
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className={cn(
                "p-6 rounded-2xl mb-8 border",
                selectedOption === currentQuestion.correctAnswer 
                  ? "bg-emerald-50 border-emerald-100" 
                  : "bg-red-50 border-red-100"
              )}
            >
              <div className="flex items-center gap-2 mb-2">
                <div className={cn(
                  "w-2 h-2 rounded-full",
                  selectedOption === currentQuestion.correctAnswer ? "bg-emerald-500" : "bg-red-500"
                )} />
                <span className={cn(
                  "text-[10px] font-black uppercase tracking-widest",
                  selectedOption === currentQuestion.correctAnswer ? "text-emerald-600" : "text-red-600"
                )}>
                  {selectedOption === currentQuestion.correctAnswer ? "Excellent!" : "Not quite"}
                </span>
              </div>
              <p className="text-sm font-medium text-slate-700 leading-relaxed">
                {currentQuestion.explanation}
              </p>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="flex justify-end">
          {!isAnswered ? (
            <button
              onClick={handleCheckAnswer}
              disabled={selectedOption === null}
              className="px-8 py-4 bg-slate-900 text-white font-bold rounded-2xl disabled:opacity-50 disabled:cursor-not-allowed transition-all hover:bg-slate-800"
            >
              Check Answer
            </button>
          ) : (
            <button
              onClick={handleNextQuestion}
              className="px-8 py-4 bg-blue-600 text-white font-bold rounded-2xl transition-all hover:bg-blue-700 flex items-center gap-2"
            >
              {currentQuestionIndex === questions.length - 1 ? "Finish Quiz" : "Next Question"}
              <ArrowRight className="w-5 h-5" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
