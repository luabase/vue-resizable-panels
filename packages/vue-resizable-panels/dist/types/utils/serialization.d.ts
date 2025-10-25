import type { PanelData } from "../types";
export declare function loadPanelLayout(autoSaveId: string, panels: PanelData[]): number[] | null;
export declare function savePanelGroupLayout(autoSaveId: string, panels: PanelData[], sizes: number[]): void;
