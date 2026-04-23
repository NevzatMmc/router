import { motion, AnimatePresence } from 'framer-motion';
import { useEffect } from 'react';
import './Overlay.css';

export default function Overlay({ isOpen, onClose, dashboard }) {
  useEffect(() => {
    function handleEsc(e) {
      if (e.key === 'Escape') onClose();
    }
    if (isOpen) {
      document.addEventListener('keydown', handleEsc);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      document.removeEventListener('keydown', handleEsc);
      document.body.style.overflow = '';
    };
  }, [isOpen, onClose]);

  if (!dashboard) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4 }}
        >
          <div className="overlay__backdrop" onClick={onClose} />

          <button className="overlay__close" onClick={onClose}>
            ✕
          </button>

          <div className="overlay__scene">
            <motion.div
              className="overlay__cone"
              initial={{ opacity: 0, scaleY: 0.3 }}
              animate={{ opacity: 1, scaleY: 1 }}
              transition={{ duration: 0.6, delay: 0.1, ease: 'easeOut' }}
            />

            <motion.h2
              className="overlay__label"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.2 }}
            >
              {dashboard.title.toUpperCase()}
            </motion.h2>

            <motion.img
              src="/assets/bull-icon.png"
              alt="PFT Bull"
              className="overlay__bull"
              initial={{ opacity: 0, scale: 0.85 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            />

            <motion.div
              className="overlay__ground"
              initial={{ opacity: 0, scaleX: 0.4 }}
              animate={{ opacity: 1, scaleX: 1 }}
              transition={{ duration: 0.5, delay: 0.3, ease: 'easeOut' }}
            />

            <motion.p
              className="overlay__desc"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.35 }}
            >
              {dashboard.description}
            </motion.p>

            <motion.a
              href={dashboard.url}
              target="_blank"
              rel="noopener noreferrer"
              className="overlay__btn"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.4 }}
            >
              PANELE GIT →
            </motion.a>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
