import Header from './components/Header';
import CardGrid from './components/CardGrid';
import Footer from './components/Footer';
import { dashboards } from './data/dashboards';
import './App.css';

export default function App() {
  return (
    <div className="app">
      <div className="app__gradient" />
      <Header />
      <CardGrid dashboards={dashboards} />
      <Footer />
    </div>
  );
}
