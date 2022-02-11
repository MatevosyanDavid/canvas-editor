import { useEffect, useRef, useState } from 'react';

import { canvasToBlobUrl } from 'utils/canvasToBlobUrl';

function Canvas({ size, selectedFile }) {
  const ctxRef = useRef(null);

  const canvasRef = useRef(null);
  const [isDrawing, setIsDrawing] = useState(false);

  useEffect(() => {
    if (ctxRef.current) {
      ctxRef.current.lineWidth = size;
    }
  }, [size, ctxRef]);

  useEffect(() => {
    const canvas = canvasRef.current;

    canvas.width = window.innerWidth * 2;
    canvas.height = window.innerHeight * 2;
    canvas.style.width = `${window.innerWidth}px`;
    canvas.style.height = `${window.innerHeight}px`;

    const ctx = canvas.getContext('2d');

    ctx.scale(2, 2);
    ctx.lineCap = 'round';
    ctx.strokeStyle = 'black';
    ctx.lineWidth = '5px';

    ctxRef.current = ctx;
  }, []);

  useEffect(() => {
    if (canvasRef.current && selectedFile) {
      ctxRef.current.drawImage(
        selectedFile,
        0,
        0,
        canvasRef.current.width,
        canvasRef.current.height,
      );
    }
  }, [ctxRef, selectedFile]);

  const startDrawing = ({ nativeEvent }) => {
    const { offsetX, offsetY } = nativeEvent;

    ctxRef.current.beginPath();
    ctxRef.current.moveTo(offsetX, offsetY);

    setIsDrawing(true);
  };

  const finishDrawing = () => {
    ctxRef.current.closePath();
    setIsDrawing(false);
  };

  const draw = ({ nativeEvent }) => {
    if (!isDrawing) return;

    const { offsetX, offsetY } = nativeEvent;

    ctxRef.current.lineTo(offsetX, offsetY);
    ctxRef.current.stroke();
  };

  const handleUploadImage = async () => {
    const url = await canvasToBlobUrl(canvasRef.current);

    console.log(url);
  };

  const handleClearCanvas = () => {
    ctxRef.current.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
  };

  return (
    <div>
      <canvas
        id="canvas"
        width="300"
        height="300"
        ref={canvasRef}
        onMouseMove={draw}
        onMouseUp={finishDrawing}
        onMouseDown={startDrawing}
      />
      <button onClick={handleUploadImage}>Upload Image</button>
      <button onClick={handleClearCanvas}>Clear Canvas</button>
    </div>
  );
}

export default Canvas;
