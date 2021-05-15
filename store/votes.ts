const GOT_VOTES = 'GOT_VOTES';
const GOT_VOTE_COUNT = 'GOT_VOTE_COUNT';
const GOT_VOTE_AVERAGE = 'GOT_VOTE_AVERAGE';
const GOT_VOTES_REVEALED = 'GOT_VOTES_REVEALED';
const GOT_VOTE_GROUPED_NAMES = 'GOT_VOTE_GROUPED_NAMES';
const GOT_MY_INITIAL_VOTE = 'GOT_MY_INITIAL_VOTE';
const GOT_MY_CURRENT_VOTE = 'GOT_MY_CURRENT_VOTE';

export type VoteValue = string | number | null;

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

type VoteStore = {
    votes: Vote[];
    myInitialVote: VoteValue;
    myCurrentVote: VoteValue;
    voteAverage: VoteValue;
    voteCount: number;
    votesRevealed: boolean;
}

export const gotVotes = (votes: Vote[]) => ({type: GOT_VOTES, votes});
export const gotVoteCount = (count: number) => ({type: GOT_VOTE_COUNT, count});
export const gotVoteAverage = (average: VoteValue) => ({type: GOT_VOTE_AVERAGE, average});
export const gotMyInitialVote = (myInitialVote: VoteValue) => ({type: GOT_MY_INITIAL_VOTE, myInitialVote});
export const gotMyCurrentVote = (myCurrentVote: VoteValue) => ({type: GOT_MY_CURRENT_VOTE, myCurrentVote});

const reducer = (state: VoteStore = {votes: [], myInitialVote: "", myCurrentVote: "", voteAverage: "", voteCount: 0, votesRevealed: false}, action: any) => {
    switch (action.type) {
        case GOT_VOTES:
            return {
                ...state,
                votes: action.votes,
            };
        case GOT_VOTE_COUNT:
            return {
                ...state,
                voteCount: action.count,
            };
        case GOT_VOTE_AVERAGE:
            return {
                ...state,
                voteAverage: action.average,
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
