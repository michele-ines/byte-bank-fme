// Declarações globais para módulos SCSS
declare module "*.module.scss" {
    const content: Record<string, string>;
    export default content;
}

declare module "*.scss" {
    const content: Record<string, string>;
    export default content;
}

// Declarações para módulos do Next.js
declare module "next/router" {
    export function useRouter(): {
        push: (url: string) => void;
        replace: (url: string) => void;
        back: () => void;
        pathname: string;
        query: Record<string, string | string[]>;
        asPath: string;
        route: string;
        reload: () => void;
        beforePopState: (cb: (state: any) => boolean) => void;
        prefetch: (url: string) => Promise<void>;
        events: {
            on: (event: string, handler: (...args: any[]) => void) => void;
            off: (event: string, handler: (...args: any[]) => void) => void;
        };
    };
}

declare module "next/image" {
    import { ComponentType } from "react";
    interface ImageProps {
        src: string;
        alt: string;
        width?: number;
        height?: number;
        fill?: boolean;
        priority?: boolean;
        className?: string;
        style?: React.CSSProperties;
        sizes?: string;
        quality?: number;
        placeholder?: "blur" | "empty";
        blurDataURL?: string;
        onLoad?: () => void;
        onError?: () => void;
        loading?: "lazy" | "eager";
        unoptimized?: boolean;
    }
    const Image: ComponentType<ImageProps>;
    export default Image;
}

declare module "next/link" {
    import { ComponentType, ReactNode } from "react";
    interface LinkProps {
        href: string;
        as?: string;
        replace?: boolean;
        scroll?: boolean;
        shallow?: boolean;
        passHref?: boolean;
        prefetch?: boolean;
        locale?: string;
        className?: string;
        children: ReactNode;
        onClick?: (e: React.MouseEvent<HTMLAnchorElement>) => void;
        target?: string;
        rel?: string;
    }
    const Link: ComponentType<LinkProps>;
    export default Link;
}