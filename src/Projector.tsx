import { useEffect, useState, type JSX } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useKey } from 'rooks';

import ProjectorEffects, {
  SlideImageEffects,
  type ProjectorEffectsConfig,
} from './ProjectorEffects';
import './Projector.css';

const inSound = new Audio('./sounds/in.mp3');
const outSound = new Audio('./sounds/out.mp3');
const slideExitDuration = 0.47;
const slideEntryDuration = 0.3;

const PROJECTOR_EFFECTS_CONFIG: ProjectorEffectsConfig = {
  dust: true,
  exposure: true,
  focusDrift: true,
  hotspot: true,
  strayLight: true,
  vignette: true,
};

type Props = {
  slides: string[];
};

const Projector = ({ slides }: Props): JSX.Element => {
  const [index, setIndex] = useState(0);
  const [muted, setMuted] = useState(false);
  const [auto, setAuto] = useState(false);

  const increment = () => setIndex(i => (i < slides.length ? i + 1 : 0));
  const decrement = () => setIndex(i => (i > 0 ? i - 1 : 0));

  const toggleAuto = () => {
    setAuto(i => !i);
  };

  useKey(['f'], () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
    } else {
      document.exitFullscreen();
    }
  });
  useKey(['m'], () => setMuted(i => !i));
  useKey(['a'], toggleAuto);
  useKey([37], decrement);
  useKey([39], increment);
  useKey([32], toggleAuto);

  useEffect(() => {
    if (!auto) {
      return;
    }

    const intervalId = window.setInterval(() => {
      setIndex(i => (i < slides.length ? i + 1 : 0));
    }, 4000);

    return () => window.clearInterval(intervalId);
  }, [auto, slides.length]);

  useEffect(() => {
    if (!muted) {
      outSound.play();
      setTimeout(() => {
        inSound.play();
      }, 470);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [index]);

  return (
    <div className="projector" onClick={increment}>
      <AnimatePresence>
        {auto && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="projector-progress"
              animate={{
                width: 0,
              }}
              transition={{
                duration: 4,
                repeatType: 'loop',
                repeat: Infinity,
              }}
            />
          </motion.div>
        )}
      </AnimatePresence>
      {['./images/intro-de.svg', ...slides].map((slide, i) => (
        <motion.div
          key={`slide-${slide}`}
          variants={{
            hidden: {
              x: '-100%',
              transition: {
                duration: slideExitDuration, // out.mp3
                type: 'tween',
                ease: 'easeIn',
              },
            },
            visible: {
              x: 0,
              transition: {
                delay: slideExitDuration,
                duration: slideEntryDuration, // in.mp3
                type: 'tween',
                ease: 'easeIn',
              },
            },
          }}
          initial="hidden"
          animate={i === index ? 'visible' : 'hidden'}
          className="slide"
        >
          <div className="slide-image">
            <img src={slide} alt="nice landscape" />
            <SlideImageEffects config={PROJECTOR_EFFECTS_CONFIG} />
          </div>
        </motion.div>
      ))}
      <ProjectorEffects
        config={PROJECTOR_EFFECTS_CONFIG}
        slideIndex={index}
        slideExitDuration={slideExitDuration}
        slideEntryDuration={slideEntryDuration}
      />
    </div>
  );
};

export default Projector;
