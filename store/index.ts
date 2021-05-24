import {combineReducers, createStore} from 'redux';
import {showMessage} from "react-native-flash-message";
import user, {gotUserId, setUserName, setUserObserver} from './user';
import votes, {
    gotGroupedVoterNames,
    gotMyCurrentVote,
    gotMyInitialVote,
    gotNearestPointAverage,
    gotVoteAverage,
    gotVoteCount,
    gotVotedNames,
    gotVotes,
    gotVotesRevealed,
    MyVote,
    Vote,
    Votes,
    VoteValue
} from './votes';
import points, {gotPoints} from './points';
import room, {gotRoom} from './room';
import app, {gotRefinementFinished, setBackgroundColor, setReady} from './app';
import story, {gotStory} from './story';
import socket from '../utils/socket';
import members, {gotMembers, MemberList} from "./members";
import AsyncStorage from "@react-native-async-storage/async-storage";
import determineBackgroundColor from "../utils/determineBackgroundColor";

const reducers = combineReducers({room, votes, user, points, app, story, members});
const store = createStore(reducers);

const storageReducers = combineReducers({room});
const storageStore = createStore(storageReducers);

AsyncStorage.multiGet(["username", "room"]).then((results) => {
    results.map(([key, value]) => {
        if (!value) {
            return;
        }

        if (key === "username") {
            store.dispatch(setUserName(value));
        }
        if (key === "room") {
            storageStore.dispatch(gotRoom(value));
        }
    });
});

socket.on("userId", (userId: string) => {
    store.dispatch(gotUserId(userId));
    socket.emit("identify", {id: userId});
});

socket.on("disconnect", () => {
    store.dispatch(setReady(false));
});

socket.on("welcome", () => {
    const state = storageStore.getState();
    if (state.room) {
        joinRoom(state.room);
    }

    store.dispatch(setReady(true));
});

socket.on("story", (story: string) => {
    store.dispatch(gotStory(story));
});

socket.on("myVote", (myVote: MyVote) => {
    store.dispatch(gotMyInitialVote(myVote.initialVote));
    store.dispatch(gotMyCurrentVote(myVote.currentVote));
});

socket.on("joined", (room: string) => {
    store.dispatch(setReady(true));

    AsyncStorage.setItem("room", room);
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
        (a: Vote, b: Vote) => parseInt("" + a.currentValue, 10) - parseInt("" + b.currentValue, 10)
    ) || [];

    store.dispatch(gotVotes(votes));
    store.dispatch(gotVoteAverage(votesData.voteAverage));
    store.dispatch(gotVoteCount(votesData.voteCount));
    store.dispatch(gotVotesRevealed(votesData.votesRevealed));
    store.dispatch(gotVotedNames(votesData.votedNames));
    store.dispatch(gotGroupedVoterNames(votesData.groupedVoterNames || {}));
    store.dispatch(gotNearestPointAverage(votesData.nearestPointAverage));

    const state = store.getState();
    store.dispatch(
        setBackgroundColor(
            determineBackgroundColor(
                votesData.voteCount,
                state.members.voters.length,
                votesData.voteAverage,
                votes,
                state.points
            )
        )
    );
});

socket.on("points", (data: VoteValue[]) => {
    store.dispatch(gotPoints(data));
});

socket.on("finished", () => {
    store.dispatch(gotRefinementFinished(true));
});

export const vote = (value: VoteValue) => {
    const state = store.getState();
    if (state.user.observer) {
        return;
    }

    socket.emit("vote", {poker: state.room, vote: value});
}

export const toggleRevealVotes = () => {
    const state = store.getState();
    if (!state.room) {
        return;
    }

    socket.emit("toggleRevealVotes", {poker: state.room});
}

export const newStory = () => {
    const state = store.getState();
    socket.emit("newStory", {poker: state.room});
}

export const finishRefinement = () => {
    const state = store.getState();
    socket.emit("finish", {poker: state.room});
}

export const setObserving = (observe: boolean) => {
    const state = store.getState();
    if (state.user.observer === observe) {
        return;
    }

    store.dispatch(setUserObserver(observe));

    if (observe) {
        socket.emit("observe", {poker: state.room});
        return;
    }

    joinRoom(state.room);
}

export const changeRoom = (newRoom: string) => {
    if (!newRoom) {
        return;
    }

    const state = store.getState();

    if (state.room.toLowerCase() === newRoom.toLowerCase()) {
        return;
    }

    if (state.room) {
        socket.emit("leave", {poker: state.room.toLowerCase()});
    }

    joinRoom(newRoom);
}

const joinRoom = (room: string) => {
    const state = store.getState();
    socket.emit("join", {poker: room.toLowerCase(), name: state.user.name});
}

export const changeName = (value: string) => {
    const state = store.getState();
    if (!state.app.ready) {
        return;
    }

    if (value === state.user.name) {
        return;
    }

    store.dispatch(setUserName(value));

    if (state.room) {
        socket.emit("nickname", {poker: state.room, name: value});
    }

    AsyncStorage.setItem("username", value);
}

export const changeStoryName = (value: string) => {
    const state = store.getState();

    if (state.story === value) {
        return;
    }

    if (!state.room) {
        return;
    }

    socket.emit("changeStoryName", {poker: state.room, name: value});
}

let storyName: string = "";
store.subscribe(() => {
    const state = store.getState();

    if (storyName === state.story) {
        return;
    }

    storyName = state.story;

    showMessage({
        message: "Story name has been updated."
    });
});

let refinementFinished = false;
store.subscribe(() => {
    const state = store.getState();

    if (refinementFinished === state.app.refinementFinished) {
        return;
    }

    refinementFinished = state.app.refinementFinished;

    if (refinementFinished) {
        showMessage({
            message: "The refinement is finished.",
        });
    }
});

export default store;

export * from './user';
export * from './votes';
export * from './points';
export * from './room';
export * from './app';
export * from './story';
export * from './members';

export type RootState = ReturnType<typeof store.getState>;
