import { motion } from 'framer-motion';
import './Header.css';

const subtitleText = 'POISON FINANCIAL TECHNOLOGIES';

// Mini candlestick data for the top row
const candles = [
  { o: 18, c: 12, h: 10, l: 20 },
  { o: 14, c: 18, h: 12, l: 20 },
  { o: 16, c: 10, h: 8, l: 18 },
  { o: 12, c: 6, h: 4, l: 14 },
  { o: 8, c: 12, h: 6, l: 14 },
  { o: 10, c: 16, h: 8, l: 18 },
  { o: 14, c: 20, h: 12, l: 22 },
  { o: 18, c: 14, h: 12, l: 20 },
  { o: 16, c: 10, h: 8, l: 18 },
  { o: 12, c: 8, h: 6, l: 14 },
  { o: 10, c: 4, h: 2, l: 12 },
  { o: 6, c: 10, h: 4, l: 12 },
  { o: 8, c: 14, h: 6, l: 16 },
  { o: 12, c: 6, h: 4, l: 14 },
  { o: 8, c: 2, h: 0, l: 10 },
];

export default function Header() {
  return (
    <header className="header">
      {/* Row 1: Bull + Chart - pulled from left */}
      <div className="header__row">
        <motion.img
          src="/assets/bull-icon.png"
          alt=""
          className="header__bull"
          initial={{ x: -80, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
        />
        <div className="header__chart-strip">
          {candles.map((c, i) => {
            const isBull = c.c < c.o;
            const top = Math.min(c.o, c.c);
            const h = Math.max(Math.abs(c.c - c.o), 1);

            return (
              <motion.div
                key={i}
                className="header__candle"
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{
                  duration: 0.3,
                  delay: 0.2 + i * 0.06,
                  ease: 'easeOut',
                }}
              >
                <div
                  className="header__wick"
                  style={{
                    top: `${c.h}px`,
                    height: `${c.l - c.h}px`,
                    background: isBull
                      ? 'rgba(255,255,255,0.4)'
                      : 'rgba(255,255,255,0.15)',
                  }}
                />
                <div
                  className="header__candle-body"
                  style={{
                    top: `${top}px`,
                    height: `${h}px`,
                    background: isBull
                      ? 'rgba(255,255,255,0.75)'
                      : 'rgba(255,255,255,0.12)',
                    borderColor: isBull
                      ? 'rgba(255,255,255,0.8)'
                      : 'rgba(255,255,255,0.2)',
                  }}
                />
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Row 2: PFT letters - pulled from left with stagger */}
      <div className="header__row">
        <div className="header__title">
          {'PFT'.split('').map((char, i) => (
            <motion.span
              key={i}
              initial={{ opacity: 0, x: -40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{
                duration: 0.4,
                delay: 0.8 + i * 0.12,
                ease: 'easeOut',
              }}
            >
              {char}
            </motion.span>
          ))}
        </div>
      </div>

      {/* Row 3: POISON FINANCIAL TECHNOLOGIES - pulled from left */}
      <div className="header__row">
        <p className="header__subtitle">
          {subtitleText.split('').map((char, i) => (
            <motion.span
              key={i}
              className="header__letter"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{
                duration: 0.25,
                delay: 1.4 + i * 0.03,
                ease: 'easeOut',
              }}
            >
              {char === ' ' ? '\u00A0' : char}
            </motion.span>
          ))}
        </p>
      </div>
    </header>
  );
}
