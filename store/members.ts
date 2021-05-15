export const GOT_MEMBERS = 'GOT_MEMBERS';

export const gotMembers = (memberList: MemberList) => ({type: GOT_MEMBERS, memberList});

export type MemberList = {
    disconnected: string[];
    observers: string[];
    voters: string[];
}

const reducer = (state: MemberList = {disconnected: [], observers: [], voters: []}, action: any) => {
    switch (action.type) {
        case GOT_MEMBERS:
            return action.memberList;
        default:
            return state;
    }
};

export default reducer;
