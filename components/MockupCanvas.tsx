
import React from 'react';
import type { MockupState } from '../types';
import { BackgroundType } from '../types';

interface MockupCanvasProps {
  state: MockupState;
  mockupRef: React.RefObject<HTMLDivElement>;
}

const MockupCanvas: React.FC<MockupCanvasProps> = ({ state, mockupRef }) => {
  const { screenshot, deviceImage, background, text, padding } = state;

  const backgroundStyle: React.CSSProperties = {};
  if (background.type === BackgroundType.Solid) {
    backgroundStyle.backgroundColor = background.value;
  } else if (background.type === BackgroundType.Gradient) {
    backgroundStyle.backgroundImage = background.value;
  } else if (background.type === BackgroundType.Image) {
    backgroundStyle.backgroundImage = `url(${background.value})`;
    backgroundStyle.backgroundSize = 'cover';
    backgroundStyle.backgroundPosition = 'center';
  }
  
  const textFont = { fontFamily: `'${text.font}', sans-serif` };

  return (
    <div
      ref={mockupRef}
      className={`flex flex-col items-center justify-center transition-all duration-300 rounded-lg overflow-hidden filter drop-shadow-2xl ${padding}`}
      style={backgroundStyle}
    >
      <div className="text-center mb-8 md:mb-12">
        <h1 
          className={`font-bold leading-tight ${text.size}`} 
          style={{ color: text.color, ...textFont }}
        >
          {text.title}
        </h1>
        <p 
          className="text-lg md:text-xl mt-2 opacity-80" 
          style={{ color: text.color, ...textFont, fontFamily: `'Inter', sans-serif` }}
        >
          {text.subtitle}
        </p>
      </div>

      <div className="relative flex items-center justify-center w-auto h-auto max-w-[70vw] md:max-w-md max-h-[70vh]">
        <div className="relative">
          {/* Screenshot (bottom layer) */}
          <div className="absolute inset-0" style={{ padding: '5.5%' }}>
            {screenshot ? (
              <img
                src={screenshot}
                alt="App Screenshot"
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-gray-700/50 rounded-lg">
                <p className="text-text-secondary text-center p-4">
                  Upload screenshot
                </p>
              </div>
            )}
          </div>

          {/* Device Frame (top layer) */}
          {deviceImage ? (
            <img
              src={deviceImage}
              alt="Device frame"
              className="relative w-auto h-auto max-w-full max-h-[calc(100vh-300px)] object-contain pointer-events-none"
              style={{ zIndex: 1 }}
            />
          ) : (
            <div className="w-[300px] h-[600px] flex items-center justify-center border-2 border-dashed border-border-color rounded-[40px]">
              <p className="text-text-secondary text-center p-4">
                Upload device frame
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MockupCanvas;
