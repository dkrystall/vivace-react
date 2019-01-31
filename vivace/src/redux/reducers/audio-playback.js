import {
    ACTION_PLAYBACK_STARTED,
    ACTION_PLAYBACK_STOPPED,
    TOGGLE_VOLUME_CONTROL,
    VOLUME_CHANGED
} from "../actions/audio-playback";

const initialState = {volume: 100, volumeControl: false};

export default function reducer(state = initialState, action) {
    switch (action.type) {
        case ACTION_PLAYBACK_STARTED:
            return {
                ...state,
                id: action.id,
                volumeControl: false
            };
        case ACTION_PLAYBACK_STOPPED:
            return {
                ...state,
                id: null,
                volumeControl: false
        };
        case VOLUME_CHANGED:
            return {
                ...state,
                volume: action.volume
            };
        case TOGGLE_VOLUME_CONTROL:
            return {
                ...state,
                volumeControl: !state.volumeControl
            };
        default:
            return state;
    }
}