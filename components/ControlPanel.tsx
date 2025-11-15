
import React from 'react';
import { ConsentSettings } from '../types';

interface ControlPanelProps {
  settings: ConsentSettings;
  onConsentChange: (key: keyof ConsentSettings, value: boolean) => void;
  onExplainProfile: () => void;
  profileExplanation: string;
}

const ToggleSwitch: React.FC<{
  label: string;
  description: string;
  enabled: boolean;
  onChange: (enabled: boolean) => void;
  id: string;
}> = ({ label, description, enabled, onChange, id }) => (
  <div className="flex items-center justify-between p-4 border border-slate-200 rounded-lg bg-slate-50/50">
    <div>
      <label htmlFor={id} className="font-semibold text-slate-800">{label}</label>
      <p className="text-sm text-slate-500">{description}</p>
    </div>
    <div
      onClick={() => onChange(!enabled)}
      role="switch"
      aria-checked={enabled}
      className={`relative inline-flex items-center h-6 rounded-full w-11 cursor-pointer transition-colors duration-200 ease-in-out ${
        enabled ? 'bg-blue-600' : 'bg-slate-300'
      }`}
    >
      <span
        className={`inline-block w-4 h-4 transform bg-white rounded-full transition-transform duration-200 ease-in-out ${
          enabled ? 'translate-x-6' : 'translate-x-1'
        }`}
      />
    </div>
    <input type="checkbox" id={id} checked={enabled} onChange={(e) => onChange(e.target.checked)} className="sr-only" />
  </div>
);

const ControlPanel: React.FC<ControlPanelProps> = ({ settings, onConsentChange, onExplainProfile, profileExplanation }) => {
  return (
    <div className="bg-white p-8 rounded-2xl shadow-lg border border-slate-200/80 animate-fade-in space-y-8">
      <div>
        <h2 className="text-2xl font-bold text-slate-800 mb-2">Your Data. Your Control.</h2>
        <p className="text-slate-500">We believe in transparency. You have granular control over how your data is used by our AI systems. Your choices here directly impact how we assess your applications and what products we can offer you.</p>
      </div>
      
      <div className="space-y-4">
        <ToggleSwitch
            id="useIncome"
            label="Use my income for decisions"
            description="Allows our AI to consider your income, which can significantly help your application."
            enabled={settings.useIncome}
            onChange={(val) => onConsentChange('useIncome', val)}
        />
        <ToggleSwitch
            id="useSpendingHabits"
            label="Use my spending habits"
            description="A high-level analysis of spending patterns to assess financial stability."
            enabled={settings.useSpendingHabits}
            onChange={(val) => onConsentChange('useSpendingHabits', val)}
        />
        <ToggleSwitch
            id="useLocation"
            label="Use my location data"
            description="Helps verify your application and offer location-specific products. (Currently simulated)"
            enabled={settings.useLocation}
            onChange={(val) => onConsentChange('useLocation', val)}
        />
         <ToggleSwitch
            id="forPersonalization"
            label="Use my data for personalization"
            description="Allow us to suggest other products and services tailored to you. (Currently simulated)"
            enabled={settings.forPersonalization}
            onChange={(val) => onConsentChange('forPersonalization', val)}
        />
      </div>

      <div className="pt-4">
        <h3 className="text-lg font-bold text-slate-800 mb-3">AI Transparency Engine</h3>
        <p className="text-slate-500 mb-4">Curious how our AI perceives your financial profile based on your settings? Click below for a simple explanation.</p>
        <button onClick={onExplainProfile} className="bg-slate-600 text-white font-bold py-3 px-6 rounded-lg hover:bg-slate-700 transition-all duration-200 shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-slate-500">
            Explain My AI Profile
        </button>
        {profileExplanation && (
            <div className="mt-6 p-4 bg-blue-50 border-l-4 border-blue-500 text-blue-800 rounded-r-lg">
                <p className="font-semibold">AI Profile Assessment:</p>
                <p>{profileExplanation}</p>
            </div>
        )}
      </div>
    </div>
  );
};

export default ControlPanel;
