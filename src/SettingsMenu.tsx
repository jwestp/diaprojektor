import type { JSX } from 'react';
import type { ProjectorSettings } from './useProjectorSettings';
import './SettingsMenu.css';

type SettingKey = keyof ProjectorSettings;

type Props = {
  settings: ProjectorSettings;
  onChange: (key: SettingKey, value: boolean) => void;
  onClose: () => void;
};

const rows: ReadonlyArray<{ key: SettingKey; label: string }> = [
  { key: 'soundEnabled', label: 'Projektortöne' },
  { key: 'enlargeSmallImages', label: 'Kleine Bilder vergrößern' },
  { key: 'dust', label: 'Staub im Lichtkegel' },
  { key: 'exposure', label: 'Belichtungsschwankung' },
  { key: 'focusDrift', label: 'Fokusflimmern' },
  { key: 'hotspot', label: 'Lichtfleck' },
  { key: 'strayLight', label: 'Streulicht' },
  { key: 'vignette', label: 'Abgedunkelte Ränder' },
];

const SettingsMenu = ({ settings, onChange, onClose }: Props): JSX.Element => (
  <div
    className="settings-overlay"
    onClick={event => {
      event.stopPropagation();
      onClose();
    }}
  >
    <section
      className="settings-menu"
      role="dialog"
      aria-modal="true"
      aria-labelledby="settings-menu-title"
      onClick={event => event.stopPropagation()}
    >
      <header className="settings-menu__header">
        <h2 id="settings-menu-title">Einstellungen</h2>
        <button
          className="settings-menu__close"
          type="button"
          aria-label="Schließen"
          onClick={onClose}
        >
          ×
        </button>
      </header>
      <div className="settings-menu__rows">
        {rows.map(({ key, label }) => (
          <div className="settings-menu__row" key={key}>
            <span>{label}</span>
            <div className="settings-menu__buttons">
              <button
                className={settings[key] ? 'is-selected' : ''}
                type="button"
                aria-pressed={settings[key]}
                onClick={() => onChange(key, true)}
              >
                An
              </button>
              <button
                className={!settings[key] ? 'is-selected' : ''}
                type="button"
                aria-pressed={!settings[key]}
                onClick={() => onChange(key, false)}
              >
                Aus
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  </div>
);

export default SettingsMenu;
