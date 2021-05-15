const SET_READY = 'SET_READY';
const SET_BACKGROUND_COLOR = 'SET_BACKGROUND_COLOR';

export const setReady = (ready: boolean) => ({type: SET_READY, ready});
export const setBackgroundColor = (color: string) => ({type: SET_BACKGROUND_COLOR, color});

type App = {
    ready: boolean;
    backgroundColor: string;
}

const reducer = (state: App = { ready: false, backgroundColor: "#eee" }, action: any) => {
    switch (action.type) {
        case SET_READY:
            return {
                ...state,
                ready: action.ready
            };
        case SET_BACKGROUND_COLOR:
            return {
                ...state,
                backgroundColor: action.color,
            };
        default:
            return state;
    }
};

export default reducer;
