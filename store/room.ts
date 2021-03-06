const GOT_ROOM = 'GOT_ROOM';

export const gotRoom = (room: string) => ({type: GOT_ROOM, room});

type Room = string;

const reducer = (state: Room = '', action: any) => {
    switch (action.type) {
        case GOT_ROOM:
            return action.room;
        default:
            return state;
    }
};

export default reducer;
