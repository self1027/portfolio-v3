import type { ComponentProps } from 'react';
import { remoteProjectImages } from '../data/projectImages';

export function ProjectImage({ src, width, height, ...props }: ComponentProps<'img'>) {
  const remote = remoteProjectImages.find(image => image.src === src);
  return <img {...props} src={src}
    width={remote ? remote.width : width}
    height={remote ? remote.height : height}
    onError={remote ? event => {
      const image = event.currentTarget;
      if (image.getAttribute('src') !== remote.src) return;
      image.width = remote.fallbackWidth;
      image.height = remote.fallbackHeight;
      image.src = remote.fallback;
    } : undefined}
  />;
}
