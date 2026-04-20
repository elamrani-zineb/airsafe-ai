// ─────────────────────────────────────────────
//  AirSafe AI — Root App Component
// ─────────────────────────────────────────────
import React, { useState } from 'react';
import { PhoneFrame, StatusBar, ScreenSlot } from './components/PhoneFrame';
import { BottomNav } from './components/BottomNav';
import { Dashboard } from './screens/Dashboard';
import { MapScreen } from './screens/MapScreen';
import { Survey }    from './screens/Survey';
import { Profile }   from './screens/Profile';
import type { TabId } from './types';
import './styles/index.css';

const SCREENS: Record<TabId, React.ReactNode> = {
  0: <Dashboard />,
  1: <MapScreen />,
  2: <Survey />,
  3: <Profile />,
};

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<TabId>(0);

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
          {SCREENS[activeTab]}
        </ScreenSlot>
        <BottomNav activeTab={activeTab} onTabChange={setActiveTab} />
      </PhoneFrame>
    </div>
  );
};

export default App;
