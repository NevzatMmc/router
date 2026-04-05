import { motion } from 'framer-motion';
import './Header.css';

export default function Header() {
  return (
    <motion.header
      className="header"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
    >
      <h1 className="header__title">PFT</h1>
      <p className="header__subtitle">POISON FINANCIAL TECHNOLOGIES</p>
    </motion.header>
  );
}
