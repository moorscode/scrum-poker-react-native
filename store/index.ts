import {combineReducers, createStore} from 'redux';
import user, {gotUserId} from './user';
import votes, {gotMyCurrentVote, gotMyInitialVote, gotVotes} from './votes';
import points, {gotPoints} from './points';
import room, {gotRoom} from './room';
import ready, {setReady} from './general';
import story, {gotStory} from './story';
import socket from '../socket';

const reducers = combineReducers({room, votes, user, points, ready, story});
const store = createStore(reducers);

socket.on("userId", data => {
    console.log('user id', data);
    store.dispatch(gotUserId(data));
    store.dispatch(gotRoom(''));
    socket.emit( "identify", { id: data } );
});

let userId = "";
store.subscribe(() => {
    const state = store.getState();
    if (state.user.userId !== userId) {
        console.log('set ready');
        userId = state.user.userId;
        store.dispatch(setReady(true));
    }
});

socket.on("welcome", () => {
    changeRoom("test");
});

socket.on("story", data => {
    console.log( "on story", data );
    store.dispatch(gotStory(data));
});

socket.on("myVote", data => {
    store.dispatch(gotMyInitialVote(data.initialVote));
    store.dispatch(gotMyCurrentVote(data.currentVote));
});

socket.on("joined", room => {
    store.dispatch(gotRoom(room));
});

socket.on("votes", data => {
    if (data.voteCount === 0) {
        store.dispatch(gotMyInitialVote(""));
        store.dispatch(gotMyCurrentVote(""));
    }

    const votes = data.votes.sort((a, b) => a.currentValue - b.currentValue) || [];

    store.dispatch(gotVotes(votes));
    // setVotesRevealed(data.votesRevealed);
    // state.votesRevealed = data.votesRevealed;
    // state.voteCount = data.voteCount;
    // state.votedNames = data.votedNames || [];
    // setGroupedVoterNames(data.groupedVoterNames || [] );
    // state.nearestPointAverage = data.nearestPointAverage;
    // state.voteAverage = data.voteAverage;
    // state.votesRevealed = data.votesRevealed;
});

socket.on("points", data => {
    console.log('on points', data);
    store.dispatch(gotPoints(data));
});

export const vote = value => {
    console.log('cast vote', value);
    const state = store.getState();
    socket.emit( "vote", { poker: state.room, vote: value } );
}

export const changeRoom = value => {
    const state = store.getState();

    if ( state.room === value ) {
        return;
    }

    if ( state.room ) {
        socket.emit( "leave", { poker: state.room } );
    }

    socket.emit( "join", { poker: value, name: state.user.name } );
}

export default store;

export * from './user';
export * from './votes';
export * from './points';
export * from './room';
export * from './general';
