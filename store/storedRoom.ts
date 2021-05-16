const SET_STORED_ROOM = 'SET_STORED_ROOM';

export const setStoredRoom = (room: string) => ({type: SET_STORED_ROOM, room});

type Room = string;

const reducer = (state: Room = '', action: any) => {
    switch (action.type) {
        case SET_STORED_ROOM:
            return action.room;
        default:
            return state;
    }
};

export default reducer;
