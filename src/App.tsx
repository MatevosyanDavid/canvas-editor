import { useState, ChangeEvent } from 'react';

import { loadImage } from 'utils/loadImage';

import Canvas from 'Section/Canvas';

import './index.css';

export default function App() {
  const [size, setSize] = useState<number>(5);
  const [selectedFile, setSelectedFile] = useState<HTMLImageElement | null>(null);

  const handleSizeChange = (size: number): void => {
    setSize(prevSize => (prevSize || size > 0 ? prevSize + size : 0));
  };

  const onFileChange = async ({ target: { files } }: ChangeEvent<HTMLInputElement>) => {
    const url = (files && URL.createObjectURL(files[0])) || '';

    const img = await loadImage(url);

    setSelectedFile(img);
  };

  return (
    <div className="App">
      <input type="file" onChange={onFileChange} />
      <Canvas size={size} selectedFile={selectedFile} />
      <div className="btn-block">
        <button onClick={() => handleSizeChange(-1)}>-1</button>
        <span>{size}</span>
        <button onClick={() => handleSizeChange(1)}>+1</button>
      </div>
    </div>
  );
}
