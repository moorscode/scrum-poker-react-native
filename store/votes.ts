const GOT_VOTES = 'GOT_VOTES';
const GOT_VOTE_COUNT = 'GOT_VOTE_COUNT';
const GOT_VOTE_AVERAGE = 'GOT_VOTE_AVERAGE';
const GOT_VOTES_REVEALED = 'GOT_VOTES_REVEALED';
const GOT_VOTED_NAMES = 'GOT_VOTED_NAMES';
const GOT_VOTES_NAMES_GROUPED = 'GOT_VOTES_NAMES_GROUPED';
const GOT_MY_INITIAL_VOTE = 'GOT_MY_INITIAL_VOTE';
const GOT_MY_CURRENT_VOTE = 'GOT_MY_CURRENT_VOTE';
const GOT_NEAREST_POINT_AVERAGE = 'GOT_NEAREST_POINT_AVERAGE';

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
    votedNames: string[];
    voteAverage: VoteValue;
    voteCount: number;
    votesRevealed: boolean;
    groupedVoterNames: GroupedVoterNames;
    nearestPointAverage: VoteValue;
}

export const gotVotes = (votes: Vote[]) => ({type: GOT_VOTES, votes});
export const gotVoteCount = (count: number) => ({type: GOT_VOTE_COUNT, count});
export const gotVoteAverage = (average: VoteValue) => ({type: GOT_VOTE_AVERAGE, average});
export const gotVotesRevealed = (revealed: boolean) => ({type: GOT_VOTES_REVEALED, revealed});
export const gotVotedNames = (names: string[]) => ({type: GOT_VOTED_NAMES, names});
export const gotGroupedVoterNames = (groupedVoterNames: GroupedVoterNames) => ({
    type: GOT_VOTES_NAMES_GROUPED,
    groupedVoterNames
});
export const gotNearestPointAverage = (value: VoteValue) => ({type: GOT_NEAREST_POINT_AVERAGE, value});
export const gotMyInitialVote = (myInitialVote: VoteValue) => ({type: GOT_MY_INITIAL_VOTE, myInitialVote});
export const gotMyCurrentVote = (myCurrentVote: VoteValue) => ({type: GOT_MY_CURRENT_VOTE, myCurrentVote});

const defaultState: VoteStore = {
    votes: [],
    myInitialVote: '',
    myCurrentVote: '',
    voteAverage: '',
    voteCount: 0,
    votesRevealed: false,
    votedNames: [],
    groupedVoterNames: {},
    nearestPointAverage: ''
};

const reducer = (state: VoteStore = defaultState, action: any) => {
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
        case GOT_VOTES_REVEALED:
            return {
                ...state,
                votesRevealed: action.revealed,
            };
        case GOT_VOTED_NAMES:
            return {
                ...state,
                votedNames: action.names,
            };
        case GOT_VOTES_NAMES_GROUPED:
            return {
                ...state,
                groupedVoterNames: action.groupedVoterNames,
            };
        case GOT_NEAREST_POINT_AVERAGE:
            return {
                ...state,
                nearestPointAverage: action.value,
            };
        default:
            return state;
    }
};

export default reducer;
