import { createSlice } from '@reduxjs/toolkit';

const initialTimerState = { isActive: false, isReset: false };

const timerSlice = createSlice({
	name: 'timer',
	initialState: initialTimerState,
	reducers: {
		start(state) {
			state.isActive = true;
		},
		stop(state) {
			state.isActive = false;
		},
		reset(state) {
			state.isReset = true;
			state.isActive = false;
		},
		clearReset(state) {
			state.isReset = false;
		},
		toggle(state) {
			state.isActive = !state.isActive;
		},
	},
});

export const timerActions = timerSlice.actions;

export default timerSlice.reducer;
