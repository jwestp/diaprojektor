import { useEffect, useRef, useState, type JSX } from 'react';
import { motion } from 'framer-motion';

import './ProjectorEffects.css';

export type ProjectorEffectsConfig = Readonly<{
  dust: boolean;
  exposure: boolean;
  focusDrift: boolean;
  hotspot: boolean;
  strayLight: boolean;
  vignette: boolean;
}>;

type DustParticle = {
  id: number;
  x: number;
  y: number;
  radius: number;
  opacity: number;
};

const DustEffect = (): JSX.Element => {
  const [dust, setDust] = useState<DustParticle[]>([]);

  useEffect(() => {
    const frameId = window.requestAnimationFrame(() => {
      setDust(
        Array.from({ length: 70 }, (_, index) => ({
          id: index,
          x: Math.random() * 100,
          y: Math.random() * 100,
          radius: 0.8 + Math.random() * 0.8,
          opacity: 0.12 + Math.random() * 0.2,
        })),
      );
    });

    return () => window.cancelAnimationFrame(frameId);
  }, []);

  return (
    <div className="projector-effects__dust">
      {dust.map(({ id, x, y, radius, opacity }) => (
        <span
          key={id}
          className="projector-effects__dust-particle"
          style={{
            left: `${x}%`,
            top: `${y}%`,
            width: `${radius * 2}px`,
            height: `${radius * 2}px`,
            opacity,
          }}
        />
      ))}
    </div>
  );
};

type SlideImageEffectsProps = {
  config: ProjectorEffectsConfig;
};

export const SlideImageEffects = ({
  config,
}: SlideImageEffectsProps): JSX.Element => (
  <div className="projector-image-effects" aria-hidden="true">
    {config.dust && <DustEffect />}
    {config.focusDrift && (
      <div className="projector-image-effects__focus-drift" />
    )}
    {config.hotspot && (
      <div className="projector-image-effects__hotspot" />
    )}
    {config.vignette && (
      <div className="projector-image-effects__vignette" />
    )}
    {config.exposure && (
      <div className="projector-image-effects__exposure" />
    )}
  </div>
);

type SlideTransitionProps = {
  slideIndex: number;
  slideExitDuration: number;
  slideEntryDuration: number;
};

type ShutterEffectProps = SlideTransitionProps;

type Props = SlideTransitionProps & {
  config: ProjectorEffectsConfig;
};

const ShutterEffect = ({
  slideIndex,
  slideExitDuration,
  slideEntryDuration,
}: ShutterEffectProps): JSX.Element | null => {
  const [shutterMoving, setShutterMoving] = useState(false);
  const previousSlideIndex = useRef(slideIndex);

  useEffect(() => {
    if (previousSlideIndex.current === slideIndex) {
      return;
    }

    previousSlideIndex.current = slideIndex;
    setShutterMoving(true);

    const timeoutId = window.setTimeout(() => {
      setShutterMoving(false);
    }, (slideExitDuration + slideEntryDuration) * 1000);

    return () => window.clearTimeout(timeoutId);
  }, [slideEntryDuration, slideExitDuration, slideIndex]);

  if (!shutterMoving) {
    return null;
  }

  return (
    <motion.div
      key={slideIndex}
      className="projector-effects__shutter"
      initial={{ x: '100%' }}
      animate={{ x: ['100%', '0%', '100%'] }}
      transition={{
        duration: slideExitDuration + slideEntryDuration,
        times: [
          0,
          slideExitDuration / (slideExitDuration + slideEntryDuration),
          1,
        ],
        ease: ['easeIn', 'easeIn'],
        type: 'tween',
      }}
    />
  );
};

const ProjectorEffects = ({
  config,
  slideIndex,
  slideExitDuration,
  slideEntryDuration,
}: Props): JSX.Element => {
  return (
    <div className="projector-effects" aria-hidden="true">
      {config.strayLight && (
        <div className="projector-effects__stray-light" />
      )}
      <ShutterEffect
        slideIndex={slideIndex}
        slideExitDuration={slideExitDuration}
        slideEntryDuration={slideEntryDuration}
      />
    </div>
  );
};

export default ProjectorEffects;
