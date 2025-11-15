import React, { useEffect } from 'react';
import { Decision } from '../types';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { CheckCircleIcon, XCircleIcon, QuestionMarkCircleIcon } from './icons';

interface DecisionViewProps {
  decision: Decision;
  onReset: () => void;
}

const playSuccessSound = () => {
  try {
    const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
    if (!audioContext) return;

    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();

    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);

    oscillator.type = 'sine';
    gainNode.gain.setValueAtTime(0, audioContext.currentTime);

    // Play a short, pleasant arpeggio
    const now = audioContext.currentTime;
    gainNode.gain.linearRampToValueAtTime(0.15, now + 0.01);
    oscillator.frequency.setValueAtTime(523.25, now); // C5
    
    gainNode.gain.linearRampToValueAtTime(0.2, now + 0.1);
    oscillator.frequency.setValueAtTime(659.25, now + 0.1); // E5

    gainNode.gain.linearRampToValueAtTime(0.25, now + 0.2);
    oscillator.frequency.setValueAtTime(783.99, now + 0.2); // G5
    
    gainNode.gain.exponentialRampToValueAtTime(0.00001, now + 0.5);

    oscillator.start(now);
    oscillator.stop(now + 0.5);
  } catch (error) {
    console.error("Could not play audio:", error);
  }
};


const DecisionView: React.FC<DecisionViewProps> = ({ decision, onReset }) => {
  const { decision: decisionStatus, naturalLanguageExplanation, featureContributions } = decision;

  useEffect(() => {
    if (decisionStatus === 'Approved') {
      playSuccessSound();
    }
  }, [decisionStatus]);

  const decisionMeta = {
    Approved: {
      bgColor: 'bg-green-50',
      textColor: 'text-green-800',
      borderColor: 'border-green-200',
      title: 'Application Approved!',
      Icon: CheckCircleIcon,
    },
    Denied: {
      bgColor: 'bg-red-50',
      textColor: 'text-red-800',
      borderColor: 'border-red-200',
      title: 'Application Denied',
      Icon: XCircleIcon,
    },
    Referred: {
      bgColor: 'bg-yellow-50',
      textColor: 'text-yellow-800',
      borderColor: 'border-yellow-200',
      title: 'Application Referred for Review',
      Icon: QuestionMarkCircleIcon,
    },
  };

  const meta = decisionMeta[decisionStatus];
  const { Icon } = meta;

  const chartData = featureContributions.map(item => ({
    name: item.name,
    Impact: item.impact,
  }));

  return (
    <div className="space-y-8 animate-fade-in">
      <div className={`p-6 rounded-2xl shadow-lg border ${meta.borderColor} ${meta.bgColor}`}>
        <div className="flex items-center space-x-4">
          <Icon className={`h-12 w-12 ${meta.textColor}`} />
          <div>
            <h2 className={`text-2xl font-bold ${meta.textColor}`}>{meta.title}</h2>
            <p className={`mt-1 text-base ${meta.textColor}`}>Here's a simple breakdown of our AI's decision.</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-white p-8 rounded-2xl shadow-lg border border-slate-200/80">
          <h3 className="text-lg font-bold text-slate-800 mb-3">AI's Explanation</h3>
          <p className="text-slate-600 leading-relaxed text-justify">
            {naturalLanguageExplanation}
          </p>
        </div>
        <div className="bg-white p-8 rounded-2xl shadow-lg border border-slate-200/80">
          <h3 className="text-lg font-bold text-slate-800 mb-4">How Each Factor Contributed</h3>
          <div style={{ width: '100%', height: 250 }}>
            <ResponsiveContainer>
              <BarChart data={chartData} layout="vertical" margin={{ top: 5, right: 30, left: 40, bottom: 5 }}>
                <XAxis type="number" hide />
                <YAxis type="category" dataKey="name" stroke="#64748b" tick={{ fontSize: 12 }} width={120} />
                <Tooltip cursor={{ fill: '#f1f5f9' }} contentStyle={{ backgroundColor: 'white', border: '1px solid #e2e8f0', borderRadius: '0.5rem' }} />
                <Bar dataKey="Impact" radius={[0, 5, 5, 0]}>
                  {chartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.Impact > 0 ? '#22c55e' : '#ef4444'} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
          <p className="text-xs text-center text-slate-500 mt-2">Bars to the right helped your application; bars to the left had a negative impact.</p>
        </div>
      </div>
      
      <div className="text-center pt-4">
        <button onClick={onReset} className="bg-slate-600 text-white font-bold py-3 px-6 rounded-lg hover:bg-slate-700 transition-all duration-200 shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-slate-500">
          Run a New Simulation
        </button>
      </div>
    </div>
  );
};

export default DecisionView;