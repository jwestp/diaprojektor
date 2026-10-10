import { type ChangeEvent, type JSX } from 'react';

import './SlideTray.css';

type Props = {
  onChange: (slides: string[]) => void;
};

const SlideTray = ({ onChange }: Props): JSX.Element => {
  
  const onFileSelect = (event: ChangeEvent<HTMLInputElement>): void => {
    const slides = Array.from(event.currentTarget.files ?? [])
      .sort((a, b) => a.name.localeCompare(b.name))
      .map(file => URL.createObjectURL(file));

    onChange(slides);
  };

  return (
    <div className="slide-tray">
      <label htmlFor="slides">
        Lade deine Dias*
        <br />
        <span>↓</span>
        <img
          src="./images/np_carousel-slide-projector_1123953_000000.svg"
          alt="slide projector icon"
        />
        <i>Chromium oder Firefox empfohlen</i>
        <i>
          *Deine Fotos bleiben in deinem Browser. Sie werden nicht auf einen
          Server hochgeladen.
        </i>
      </label>
      <input
        id="slides"
        type="file"
        name="slides"
        accept="image/png, image/jpeg, image/webp, image/avif"
        multiple
        onChange={onFileSelect}
      />
    </div>
  );
};

export default SlideTray;
