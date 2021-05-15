const GOT_POINTS = 'GOT_POINTS';

export const gotPoints = (points: number[]|string[]) => ({type: GOT_POINTS, points});

const reducer = (state = [], action: any) => {
    switch (action.type) {
        case GOT_POINTS:
            return action.points;
        default:
            return state;
    }
};

export default reducer;
