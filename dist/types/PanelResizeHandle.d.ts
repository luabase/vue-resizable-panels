import { type PropType } from "vue";
export type PanelResizeHandleProps = {
    disabled?: boolean;
    id?: string | null;
    tagName?: string;
};
export declare const PanelResizeHandle: import("vue").DefineComponent<import("vue").ExtractPropTypes<{
    disabled: {
        type: BooleanConstructor;
        default: boolean;
        required: false;
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
    disabled: {
        type: BooleanConstructor;
        default: boolean;
        required: false;
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
    id: string | null;
    tagName: string;
    disabled: boolean;
}, {}, {}, {}, string, import("vue").ComponentProvideOptions, true, {}, any>;
