import { type PropType } from "vue";
import type { Direction, PanelData, PanelGroupOnLayout } from "./types";
export type CommittedValues = {
    direction: Direction;
    panels: Map<string, PanelData>;
    sizes: number[];
};
export type PanelDataMap = Map<string, PanelData>;
export type PanelGroupProps = {
    autoSaveId?: string;
    direction: Direction;
    id?: string | null;
    onLayout?: PanelGroupOnLayout;
    tagName?: string;
};
export declare const PanelGroup: import("vue").DefineComponent<import("vue").ExtractPropTypes<{
    autoSaveId: {
        type: StringConstructor;
        required: false;
    };
    direction: {
        type: PropType<Direction>;
        required: true;
    };
    id: {
        type: PropType<string | null>;
        default: null;
        required: false;
        validator: (v: unknown) => boolean;
    };
    onLayout: {
        type: PropType<PanelGroupOnLayout | null>;
        default: null;
        required: false;
    };
    tagName: {
        type: StringConstructor;
        default: string;
        required: false;
    };
}>, () => import("vue").VNode<import("vue").RendererNode, import("vue").RendererElement, {
    [key: string]: any;
}>, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, import("vue").PublicProps, Readonly<import("vue").ExtractPropTypes<{
    autoSaveId: {
        type: StringConstructor;
        required: false;
    };
    direction: {
        type: PropType<Direction>;
        required: true;
    };
    id: {
        type: PropType<string | null>;
        default: null;
        required: false;
        validator: (v: unknown) => boolean;
    };
    onLayout: {
        type: PropType<PanelGroupOnLayout | null>;
        default: null;
        required: false;
    };
    tagName: {
        type: StringConstructor;
        default: string;
        required: false;
    };
}>> & Readonly<{}>, {
    id: string | null;
    tagName: string;
    onLayout: PanelGroupOnLayout | null;
}, {}, {}, {}, string, import("vue").ComponentProvideOptions, true, {}, any>;
