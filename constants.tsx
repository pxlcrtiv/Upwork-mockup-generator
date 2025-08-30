import React from 'react';
import type { MockupState } from './types';
import { BackgroundType } from './types';

export const FONTS: string[] = ['Inter', 'Poppins', 'Roboto Mono', 'Lora'];
export const FONT_SIZES: string[] = ['text-xl', 'text-2xl', 'text-3xl', 'text-4xl', 'text-5xl'];
export const PADDINGS: string[] = ['p-8', 'p-12', 'p-16', 'p-20', 'p-24'];

export const DEFAULT_STATE: MockupState = {
    screenshot: 'https://picsum.photos/800/600',
    deviceImage: 'https://i.imgur.com/4QJjW6z.png', // Default phone frame with transparency
    background: {
        type: BackgroundType.Gradient,
        value: 'linear-gradient(to right, #8A2BE2, #4B0082)',
    },
    text: {
        title: 'Present Your App',
        subtitle: 'Beautifully and effortlessly.',
        color: '#FFFFFF',
        font: 'Poppins',
        size: 'text-4xl'
    },
    padding: 'p-20',
};