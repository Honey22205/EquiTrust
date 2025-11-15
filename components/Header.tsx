import React from 'react';
import { View } from '../types';
import { ShieldCheckIcon } from './icons';

interface HeaderProps {
  currentView: View;
  onNavigate: (view: View) => void;
  onLogout: () => void;
}

const NavLink: React.FC<{
  label: string;
  isActive: boolean;
  onClick: () => void;
}> = ({ label, isActive, onClick }) => {
  return (
    <button
      onClick={onClick}
      className={`px-4 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
        isActive
          ? 'bg-blue-600 text-white shadow'
          : 'text-slate-600 hover:bg-blue-100 hover:text-blue-700'
      }`}
    >
      {label}
    </button>
  );
};

const Header: React.FC<HeaderProps> = ({ currentView, onNavigate, onLogout }) => {
  return (
    <header className="bg-white/80 backdrop-blur-lg shadow-sm sticky top-0 z-10">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 md:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-3">
            <ShieldCheckIcon className="h-8 w-8 text-blue-600" />
            <h1 className="text-xl font-bold text-slate-800 tracking-tight">EquiTrust AI</h1>
          </div>
          <div className='flex items-center space-x-4'>
             <nav className="flex items-center space-x-2">
                <NavLink
                  label="Loan Application"
                  isActive={currentView === 'application' || currentView === 'decision'}
                  onClick={() => onNavigate('application')}
                />
                <NavLink
                  label="Your Data Control"
                  isActive={currentView === 'controlPanel'}
                  onClick={() => onNavigate('controlPanel')}
                />
                <NavLink
                  label="Regulator Log"
                  isActive={currentView === 'auditLog'}
                  onClick={() => onNavigate('auditLog')}
                />
              </nav>
              <button
                onClick={onLogout}
                className="px-4 py-2 rounded-md text-sm font-medium text-slate-600 bg-slate-100 hover:bg-red-100 hover:text-red-700 transition-colors duration-200"
              >
                Logout
              </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;