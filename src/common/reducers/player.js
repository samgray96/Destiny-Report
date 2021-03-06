import { cloneDeep, isEmpty } from "lodash";
import initial from "../utility/initials.json";

const SET_GAMBIT_DATA = "SET_GAMBIT_DATA";
const START_SET_DATA = "START_SET_DATA";
const SUCCESS_SET_DATA = "SUCCESS_SET_DATA";
const FAIL_SET_DATA = "FAIL_SET_DATA";
const RESET_DATA = "RESET_DATA";
const SET_MEMBERSHIP_DATA = "SET_MEMBERSHIP_DATA";
const FINISHED_LOADING = "FINISHED_LOADING";
const SET_ACTIVE_MEMBERSHIP = "SET_ACTIVE_MEMBERSHIP";
const SET_CRUCIBLE_DATA = "SET_CRUCIBLE_DATA";
const SET_RAID_DATA = "SET_RAID_DATA";
const PLAYER_NOT_FOUND = "PLAYER_NOT_FOUND";
const FAIL_SET_DATA_PRIVACY = "FAIL_SET_DATA_PRIVACY";
const SET_CHECKED_RAID_BADGES = "SET_CHECKED_RAID_BADGES";
const SET_RAID_ACTIVITIES_DATA = "SET_RAID_ACTIVITIES_DATA";

const player = (state = initial, action) => {
	switch (action.type) {
		case START_SET_DATA:
			state = {
				...state,
				isApiLoading: true,
				gambitIsLoading: true,
				crucibleIsLoading: true,
				raidIsLoading: true,
				gambitSuccess: false,
				crucibleSuccess: false,
				raidSuccess: false,
				chartIsLoading: true,
				raidActivitiesLoading: true,
				error: false,
				isPlayerFound: true
			};

			return state;
		case SET_GAMBIT_DATA:
			state = cloneDeep(state);

			state.gambit = cloneDeep(action.payload.gambit);
			state.infamy = cloneDeep(action.payload.infamy);

			return state;
		case SET_CRUCIBLE_DATA:
			state = cloneDeep(state);
			if (!isEmpty(action.payload.valorProgress)) {
				state.valor = cloneDeep(action.payload.valorProgress);
			}
			if (!isEmpty(action.payload.gloryProgress)) {
				state.glory = cloneDeep(action.payload.gloryProgress);
			}

			if (!isEmpty(action.payload.crucibleStats)) {
				state.crucibleStats = cloneDeep(action.payload.crucibleStats);
			}
			return state;
		case SET_RAID_DATA:
			state = cloneDeep(state);
			const activities = cloneDeep(state.raid.activities);
			state.raid = cloneDeep(action.payload);
			state.raid.activities = activities;
			return state;
		case SET_CHECKED_RAID_BADGES:
			state = cloneDeep(state);
			if (action.payload) {
				state.raid.badges = action.payload;
			}
			state.isApiLoading = false;
			return state;
		case SET_RAID_ACTIVITIES_DATA:
			state = cloneDeep(state);
			state.raid.activities = action.payload;
			return state;
		case SET_MEMBERSHIP_DATA:
			state = cloneDeep(state);
			state.memberships = cloneDeep(action.payload.memberships);
			return state;
		case SUCCESS_SET_DATA:
			if (action.payload === "gambit") {
				state = { ...state, gambitSuccess: true };
			} else if (action.payload === "crucible") {
				state = { ...state, crucibleSuccess: true };
			} else if (action.payload === "raid") {
				state = { ...state, raidSuccess: true };
			}
			return state;
		case SET_ACTIVE_MEMBERSHIP:
			state = { ...state, activeMembership: action.payload };
			return state;
		case FINISHED_LOADING:
			if (action.payload === "gambit") {
				state = { ...state, gambitIsLoading: false };
			} else if (action.payload === "crucible") {
				state = { ...state, crucibleIsLoading: false };
			} else if (action.payload === "raid") {
				state = { ...state, raidIsLoading: false };
			} else if (action.payload === "raid-activities") {
				state = { ...state, raidActivitiesLoading: false };
			} else if (action.payload === "chart") {
				state = { ...state, chartIsLoading: false };
			}
			return state;
		case FAIL_SET_DATA:
			state = cloneDeep(state);
			state.error = true;
			state.errorMessage = action.payload;
			return state;
		case RESET_DATA:
			state = cloneDeep(initial);
			state.gambitIsLoading = false;
			return state;
		case PLAYER_NOT_FOUND:
			state = {
				...state,
				isPlayerFound: false,
				gambitSuccess: false,
				gambitIsLoading: false,
				raidSuccess: false,
				raidIsLoading: false,
				crucibleSuccess: false,
				crucibleIsLoading: false
			};
			return state;
		case FAIL_SET_DATA_PRIVACY:
			state = { ...state, privacyError: true };
			return state;
		default:
			return state;
	}
};

export default player;
