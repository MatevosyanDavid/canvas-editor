import { useEffect, useRef, useState, MouseEvent } from 'react';

import { canvasToBlobUrl } from 'utils/canvasToBlobUrl';

interface ICanvasProps {
  size: number;
  selectedFile: HTMLImageElement | null;
}

function Canvas({ size, selectedFile }: ICanvasProps) {
  const ctxRef = useRef<CanvasRenderingContext2D | null>(null);

  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [isDrawing, setIsDrawing] = useState(false);

  useEffect(() => {
    if (ctxRef.current) {
      ctxRef.current.lineWidth = size;
    }
  }, [size, ctxRef]);

  useEffect(() => {
    const canvas = canvasRef.current;

    if (canvas) {
      canvas.width = window.innerWidth * 2;
      canvas.height = window.innerHeight * 2;
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;

      const ctx = canvas.getContext('2d');

      if (ctx) {
        ctx.scale(2, 2);
        ctx.lineCap = 'round';
        ctx.strokeStyle = 'black';
        ctxRef.current = ctx;
      }
    }
  }, []);

  useEffect(() => {
    if (canvasRef.current && ctxRef.current && selectedFile) {
      ctxRef.current.drawImage(
        selectedFile,
        0,
        0,
        canvasRef.current.width,
        canvasRef.current.height,
      );
    }
  }, [ctxRef, selectedFile]);

  const startDrawing = ({ nativeEvent }: MouseEvent) => {
    const { offsetX, offsetY } = nativeEvent;

    if (ctxRef.current) {
      ctxRef.current.beginPath();
      ctxRef.current.moveTo(offsetX, offsetY);

      setIsDrawing(true);
    }
  };

  const finishDrawing = () => {
    if (ctxRef.current) {
      ctxRef.current.closePath();
      setIsDrawing(false);
    }
  };

  const draw = ({ nativeEvent }: MouseEvent) => {
    if (!isDrawing) return;

    const { offsetX, offsetY } = nativeEvent;

    if (ctxRef.current) {
      ctxRef.current.lineTo(offsetX, offsetY);
      ctxRef.current.stroke();
    }
  };

  const handleUploadImage = async () => {
    if (canvasRef.current) {
      const url = await canvasToBlobUrl(canvasRef.current);
      console.log(url);
    }
  };

  const handleClearCanvas = () => {
    if (ctxRef.current && canvasRef.current) {
      ctxRef.current.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
    }
  };

  return (
    <div>
      <canvas
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
