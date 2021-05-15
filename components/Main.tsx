import {StyleSheet, Text, View} from "react-native";
import Choices from "./Choices";
import React from "react";
import Results from "./Results";
import {connect} from "react-redux";
import {RootState, User, vote} from "../store";
import Observer from "./Observer";
import Username from "./Username";
import Room from "./Room";
import Story from "./Story";
import {Finish} from "./Finish";
import VoteStatus from "./VoteStatus";

const Separator = () => (
    <View style={styles.separator}/>
);

type Props = {
    ready: boolean;
    room: string;
    story: string;
    user: User;
}

const Main = (props: Props) => {
    if (!props.ready) {
        return (
            <View><Text>Connecting to the server...</Text></View>
        );
    }

    let inRoomChildren;
    if (props.room !== "") {
        inRoomChildren =
            <>
                <View style={styles.sideBySide}>
                    <Username/>
                    <Observer/>
                </View>
                <Story/>
                <Separator/>
                <Choices onChoice={vote}/>
                <Separator/>
                <Results/>
            </>;
    }

    return (
        <>
            <View style={styles.sideBySide}>
                <Room/>
                {props.room !== "" && <Finish/>}
            </View>
            {inRoomChildren}
        </>
    );
}

const styles = StyleSheet.create({
    separator: {
        marginVertical: 8,
        borderBottomColor: '#333',
        borderBottomWidth: StyleSheet.hairlineWidth,
        minHeight: 2,
    },
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    sideBySide: {
        flexDirection: "row",
        alignContent: "space-between",
        alignItems: "center",
        justifyContent: "space-between",
        width: 340,
    },
});

export default connect((state: RootState) => {
    return {ready: state.app.ready, user: state.user, room: state.room, story: state.story}
})(Main);
