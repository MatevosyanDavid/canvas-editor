export const canvasToBlobUrl = (canvas: HTMLCanvasElement): Promise<string> =>
  new Promise(resolve => {
    canvas.toBlob((blob: Blob | null) => blob && resolve(URL.createObjectURL(blob)));
  });
