import {combineReducers, createStore} from 'redux';
import user, {gotUserId, setUserName, setUserObserver} from './user';
import votes, {gotMyCurrentVote, gotMyInitialVote, gotVotes, MyVote, Vote, Votes} from './votes';
import points, {gotPoints} from './points';
import room, {gotRoom} from './room';
import ready, {setReady} from './general';
import story, {gotStory} from './story';
import socket from '../utils/Socket';
import {gotMembers, MemberList} from "./members";

const reducers = combineReducers({room, votes, user, points, ready, story});
const store = createStore(reducers);

socket.on("userId", (userId: string) => {
    console.log('user id', userId);
    // store.dispatch(gotRoom(''));
    store.dispatch(gotUserId(userId));
    socket.emit("identify", {id: userId});
});

let userId = "";
store.subscribe(() => {
    const state = store.getState();
    if (state.user.userId !== userId) {
        userId = state.user.userId;
        store.dispatch(setReady(true));
    }
});

socket.on("welcome", () => {
    // changeRoom("test");
});

socket.on("story", (story: string) => {
    store.dispatch(gotStory(story));
});

socket.on("myVote", (myVote: MyVote) => {
    store.dispatch(gotMyInitialVote(myVote.initialVote));
    store.dispatch(gotMyCurrentVote(myVote.currentVote));
});

socket.on("joined", (room: string) => {
    store.dispatch(gotRoom(room));
});

socket.on("memberList", (memberList: MemberList) => {
    store.dispatch(gotMembers(memberList));
});

socket.on("votes", (votesData: Votes) => {
    if (votesData.voteCount === 0) {
        store.dispatch(gotMyInitialVote(""));
        store.dispatch(gotMyCurrentVote(""));
    }

    const votes = votesData.votes.sort(
        (a: Vote, b: Vote) => parseInt(a.currentValue, 10) - parseInt(b.currentValue, 10)
    ) || [];

    store.dispatch(gotVotes(votes));
    // state.votesRevealed = data.votesRevealed;
    // state.voteCount = data.voteCount;
    // state.votedNames = data.votedNames || [];
    // setGroupedVoterNames(data.groupedVoterNames || [] );
    // state.nearestPointAverage = data.nearestPointAverage;
    // state.voteAverage = data.voteAverage;
    // state.votesRevealed = data.votesRevealed;
});

socket.on("points", (data: number[] | string[]) => {
    store.dispatch(gotPoints(data));
});

export const vote = (value: number | string) => {
    const state = store.getState();

    if ( state.user.observer ) {
        console.log('not voting because observer', value);
        return;
    }

    console.log('cast vote', value);

    socket.emit("vote", {poker: state.room, vote: value});
}

export const toggleRevealVotes = () => {
    console.log('toggle reveal votes');
    const state = store.getState();
    socket.emit("toggleRevealVotes", {poker: state.room});
}

export const newStory = () => {
    console.log('new story');
    const state = store.getState();
    socket.emit("newStory", {poker: state.room});
}

export const finishRefinement = () => {
    console.log('finish');
    const state = store.getState();
    socket.emit("finish", {poker: state.room});
}

export const setObserving = (observe: boolean) => {
    console.log('observing', observe);
    const state = store.getState();

    if (state.user.observer === observe) {
        console.log('no change', observe);
        return;
    }

    store.dispatch(setUserObserver(observe));

    if (observe) {
        socket.emit("observe", {poker: state.room});
        return;
    }

    socket.emit("join", {poker: state.room, name: state.user.name});
}

export const changeRoom = (value: string) => {
    const state = store.getState();

    const newRoom = value.toLowerCase();

    if (state.room === newRoom) {
        return;
    }

    if (state.room) {
        socket.emit("leave", {poker: state.room});
    }

    socket.emit("join", {poker: newRoom, name: state.user.name});
}

export const changeName = (value: string) => {
    const state = store.getState();

    if (state.user.name === value) {
        return;
    }

    socket.emit("nickname", {poker: state.room, name: value});
    setUserName(value);
}

export const changeStoryName = (value: string) => {
    const state = store.getState();

    if (state.story === value) {
        return;
    }

    socket.emit("changeStoryName", {poker: state.room, name: value});
}

export default store;

export * from './user';
export * from './votes';
export * from './points';
export * from './room';
export * from './general';

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch