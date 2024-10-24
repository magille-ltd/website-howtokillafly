import { createCanvas } from 'canvas';

export const loader = async () => {
  const canvas = createCanvas(64, 64); // Create a 64x64 canvas
  const context = canvas.getContext('2d');

  // Set the background color
  context.fillStyle = '#273318';
  context.fillRect(0, 0, 64, 64);

  // Set the text properties
  context.font = '48px sans-serif';
  context.fillStyle = '#fbbf24';
  context.textAlign = 'center';
  context.textBaseline = 'middle';

  // Draw the fly emoji in the center
  context.fillText('F', 32, 32);

  // Convert the canvas to a PNG buffer
  const buffer = canvas.toBuffer('image/png');

  return new Response(buffer, {
    headers: {
      'Content-Type': 'image/png',
      'Cache-Control': 'public, max-age=31536000, immutable',
    },
  });
};
