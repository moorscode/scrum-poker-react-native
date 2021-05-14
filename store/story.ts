const GOT_STORY = 'GOT_STORY';

export const gotStory = (name: string) => ({type: GOT_STORY, name});

const reducer = (state = '', action) => {
    switch (action.type) {
        case GOT_STORY:
            return action.name;
        default:
            return state;
    }
};

export default reducer;
