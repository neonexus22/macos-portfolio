import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import { locations, type LocationType } from "../constants";

const DEFAULT_LOCATION = locations.work;

type LocationStateType = {
	activeLocation: LocationType;
	setActiveLocation: (location: LocationType) => void;
	resetActiveLocation: () => void;
};

const useLocationStore = create<LocationStateType>()(
	immer((set) => ({
		activeLocation: DEFAULT_LOCATION,
		setActiveLocation: (location: LocationType) =>
			set((state: LocationStateType) => {
				if (location === undefined) return;
				state.activeLocation = location;
			}),
		resetActiveLocation: () =>
			set((state: LocationStateType) => {
				state.activeLocation = DEFAULT_LOCATION;
			}),
	})),
);

export default useLocationStore;
