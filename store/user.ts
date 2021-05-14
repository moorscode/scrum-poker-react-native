const GOT_USER_ID = 'GOT_USER_ID';
const SET_USER_NAME = 'SET_USER_ID';
const SET_USER_OBSERVER = 'SET_USER_OBSERVER';

export const gotUserId = (userId: string) => ({type: GOT_USER_ID, userId});
export const setUserName = (name: string) => ({type: SET_USER_NAME, name});
export const setUserObserver = (observer: boolean) => ({type: SET_USER_OBSERVER, observer});

const reducer = (state = {userId: null, name: null, observer: false}, action) => {
    switch (action.type) {
        case GOT_USER_ID:
            return {
                ...state,
                userId: action.userId,
            };
        case SET_USER_NAME:
            return {
                ...state,
                name: action.name,
            };
        case SET_USER_OBSERVER:{}
            return {
                ...state,
                observer: action.observer,
            };
        default:
            return state;
    }
};

export default reducer;
