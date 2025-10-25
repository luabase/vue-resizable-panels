import type { Direction, PanelData, ResizeEvent } from "../types";
export type Coordinates = {
    movement: number;
    offset: number;
};
export type Size = {
    height: number;
    width: number;
};
export declare function getDragOffset(event: ResizeEvent, handleId: string, direction: Direction, initialOffset?: number): number;
export declare function getMovement(event: ResizeEvent, groupId: string, handleId: string, panelsArray: PanelData[], direction: Direction, sizes: number[], initialOffset: number): number;
export declare function isKeyDown(event: ResizeEvent): event is KeyboardEvent;
export declare function isMouseEvent(event: ResizeEvent): event is MouseEvent;
export declare function isTouchEvent(event: ResizeEvent): event is TouchEvent;
