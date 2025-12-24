
import React, { useState } from 'react';
import { getAIFitnessAdvice } from '../services/geminiService';
import { Sparkles, Send, Bot, Loader2 } from 'lucide-react';

interface AICoachProps {
  workoutData: any;
}

const AICoach: React.FC<AICoachProps> = ({ workoutData }) => {
  const [prompt, setPrompt] = useState('');
  const [answer, setAnswer] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleAsk = async () => {
    if (!prompt.trim()) return;
    setLoading(true);
    setAnswer(null);
    try {
      const response = await getAIFitnessAdvice(workoutData, prompt);
      setAnswer(response || "Não consegui gerar uma resposta.");
    } catch (e) {
      setAnswer("Erro ao conectar com a IA.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-xl mb-8">
      <div className="bg-gradient-to-r from-indigo-600 to-violet-600 px-6 py-4 flex items-center gap-3">
        <Sparkles className="w-6 h-6 text-white" />
        <h3 className="font-bold text-white">Coach IA Gemini</h3>
      </div>
      
      <div className="p-6">
        <div className="flex gap-2">
          <input 
            type="text"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="Pergunte sobre sua evolução ou peça dicas de treino..."
            className="flex-1 bg-slate-950 border border-slate-700 rounded-lg px-4 py-2 text-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/50"
            onKeyDown={(e) => e.key === 'Enter' && handleAsk()}
          />
          <button 
            onClick={handleAsk}
            disabled={loading}
            className="bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 text-white px-4 py-2 rounded-lg transition-all flex items-center gap-2"
          >
            {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Send className="w-5 h-5" />}
          </button>
        </div>

        {answer && (
          <div className="mt-6 p-4 bg-slate-950/50 rounded-xl border border-indigo-500/20 animate-in slide-in-from-top-2 duration-300">
            <div className="flex items-start gap-3">
              <div className="bg-indigo-500/20 p-2 rounded-lg">
                <Bot className="w-5 h-5 text-indigo-400" />
              </div>
              <div className="flex-1">
                <p className="text-slate-300 text-sm leading-relaxed whitespace-pre-wrap italic">
                  "{answer}"
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AICoach;
