import React, { useState } from 'react';
import { AuthView } from '../types';
import { ShieldCheckIcon, UserIcon, LockIcon, EnvelopeIcon } from './icons';

interface AuthProps {
    onLogin: () => void;
}

const Auth: React.FC<AuthProps> = ({ onLogin }) => {
    const [authView, setAuthView] = useState<AuthView>('signIn');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Here you would typically handle actual authentication
        onLogin();
    };
    
    const InputField: React.FC<{ icon: React.ReactNode; type: string; placeholder: string; id: string; }> = ({ icon, type, placeholder, id }) => (
        <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                {icon}
            </div>
            <input
                type={type}
                id={id}
                placeholder={placeholder}
                className="w-full pl-10 pr-3 py-2.5 border border-slate-300 rounded-lg text-slate-700 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200"
            />
        </div>
    );

    return (
        <div className="bg-slate-50 min-h-screen flex items-center justify-center p-4 font-sans">
            <div className="w-full max-w-md">
                <div className="text-center mb-8 animate-fade-in" style={{ animationDelay: '0.1s' }}>
                    <ShieldCheckIcon className="h-12 w-12 text-blue-600 mx-auto" />
                    <h1 className="text-3xl font-bold text-slate-800 tracking-tight mt-2">Welcome to EquiTrust AI</h1>
                    <p className="text-slate-500 mt-1">Fair, transparent financial services.</p>
                </div>

                <div className="bg-white p-8 rounded-2xl shadow-xl border border-slate-200/80 animate-slide-up" style={{ animationDelay: '0.3s' }}>
                    <div className="flex justify-center bg-slate-100 rounded-lg p-1 mb-6">
                        <button
                            onClick={() => setAuthView('signIn')}
                            className={`w-full py-2 text-sm font-semibold rounded-md transition-all duration-300 ${authView === 'signIn' ? 'bg-blue-600 text-white shadow' : 'text-slate-600 hover:bg-slate-200'}`}
                        >
                            Sign In
                        </button>
                        <button
                            onClick={() => setAuthView('signUp')}
                            className={`w-full py-2 text-sm font-semibold rounded-md transition-all duration-300 ${authView === 'signUp' ? 'bg-blue-600 text-white shadow' : 'text-slate-600 hover:bg-slate-200'}`}
                        >
                            Sign Up
                        </button>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        {authView === 'signUp' && (
                             <InputField icon={<UserIcon className="h-5 w-5 text-slate-400"/>} type="text" placeholder="Full Name" id="name" />
                        )}
                        <InputField icon={<EnvelopeIcon className="h-5 w-5 text-slate-400"/>} type="email" placeholder="Email Address" id="email" />
                        <InputField icon={<LockIcon className="h-5 w-5 text-slate-400"/>} type="password" placeholder="Password" id="password" />

                        <button type="submit" className="w-full bg-blue-600 text-white font-bold py-3 px-4 rounded-lg hover:bg-blue-700 transition-all duration-200 shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                            {authView === 'signIn' ? 'Sign In' : 'Create Account'}
                        </button>
                    </form>
                </div>
                 <footer className="text-center p-4 text-xs text-slate-400 mt-4">
                    <p>&copy; {new Date().getFullYear()} EquiTrust Bank. All rights reserved.</p>
                </footer>
            </div>
        </div>
    );
};

export default Auth;
