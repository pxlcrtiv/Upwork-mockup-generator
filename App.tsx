
import React, { useState, useRef, useCallback } from 'react';
import ControlPanel from './components/ControlPanel';
import MockupCanvas from './components/MockupCanvas';
import type { MockupState, GeneratedTitle } from './types';
import { DEFAULT_STATE } from './constants';
import { generateTitles } from './services/geminiService';
import { DownloadIcon, SparklesIcon } from './components/icons';

// Add htmlToImage to the window object for TypeScript
declare global {
  interface Window {
    htmlToImage: any;
  }
}

const AppHeader: React.FC<{ onExport: () => void }> = ({ onExport }) => (
    <header className="w-full h-16 bg-brand-bg border-b border-border-color flex items-center justify-between px-6 flex-shrink-0">
        <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <SparklesIcon className="w-5 h-5 text-white"/>
            </div>
            <h1 className="text-lg font-bold text-text-primary tracking-tight">Mockup Studio</h1>
        </div>
        <button 
            onClick={onExport} 
            className="flex items-center justify-center px-4 py-2 font-semibold rounded-md bg-primary hover:bg-primary-hover transition-colors text-sm text-white"
        >
            <DownloadIcon className="w-4 h-4 mr-2" />
            Export as PNG
        </button>
    </header>
);


function App() {
  const [state, setState] = useState<MockupState>(DEFAULT_STATE);
  const mockupRef = useRef<HTMLDivElement>(null);

  const [aiSuggestions, setAiSuggestions] = useState<GeneratedTitle[]>([]);
  const [isAiLoading, setIsAiLoading] = useState<boolean>(false);
  const [aiError, setAiError] = useState<string | null>(null);

  const handleExport = useCallback(() => {
    if (mockupRef.current === null) {
      return;
    }

    window.htmlToImage.toPng(mockupRef.current, { cacheBust: true, pixelRatio: 2 })
      .then((dataUrl: string) => {
        const link = document.createElement('a');
        link.download = 'mockup.png';
        link.href = dataUrl;
        link.click();
      })
      .catch((err: Error) => {
        console.error('Oops, something went wrong!', err);
        alert('Failed to export image. See console for details.');
      });
  }, [mockupRef]);

  const handleGenerateTitles = useCallback(async () => {
    if (!state.screenshot) {
        setAiError("Please upload a screenshot first.");
        return;
    }
    
    setIsAiLoading(true);
    setAiError(null);
    setAiSuggestions([]);

    try {
        const base64Prefix = 'data:';
        const commaIndex = state.screenshot.indexOf(',');

        if (commaIndex === -1) throw new Error("Invalid screenshot format");
        
        const mimeType = state.screenshot.substring(state.screenshot.indexOf(base64Prefix) + base64Prefix.length, state.screenshot.indexOf(';'));
        const base64Image = state.screenshot.substring(commaIndex + 1);
        
        const suggestions = await generateTitles(base64Image, mimeType);
        setAiSuggestions(suggestions);
    } catch (error) {
        console.error(error);
        setAiError(error instanceof Error ? error.message : "An unknown error occurred.");
    } finally {
        setIsAiLoading(false);
    }
  }, [state.screenshot]);


  return (
    <div className="w-screen h-screen bg-brand-bg flex flex-col antialiased">
        <AppHeader onExport={handleExport} />
        <div className="flex-grow w-full grid grid-cols-1 lg:grid-cols-3 xl:grid-cols-4 gap-6 p-6 overflow-hidden">
            
            <aside className="lg:col-span-1 xl:col-span-1 w-full h-full">
                 <ControlPanel
                    state={state}
                    setState={setState}
                    onGenerateTitles={handleGenerateTitles}
                    aiSuggestions={aiSuggestions}
                    isAiLoading={isAiLoading}
                    aiError={aiError}
                />
            </aside>
            
            <main 
                className="lg:col-span-2 xl:col-span-3 w-full h-full rounded-lg bg-surface-1 flex items-center justify-center relative overflow-hidden"
                style={{
                  backgroundImage: 'radial-gradient(circle at 1px 1px, #444444 1px, transparent 0)',
                  backgroundSize: '20px 20px',
                }}
            >
                <MockupCanvas state={state} mockupRef={mockupRef} />
            </main>
        </div>
    </div>
  );
}

export default App;
