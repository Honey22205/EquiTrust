
import React, { useState } from 'react';
import { LoanApplication } from '../types';

interface LoanApplicationFormProps {
  onSubmit: (application: Omit<LoanApplication, 'customerId'>) => void;
}

const LoanApplicationForm: React.FC<LoanApplicationFormProps> = ({ onSubmit }) => {
  const [creditScore, setCreditScore] = useState(720);
  const [income, setIncome] = useState(80000);
  const [dti, setDti] = useState(30);
  const [existingProducts, setExistingProducts] = useState(2);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({ creditScore, income, dti, existingProducts });
  };

  const SliderInput: React.FC<{
      label: string;
      value: number;
      onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
      min: number;
      max: number;
      step: number;
      displayValue: string;
      helpText: string;
  }> = ({ label, value, onChange, min, max, step, displayValue, helpText }) => (
    <div>
        <label className="block text-sm font-medium text-slate-600 mb-1">{label}</label>
        <div className="flex items-center space-x-4">
            <input
                type="range"
                min={min}
                max={max}
                step={step}
                value={value}
                onChange={onChange}
                className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
            />
            <span className="text-blue-700 font-semibold w-24 text-center bg-blue-50 px-2 py-1 rounded-md">{displayValue}</span>
        </div>
        <p className="text-xs text-slate-500 mt-1">{helpText}</p>
    </div>
  );

  return (
    <div className="bg-white p-8 rounded-2xl shadow-lg border border-slate-200/80 animate-fade-in">
        <h2 className="text-2xl font-bold text-slate-800 mb-2">Simulate a Loan Application</h2>
        <p className="text-slate-500 mb-8">Adjust the values below to see how our AI assesses loan applications in real-time.</p>

        <form onSubmit={handleSubmit} className="space-y-8">
            <SliderInput
                label="Credit Score"
                value={creditScore}
                onChange={(e) => setCreditScore(Number(e.target.value))}
                min={300} max={850} step={1}
                displayValue={`${creditScore}`}
                helpText="A higher score generally improves your chances."
            />
            <SliderInput
                label="Annual Income"
                value={income}
                onChange={(e) => setIncome(Number(e.target.value))}
                min={20000} max={250000} step={1000}
                displayValue={`$${(income / 1000).toFixed(0)}k`}
                helpText="Your gross annual income."
            />
             <SliderInput
                label="Debt-to-Income Ratio (DTI)"
                value={dti}
                onChange={(e) => setDti(Number(e.target.value))}
                min={5} max={60} step={1}
                displayValue={`${dti}%`}
                helpText="The percentage of your income that goes to debt payments. Lower is better."
            />
             <SliderInput
                label="Existing Products with Us"
                value={existingProducts}
                onChange={(e) => setExistingProducts(Number(e.target.value))}
                min={0} max={10} step={1}
                displayValue={`${existingProducts} products`}
                helpText="Loyalty can positively influence the decision."
            />

            <div className="pt-4">
                <button type="submit" className="w-full bg-blue-600 text-white font-bold py-3 px-4 rounded-lg hover:bg-blue-700 transition-all duration-200 shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                    Get AI Decision
                </button>
            </div>
        </form>
    </div>
  );
};

export default LoanApplicationForm;
