import { useEffect, useState, type JSX } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useKey } from 'rooks';

import ProjectorEffects, {
  SlideImageEffects,
} from './ProjectorEffects';
import SettingsMenu from './SettingsMenu';
import useProjectorSettings from './useProjectorSettings';
import './Projector.css';

const inSound = new Audio('./sounds/in.mp3');
const outSound = new Audio('./sounds/out.mp3');
const slideExitDuration = 0.47;
const slideEntryDuration = 0.3;

type Props = {
  slides: string[];
};

const Projector = ({ slides }: Props): JSX.Element => {
  const [index, setIndex] = useState(0);
  const [auto, setAuto] = useState(false);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const { settings, updateSetting } = useProjectorSettings();

  const increment = () => setIndex(i => (i < slides.length ? i + 1 : 0));
  const decrement = () => setIndex(i => (i > 0 ? i - 1 : 0));

  const toggleAuto = () => {
    setAuto(i => !i);
  };

  useKey(['f'], () => {
    if (settingsOpen) {
      return;
    }

    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
    } else {
      document.exitFullscreen();
    }
  });
  useKey(['a'], () => {
    if (!settingsOpen) {
      toggleAuto();
    }
  });
  useKey([37], () => {
    if (!settingsOpen) {
      decrement();
    }
  });
  useKey([39], () => {
    if (!settingsOpen) {
      increment();
    }
  });
  useKey([32], () => {
    if (!settingsOpen) {
      toggleAuto();
    }
  });

  useEffect(() => {
    const handleSettingsKeyDown = (event: KeyboardEvent) => {
      if (event.key.toLowerCase() === 's' && !event.repeat) {
        event.preventDefault();
        setSettingsOpen(isOpen => !isOpen);
      } else if (event.key === 'Escape') {
        setSettingsOpen(false);
      }
    };

    window.addEventListener('keydown', handleSettingsKeyDown);
    return () => window.removeEventListener('keydown', handleSettingsKeyDown);
  }, []);

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
    if (settings.soundEnabled) {
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
            <SlideImageEffects config={settings} />
          </div>
        </motion.div>
      ))}
      <ProjectorEffects
        config={settings}
        slideIndex={index}
        slideExitDuration={slideExitDuration}
        slideEntryDuration={slideEntryDuration}
      />
      {settingsOpen && (
        <SettingsMenu
          settings={settings}
          onChange={updateSetting}
          onClose={() => setSettingsOpen(false)}
        />
      )}
    </div>
  );
};

export default Projector;
