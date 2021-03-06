import { useState } from 'react';
import { Link } from 'react-router-dom';

import Canvas from 'Section/Canvas';

export default function App() {
  const [size, setSize] = useState<number>(5);

  const handleSizeChange = (size: number): void => {
    setSize(prevSize => (prevSize || size > 0 ? prevSize + size : 0));
  };

  return (
    <div className="App">
      <Canvas size={size} />
      <div className="btn-block">
        <button onClick={() => handleSizeChange(-1)}>-1</button>
        <span>{size}</span>
        <button onClick={() => handleSizeChange(1)}>+1</button>
        <Link to="/">Home</Link>
      </div>
    </div>
  );
}
