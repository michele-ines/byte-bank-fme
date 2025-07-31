// apps/root/src/types/web-components.d.ts
import type { DetailedHTMLProps, HTMLAttributes } from 'react';

declare global {
  namespace JSX {
    interface IntrinsicElements {
      // Declara a tag do Web Component e os atributos aceitos
      'byte-footer': DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement> & {
        'data-theme'?: 'public' | 'private';
      };
    }
  }
}

export {};
