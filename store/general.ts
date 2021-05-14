const SET_READY = 'SET_READY';

export const setReady = (ready: boolean) => ({type: SET_READY, ready});

const reducer = (state = false, action) => {
    switch (action.type) {
        case SET_READY:
            return action.ready;
        default:
            return state;
    }
};

export default reducer;
