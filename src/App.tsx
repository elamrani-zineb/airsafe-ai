// ─────────────────────────────────────────────
//  AirSafe AI — Root App Component
// ─────────────────────────────────────────────
import React, { useState } from 'react';
import { PhoneFrame, StatusBar, ScreenSlot } from './components/PhoneFrame';
import { BottomNav } from './components/BottomNav';
import { Dashboard }    from './screens/Dashboard';
import { MapScreen }    from './screens/MapScreen';
import { Survey }       from './screens/Survey';
import { Profile }      from './screens/Profile';
import { LoginScreen }  from './screens/LoginScreen';
import type { TabId } from './types';
import './styles/index.css';

type AppView = 'login' | 'app';

const makeScreens = (onLogout: () => void): Record<TabId, React.ReactNode> => ({
  0: <Dashboard />,
  1: <MapScreen />,
  2: <Survey />,
  3: <Profile onLogout={onLogout} />,
});

const App: React.FC = () => {
  const [view,      setView]      = useState<AppView>('login');
  const [activeTab, setActiveTab] = useState<TabId>(0);

  // ── Login handler ─────────────────────────
  const handleLogin = async (email: string, password: string): Promise<void> => {
    // Replace with your real auth call, e.g. Firebase, Supabase, REST API…
    await new Promise(resolve => setTimeout(resolve, 1800)); // simulate network
    console.log('Logged in as:', email);
    // On success, navigate to the main app
    setView('app');
  };

  // ── Login screen ──────────────────────────
  if (view === 'login') {
    return (
      <LoginScreen
        onLogin={handleLogin}
        onRegister={() => console.log('Navigate → Register')}
        onForgotPassword={() => console.log('Navigate → ForgotPassword')}
      />
    );
  }

  // ── Logout handler ────────────────────────
  const handleLogout = () => {
    setActiveTab(0);
    setView('login');
  };

  // ── Main app (authenticated) ──────────────
  const screens = makeScreens(handleLogout);

  return (
    <div style={{
      minHeight: '100vh',
      background: '#D1D5DB',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '32px 16px',
    }}>
      <PhoneFrame>
        <StatusBar />
        <ScreenSlot key={activeTab}>
          {screens[activeTab]}
        </ScreenSlot>
        <BottomNav activeTab={activeTab} onTabChange={setActiveTab} />
      </PhoneFrame>
    </div>
  );
};

export default App;
