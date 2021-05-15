const GOT_ROOM = 'GOT_ROOM';

export const gotRoom = (name: string) => ({type: GOT_ROOM, name});

type Room = string;

const reducer = (state: Room = '', action: any) => {
    switch (action.type) {
        case GOT_ROOM:
            return action.name;
        default:
            return state;
    }
};

export default reducer;
