import { useState, useCallback } from 'react';
import Header from './components/Header';
import CardGrid from './components/CardGrid';
import Footer from './components/Footer';
import Overlay from './components/Overlay';
import { dashboards } from './data/dashboards';
import './App.css';

export default function App() {
  const [overlayData, setOverlayData] = useState(null);

  const handleCardClick = useCallback((dashboard) => {
    setOverlayData(dashboard);
  }, []);

  const handleClose = useCallback(() => {
    setOverlayData(null);
  }, []);

  return (
    <div className="app">
      <div className="app__gradient" />
      <Header />
      <CardGrid dashboards={dashboards} onCardClick={handleCardClick} />
      <Footer />
      <Overlay
        isOpen={overlayData !== null}
        onClose={handleClose}
        dashboard={overlayData}
      />
    </div>
  );
}
