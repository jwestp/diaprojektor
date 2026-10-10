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
        Load your slides*
        <br />
        <span>↓</span>
        <img
          src="./images/np_carousel-slide-projector_1123953_000000.svg"
          alt="slide projector icon"
        />
        <i>Chromium or Firefox recommended</i>
        <i>
          *your photographs will not leave your browser; there is no upload to
          any server
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
