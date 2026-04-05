import { motion } from 'framer-motion';
import './DashboardCard.css';

export default function DashboardCard({ title, description, url, index, onCardClick }) {
  function handleClick(e) {
    e.preventDefault();
    onCardClick({ title, description, url });
  }

  return (
    <motion.a
      href={url}
      className="card"
      onClick={handleClick}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.5,
        delay: 0.2 + index * 0.1,
        ease: 'easeOut',
      }}
    >
      <div className="card__border" />

      <div className="card__content">
        <div className="card__icon-wrapper">
          <img
            src="/assets/bull-icon.png"
            alt=""
            className="card__icon"
          />
          <div className="card__rings">
            <div className="card__ring" />
            <div className="card__ring" />
            <div className="card__ring" />
          </div>
        </div>

        <h2 className="card__title">{title}</h2>
        <p className="card__description">{description}</p>
        <span className="card__link">Panele Git →</span>
      </div>
    </motion.a>
  );
}
