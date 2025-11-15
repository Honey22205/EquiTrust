import React, { useState, useCallback } from 'react';
import { LoanApplication, Decision, AuditLogEntry, ConsentSettings, View } from './types';
import { simulateLoanDecision, getAIProfile } from './services/aiService';
import Header from './components/Header';
import LoanApplicationForm from './components/LoanApplicationForm';
import DecisionView from './components/DecisionView';
import ControlPanel from './components/ControlPanel';
import AuditLogView from './components/AuditLogView';
import Auth from './components/Auth';

const App: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentView, setCurrentView] = useState<View>('application');
  const [currentDecision, setCurrentDecision] = useState<Decision | null>(null);
  const [auditLog, setAuditLog] = useState<AuditLogEntry[]>([]);
  const [consentSettings, setConsentSettings] = useState<ConsentSettings>({
    useIncome: true,
    useLocation: false,
    useSpendingHabits: true,
    forPersonalization: false,
  });
  const [customerProfile, setCustomerProfile] = useState<string>('');
  
  const handleLogin = () => {
    setIsLoggedIn(true);
    setCurrentView('application'); // Reset to main view on login
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    // Optionally reset state on logout
    setCurrentDecision(null);
    setAuditLog([]);
    setCustomerProfile('');
  };

  const handleNavigate = (view: View) => {
    if (view === 'application') {
      setCurrentDecision(null);
    }
    setCurrentView(view);
  };

  const handleSubmitApplication = useCallback((applicationData: Omit<LoanApplication, 'customerId'>) => {
    const application: LoanApplication = { ...applicationData, customerId: 'CUST-12345' };
    const decision = simulateLoanDecision(application, consentSettings);

    const logEntry: AuditLogEntry = {
      timestamp: new Date().toLocaleString(),
      customerId: application.customerId,
      decision: decision.decision,
      explanation: decision.naturalLanguageExplanation,
      inputParameters: applicationData,
      biasCheckResult: Math.random() > 0.1, // 90% chance of passing
    };

    setCurrentDecision(decision);
    setAuditLog(prevLog => [logEntry, ...prevLog]);
    setCurrentView('decision');
  }, [consentSettings]);

  const handleConsentChange = (key: keyof ConsentSettings, value: boolean) => {
    setConsentSettings(prevSettings => ({
      ...prevSettings,
      [key]: value,
    }));
  };

  const handleExplainProfile = () => {
    const profile = getAIProfile(consentSettings);
    setCustomerProfile(profile);
  };

  const renderView = () => {
    switch (currentView) {
      case 'application':
        return <LoanApplicationForm onSubmit={handleSubmitApplication} />;
      case 'decision':
        return currentDecision ? <DecisionView decision={currentDecision} onReset={() => handleNavigate('application')} /> : <div className="text-center p-8">No decision to show.</div>;
      case 'controlPanel':
        return (
          <ControlPanel
            settings={consentSettings}
            onConsentChange={handleConsentChange}
            onExplainProfile={handleExplainProfile}
            profileExplanation={customerProfile}
          />
        );
      case 'auditLog':
        return <AuditLogView log={auditLog} />;
      default:
        return <LoanApplicationForm onSubmit={handleSubmitApplication} />;
    }
  };
  
  if (!isLoggedIn) {
     return <Auth onLogin={handleLogin} />;
  }

  return (
    <div className="bg-slate-50 min-h-screen font-sans text-slate-800">
      <Header currentView={currentView} onNavigate={handleNavigate} onLogout={handleLogout} />
      <main className="max-w-6xl mx-auto p-4 sm:p-6 md:p-8">
        {renderView()}
      </main>
      <footer className="text-center p-4 text-xs text-slate-400">
        <p>&copy; {new Date().getFullYear()} EquiTrust Bank. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default App;