// Fix: Add React import to resolve React namespace errors.
import React from 'react';

export enum BackgroundType {
  Solid = "Solid",
  Gradient = "Gradient",
  Image = "Image",
}

export interface Background {
  type: BackgroundType;
  value: string;
}

export interface TextOptions {
  title: string;
  subtitle: string;
  color: string;
  font: string;
  size: string;
}

export interface MockupState {
  screenshot: string | null;
  deviceImage: string | null;
  background: Background;
  text: TextOptions;
  padding: string;
}

export interface GeneratedTitle {
  title: string;
  subtitle: string;
}