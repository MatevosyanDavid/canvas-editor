export const loadImage = (url: string): Promise<HTMLImageElement> =>
  new Promise((resolve, reject) => {
    const image: HTMLImageElement = new Image();

    image.onload = () => {
      resolve(image);
    };

    image.src = url;
  });
