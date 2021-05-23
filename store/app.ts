const SET_READY = 'SET_READY';
const SET_BACKGROUND_COLOR = 'SET_BACKGROUND_COLOR';
const SET_FINISHED = 'SET_FINISHED';

export const setReady = (ready: boolean) => ({type: SET_READY, ready});
export const setBackgroundColor = (color: string) => ({type: SET_BACKGROUND_COLOR, color});
export const gotRefinementFinished = (finished: boolean) => ({type: SET_FINISHED, finished});

type App = {
    ready: boolean;
    backgroundColor: string;
    refinementFinished: boolean;
}

const reducer = (state: App = { ready: false, backgroundColor: "#eee", refinementFinished: false }, action: any) => {
    switch (action.type) {
        case SET_READY:
            return {
                ...state,
                ready: action.ready
            };
        case SET_FINISHED:
            return {
                ...state,
                refinementFinished: action.finished,
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
