const ACTION_PREFIX = 'audio-playback.';

export const ACTION_PLAYBACK_STARTED = `${ACTION_PREFIX}ACTION_PLAYBACK_STARTED`;
export const ACTION_PLAYBACK_STOPPED = `${ACTION_PREFIX}ACTION_PLAYBACK_STOPPED`;
export const VOLUME_CHANGED = `${ACTION_PREFIX}VOLUME_CHANGED`;
export const TOGGLE_VOLUME_CONTROL = `${ACTION_PREFIX}TOGGLE_VOLUME_CONTROL`;

export const startPlayback = (id) => ({
    type: ACTION_PLAYBACK_STARTED,
    id
});

export const stopPlayback = () => ({
    type: ACTION_PLAYBACK_STOPPED
});

export const toggleVolumeControl = (id) => ({
    type: TOGGLE_VOLUME_CONTROL,
    id
});

export const changeVolume = (volume) => ({
    type: VOLUME_CHANGED,
    volume
});