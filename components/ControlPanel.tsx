
import React, { useState, useCallback } from 'react';
import type { MockupState, GeneratedTitle } from '../types';
import { BackgroundType } from '../types';
import { FONTS, FONT_SIZES, PADDINGS } from '../constants';
import { UploadIcon, SparklesIcon, DesignIcon, TextIcon, LayoutIcon } from './icons';

interface ControlPanelProps {
  state: MockupState;
  setState: React.Dispatch<React.SetStateAction<MockupState>>;
  onGenerateTitles: () => void;
  aiSuggestions: GeneratedTitle[];
  isAiLoading: boolean;
  aiError: string | null;
}

const TabButton: React.FC<{
    icon: React.ReactNode;
    label: string;
    isActive: boolean;
    onClick: () => void;
}> = ({ icon, label, isActive, onClick }) => (
    <button
        onClick={onClick}
        className={`flex-1 flex flex-col items-center justify-center p-3 text-xs font-medium border-b-2 transition-all duration-200 ${
            isActive
                ? 'text-primary border-primary'
                : 'text-text-secondary border-transparent hover:bg-surface-3 hover:text-text-primary'
        }`}
    >
        {icon}
        <span className="mt-1">{label}</span>
    </button>
);

const FileUploader: React.FC<{
    id: string;
    currentImage: string | null;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    label: string;
    sublabel: string;
}> = ({ id, currentImage, onChange, label, sublabel }) => (
    <div>
        <label className="text-sm font-medium text-text-secondary">{label}</label>
        <div className="mt-2 flex items-center gap-4">
            <label htmlFor={id} className="flex-grow cursor-pointer bg-surface-2 hover:bg-surface-3 border border-border-color rounded-md flex items-center justify-center p-3 text-center transition-colors">
                <UploadIcon className="w-5 h-5 text-text-secondary mr-2" />
                <span className="text-sm font-medium">
                    {currentImage ? 'Change Image' : 'Upload Image'}
                </span>
            </label>
            <input id={id} type="file" className="hidden" accept="image/*" onChange={onChange} />
            {currentImage && (
                <div className="w-12 h-12 rounded-md overflow-hidden bg-surface-2 border border-border-color flex-shrink-0">
                    <img src={currentImage} alt="Preview" className="w-full h-full object-cover"/>
                </div>
            )}
        </div>
        <p className="text-xs text-text-secondary mt-1">{sublabel}</p>
    </div>
);


const ControlPanel: React.FC<ControlPanelProps> = ({
    state,
    setState,
    onGenerateTitles,
    aiSuggestions,
    isAiLoading,
    aiError,
}) => {
    const [activeTab, setActiveTab] = useState<'Design' | 'Text' | 'AI'>('Design');

    const handleFileChange = (field: 'screenshot' | 'deviceImage') => (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            const reader = new FileReader();
            reader.onloadend = () => {
                setState(s => ({ ...s, [field]: reader.result as string }));
            };
            reader.readAsDataURL(file);
            e.target.value = ''; // Reset input value
        }
    };
    
    const handleBackgroundValueChange = useCallback((value: string) => {
        setState(s => ({ ...s, background: { ...s.background, value } }));
    }, [setState]);

    return (
        <div className="w-full h-full bg-surface-2 text-text-primary flex flex-col rounded-lg">
            <div className="flex border-b border-border-color">
                <TabButton label="Design" icon={<DesignIcon />} isActive={activeTab === 'Design'} onClick={() => setActiveTab('Design')} />
                <TabButton label="Text & Layout" icon={<TextIcon />} isActive={activeTab === 'Text'} onClick={() => setActiveTab('Text')} />
                <TabButton label="AI" icon={<SparklesIcon />} isActive={activeTab === 'AI'} onClick={() => setActiveTab('AI')} />
            </div>

            <div className="flex-grow overflow-y-auto p-6 space-y-6">
                {activeTab === 'Design' && (
                    <>
                        <FileUploader id="screenshot-upload" currentImage={state.screenshot} onChange={handleFileChange('screenshot')} label="App Screenshot" sublabel="PNG, JPG, WEBP" />
                        <FileUploader id="device-upload" currentImage={state.deviceImage} onChange={handleFileChange('deviceImage')} label="Device Frame" sublabel="PNG with transparency works best" />
                        
                        <div>
                            <label className="text-sm font-medium text-text-secondary">Background</label>
                            <div className="grid grid-cols-3 gap-2 mt-2">
                               {Object.values(BackgroundType).map(type => (
                                    <button key={type} onClick={() => setState(s => ({ ...s, background: { ...s.background, type } }))} className={`p-2 rounded-md text-sm transition-colors ${state.background.type === type ? 'bg-primary text-white' : 'bg-surface-3 hover:bg-primary/50'}`}>
                                        {type}
                                    </button>
                                ))}
                            </div>
                             <div className="mt-3">
                                {state.background.type === BackgroundType.Solid && (
                                    <input type="color" value={state.background.value.startsWith('#') ? state.background.value : '#000000'} onChange={e => handleBackgroundValueChange(e.target.value)} className="w-full h-10 p-1 bg-surface-3 border border-border-color rounded-md cursor-pointer" />
                                )}
                                 {state.background.type === BackgroundType.Gradient && (
                                    <input type="text" value={state.background.value} onChange={e => handleBackgroundValueChange(e.target.value)} className="w-full p-2 bg-surface-3 border border-border-color rounded-md text-sm" placeholder="e.g., linear-gradient(...)" />
                                )}
                                {state.background.type === BackgroundType.Image && (
                                     <label htmlFor="bg-image-upload" className="w-full text-sm cursor-pointer bg-surface-3 hover:bg-primary/50 border border-border-color rounded-lg flex items-center justify-center p-2 text-center">
                                        <UploadIcon className="w-4 h-4 mr-2" />
                                        Upload Background Image
                                    </label>
                                )}
                                 <input id="bg-image-upload" type="file" className="hidden" accept="image/*" onChange={e => { if (e.target.files && e.target.files[0]) { const reader = new FileReader(); reader.onloadend = () => setState(s => ({ ...s, background: {type: BackgroundType.Image, value: reader.result as string} })); reader.readAsDataURL(e.target.files[0]); e.target.value = ''; } }} />
                            </div>
                        </div>
                    </>
                )}

                {activeTab === 'Text' && (
                    <>
                        <div>
                            <label className="text-sm font-medium text-text-secondary">Content</label>
                            <div className="space-y-3 mt-2">
                             <input type="text" value={state.text.title} onChange={e => setState(s => ({ ...s, text: {...s.text, title: e.target.value}}))} className="w-full p-2 bg-surface-3 border border-border-color rounded-md text-sm" placeholder="Title" />
                             <input type="text" value={state.text.subtitle} onChange={e => setState(s => ({ ...s, text: {...s.text, subtitle: e.target.value}}))} className="w-full p-2 bg-surface-3 border border-border-color rounded-md text-sm" placeholder="Subtitle" />
                            </div>
                        </div>
                         <div>
                            <label className="text-sm font-medium text-text-secondary">Styling</label>
                            <div className="grid grid-cols-2 gap-3 mt-2">
                                <input type="color" value={state.text.color} onChange={e => setState(s => ({ ...s, text: {...s.text, color: e.target.value}}))} className="w-full h-10 p-1 bg-surface-3 border border-border-color rounded-md cursor-pointer" title="Text Color"/>
                                <select value={state.text.font} onChange={e => setState(s => ({ ...s, text: {...s.text, font: e.target.value}}))} className="w-full p-2 bg-surface-3 border border-border-color rounded-md text-sm">
                                    {FONTS.map(font => <option key={font} value={font}>{font}</option>)}
                                </select>
                                 <select value={state.text.size} onChange={e => setState(s => ({ ...s, text: {...s.text, size: e.target.value}}))} className="w-full p-2 bg-surface-3 border border-border-color rounded-md text-sm col-span-2">
                                    {FONT_SIZES.map(size => <option key={size} value={size}>{size.replace('text-', '')}</option>)}
                                </select>
                             </div>
                         </div>
                         <div>
                            <label className="text-sm font-medium text-text-secondary">Padding</label>
                            <div className="grid grid-cols-5 gap-2 mt-2">
                                {PADDINGS.map(p => (
                                    <button key={p} onClick={() => setState(s => ({...s, padding: p}))} className={`p-2 text-xs rounded-md ${state.padding === p ? 'bg-primary text-white' : 'bg-surface-3 hover:bg-primary/50'}`}>{p.replace('p-', '')}</button>
                                ))}
                            </div>
                        </div>
                    </>
                )}
                 {activeTab === 'AI' && (
                    <div>
                        <p className="text-sm text-text-secondary mb-4">Generate catchy titles and subtitles for your mockup based on your screenshot.</p>
                        <button onClick={onGenerateTitles} disabled={isAiLoading || !state.screenshot} className="w-full flex items-center justify-center p-2 text-sm font-semibold rounded-md bg-primary hover:bg-primary-hover disabled:bg-surface-3 disabled:cursor-not-allowed transition-colors">
                            <SparklesIcon className="w-5 h-5 mr-2" />
                            {isAiLoading ? 'Generating...' : 'Generate Suggestions'}
                        </button>
                         {aiError && <p className="text-red-400 text-sm mt-2">{aiError}</p>}
                        <div className="space-y-2 mt-4 max-h-96 overflow-y-auto">
                            {aiSuggestions.map((s, i) => (
                                 <button key={i} onClick={() => setState(st => ({...st, text: {...st.text, title: s.title, subtitle: s.subtitle}}))} className="w-full p-3 rounded-md bg-surface-3 hover:bg-primary/50 text-left transition-colors">
                                    <p className="font-semibold text-sm">{s.title}</p>
                                    <p className="text-xs text-text-secondary">{s.subtitle}</p>
                                </button>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ControlPanel;
