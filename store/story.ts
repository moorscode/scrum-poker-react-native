const GOT_STORY = 'GOT_STORY';

type Story = string;

export const gotStory = (name: Story) => ({type: GOT_STORY, name});

const reducer = (state: Story = '', action: any) => {
    switch (action.type) {
        case GOT_STORY:
            return action.name;
        default:
            return state;
    }
};

export default reducer;
