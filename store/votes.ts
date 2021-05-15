const GOT_VOTES = 'GOT_VOTES';
const GOT_VOTE_COUNT = 'GOT_VOTE_COUNT';
const GOT_VOTES_REVEALED = 'GOT_VOTES_REVEALED';
const GOT_VOTE_GROUPED_NAMES = 'GOT_VOTE_GROUPED_NAMES';
const GOT_MY_INITIAL_VOTE = 'GOT_MY_INITIAL_VOTE';
const GOT_MY_CURRENT_VOTE = 'GOT_MY_CURRENT_VOTE';

export type VoteValue = string | number;

export type MyVote = {
    initialVote: VoteValue;
    currentVote: VoteValue;
}

export type Vote = {
    currentValue: VoteValue;
    initialValue: VoteValue;
    voterName: string;
}

export type GroupedVoterNames = {
    [group: string]: string[];
}

export type Votes = {
    votes: Vote[];
    nearestPointAverage: VoteValue;
    groupedVoterNames: GroupedVoterNames;
    votedNames: string[];
    voteAverage: VoteValue;
    voteCount: number;
    votesRevealed: boolean;
}

export const gotVotes = (votes: object[]) => ({type: GOT_VOTES, votes});
export const gotMyInitialVote = (myInitialVote: string|number) => ({type: GOT_MY_INITIAL_VOTE, myInitialVote});
export const gotMyCurrentVote = (myCurrentVote: string|number) => ({type: GOT_MY_CURRENT_VOTE, myCurrentVote});

const reducer = (state = {votes: [], myInitialVote: "", myCurrentVote: ""}, action: any) => {
    switch (action.type) {
        case GOT_VOTES:
            return {
                ...state,
                votes: action.votes,
            };
        case GOT_MY_INITIAL_VOTE:
            return {
                ...state,
                myInitialVote: action.myInitialVote,
            };
        case GOT_MY_CURRENT_VOTE:
            return {
                ...state,
                myCurrentVote: action.myCurrentVote,
            };
        default:
            return state;
    }
};

export default reducer;
