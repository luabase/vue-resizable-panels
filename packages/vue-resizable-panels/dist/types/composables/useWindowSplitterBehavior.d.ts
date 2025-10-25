import { type Ref } from "vue";
import type { CommittedValues, PanelDataMap } from "../PanelGroup";
import type { ResizeHandler } from "../types";
export declare function useWindowSplitterPanelGroupBehavior({ committedValuesRef, groupId, panels, sizes, panelSizeBeforeCollapse, }: {
    committedValuesRef: Ref<CommittedValues>;
    groupId: Ref<string>;
    panels: Ref<PanelDataMap>;
    sizes: Ref<number[]>;
    panelSizeBeforeCollapse: Ref<Map<string, number>>;
}): void;
export declare function useWindowSplitterResizeHandlerBehavior({ disabled, handleId, resizeHandler, }: {
    disabled: Ref<boolean>;
    handleId: Ref<string>;
    resizeHandler: Ref<ResizeHandler | null>;
}): void;
