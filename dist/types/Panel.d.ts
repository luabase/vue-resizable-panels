import { type CSSProperties, type PropType } from "vue";
import type { PanelOnCollapse, PanelOnResize } from "./types";
export type PanelProps = {
    collapsible?: boolean;
    defaultSize?: number | null;
    id?: string | null;
    maxSize?: number;
    minSize?: number;
    onCollapse?: PanelOnCollapse | null;
    onResize?: PanelOnResize | null;
    order?: number | null;
    style?: CSSProperties;
    tagName?: string;
};
export type ImperativePanelHandle = {
    collapse: () => void;
    expand: () => void;
    getCollapsed(): boolean;
    getSize(): number;
    resize: (percentage: number) => void;
};
export declare const Panel: import("vue").DefineComponent<import("vue").ExtractPropTypes<{
    collapsible: {
        type: BooleanConstructor;
        default: boolean;
        required: false;
    };
    defaultSize: {
        type: PropType<number | null>;
        default: null;
        required: false;
        validator: (defaultSize: number | null) => boolean;
    };
    maxSize: {
        type: NumberConstructor;
        default: number;
        required: false;
        validator: (maxSize: number) => boolean;
    };
    minSize: {
        type: NumberConstructor;
        default: number;
        required: false;
        validator: (minSize: number) => boolean;
    };
    onCollapse: {
        type: PropType<PanelOnCollapse | null>;
        default: null;
        required: false;
    };
    onResize: {
        type: PropType<PanelOnResize | null>;
        default: null;
        required: false;
    };
    order: {
        type: PropType<number | null>;
        default: null;
        required: false;
        validator: (v: unknown) => boolean;
    };
    id: {
        type: PropType<string | null>;
        default: null;
        required: false;
        validator: (v: unknown) => boolean;
    };
    tagName: {
        type: StringConstructor;
        default: string;
        required: false;
    };
}>, () => import("vue").VNode<import("vue").RendererNode, import("vue").RendererElement, {
    [key: string]: any;
}>, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, import("vue").PublicProps, Readonly<import("vue").ExtractPropTypes<{
    collapsible: {
        type: BooleanConstructor;
        default: boolean;
        required: false;
    };
    defaultSize: {
        type: PropType<number | null>;
        default: null;
        required: false;
        validator: (defaultSize: number | null) => boolean;
    };
    maxSize: {
        type: NumberConstructor;
        default: number;
        required: false;
        validator: (maxSize: number) => boolean;
    };
    minSize: {
        type: NumberConstructor;
        default: number;
        required: false;
        validator: (minSize: number) => boolean;
    };
    onCollapse: {
        type: PropType<PanelOnCollapse | null>;
        default: null;
        required: false;
    };
    onResize: {
        type: PropType<PanelOnResize | null>;
        default: null;
        required: false;
    };
    order: {
        type: PropType<number | null>;
        default: null;
        required: false;
        validator: (v: unknown) => boolean;
    };
    id: {
        type: PropType<string | null>;
        default: null;
        required: false;
        validator: (v: unknown) => boolean;
    };
    tagName: {
        type: StringConstructor;
        default: string;
        required: false;
    };
}>> & Readonly<{}>, {
    collapsible: boolean;
    defaultSize: number | null;
    maxSize: number;
    minSize: number;
    onCollapse: PanelOnCollapse | null;
    onResize: PanelOnResize | null;
    order: number | null;
    id: string | null;
    tagName: string;
}, {}, {}, {}, string, import("vue").ComponentProvideOptions, true, {}, any>;
