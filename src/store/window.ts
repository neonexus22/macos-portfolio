import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import {
	INITIAL_Z_INDEX,
	WINDOW_CONFIG,
	type WINDOW_CONFIG_KEY,
	type WINDOW_CONFIG_VALUE,
} from "../constants";

type StateType = {
	windows: Record<WINDOW_CONFIG_KEY, WINDOW_CONFIG_VALUE>;
	nextZIndex: number;
	openWindow: (windowKey: string, data?: unknown) => void;
	closeWindow: (windowKey: string) => void;
	focusWindow: (windowKey: string) => void;
};

const useWindowStore = create<StateType>()(
	immer((set) => ({
		windows: WINDOW_CONFIG,
		nextZIndex: INITIAL_Z_INDEX + 1,

		openWindow: (windowKey: string, data = null) =>
			set((state: StateType) => {
				const win = state.windows[windowKey as WINDOW_CONFIG_KEY];
				win.isOpen = true;
				win.zIndex = state.nextZIndex;
				win.data = data ?? win.data;
				++state.nextZIndex;
			}),
		closeWindow: (windowKey: string) =>
			set((state: StateType) => {
				const win = state.windows[windowKey as WINDOW_CONFIG_KEY];
				win.isOpen = false;
				win.zIndex = INITIAL_Z_INDEX;
				win.data = null;
			}),
		focusWindow: (windowKey: string) =>
			set((state: StateType) => {
				const win = state.windows[windowKey as WINDOW_CONFIG_KEY];
				win.zIndex = state.nextZIndex++;
			}),
	})),
);

export default useWindowStore;
