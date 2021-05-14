const GOT_ROOM = 'GOT_ROOM';

export const gotRoom = (name: string) => ({type: GOT_ROOM, name});

const reducer = (state = 'test', action) => {
    switch (action.type) {
        case GOT_ROOM:
            return action.name;
        default:
            return state;
    }
};

export default reducer;
