type CursorState = "horizontal" | "horizontal-max" | "horizontal-min" | "vertical" | "vertical-max" | "vertical-min";
export declare function getCursorStyle(state: CursorState): string;
export declare function resetGlobalCursorStyle(): void;
export declare function setGlobalCursorStyle(state: CursorState): void;
export {};
