import { useEffect, useState } from 'react';
import type { ProjectorEffectsConfig } from './ProjectorEffects';

export type ProjectorSettings = ProjectorEffectsConfig & {
  enlargeSmallImages: boolean;
  soundEnabled: boolean;
};

const STORAGE_KEY = 'diaprojektor-settings';

const DEFAULT_SETTINGS: ProjectorSettings = {
  dust: false,
  exposure: false,
  focusDrift: false,
  hotspot: false,
  strayLight: false,
  vignette: false,
  soundEnabled: true,
  enlargeSmallImages: false,
};

const isProjectorSettings = (value: unknown): value is ProjectorSettings =>
  typeof value === 'object' &&
  value !== null &&
  Object.keys(DEFAULT_SETTINGS).every(
    key =>
      key in value &&
      typeof Reflect.get(value, key) === 'boolean',
  );

const loadSettings = (): ProjectorSettings => {
  const storedSettings = window.localStorage.getItem(STORAGE_KEY);
  if (storedSettings === null) {
    return DEFAULT_SETTINGS;
  }

  let parsedSettings: unknown;
  try {
    parsedSettings = JSON.parse(storedSettings);
  } catch (error) {
    console.error('Die gespeicherten Einstellungen konnten nicht gelesen werden.', error);
    return DEFAULT_SETTINGS;
  }

  if (!isProjectorSettings(parsedSettings)) {
    console.error('Die gespeicherten Einstellungen haben ein ungültiges Format.');
    return DEFAULT_SETTINGS;
  }

  return {
    dust: parsedSettings.dust,
    exposure: parsedSettings.exposure,
    focusDrift: parsedSettings.focusDrift,
    hotspot: parsedSettings.hotspot,
    strayLight: parsedSettings.strayLight,
    vignette: parsedSettings.vignette,
    soundEnabled: parsedSettings.soundEnabled,
    enlargeSmallImages: parsedSettings.enlargeSmallImages,
  };
};

const useProjectorSettings = () => {
  const [settings, setSettings] = useState(loadSettings);

  useEffect(() => {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(settings));
  }, [settings]);

  const updateSetting = (key: keyof ProjectorSettings, value: boolean) => {
    setSettings(currentSettings => ({ ...currentSettings, [key]: value }));
  };

  return { settings, updateSetting };
};

export default useProjectorSettings;
