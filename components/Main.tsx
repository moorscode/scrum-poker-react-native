import {StyleSheet, Text, View} from "react-native";
import Choices from "./Choices";
import React from "react";
import Results from "./Results";
import {connect} from "react-redux";
import {RootState, vote} from "../store";
import Observer from "./Observer";
import Username from "./Username";
import Room from "./Room";
import Story from "./Story";
import {Finish} from "./Finish";
import defaultStyles, {colors} from "../utils/defaultStyles";
import {ActivityIndicator} from "react-native-paper";
import Members from "./Members";

const Separator = () => (
    <View style={styles.separator}/>
);

type Props = {
    ready: boolean;
    room: string;
}

const Main = (props: Props) => {
    if (!props.ready) {
        return (
            <>
                <Text style={ { marginTop: 16, marginBottom: 32, fontSize: 16 } }>Connecting to the server...</Text>
                <ActivityIndicator animating={true} size="large" color={ colors.pink }/>
            </>
        );
    }

    let inRoomChildren;
    if (props.room !== "") {
        inRoomChildren =
            <>
                <View style={styles.sideBySideFullWidth}>
                    <Username/>
                    <Observer/>
                </View>
                <Story/>
                <Separator/>
                <Choices onChoice={vote}/>
                <Separator/>
                <Results/>
                <Members/>
            </>;
    }

    return (
        <>
            <View style={styles.sideBySideFullWidth}>
                <Text style={styles.h1}>Pum Scroker</Text>
            </View>
            <View style={styles.sideBySideFullWidth}>
                <Room/>
                {props.room !== "" && <Finish/>}
            </View>
            {inRoomChildren}
        </>
    );
}

// @ts-ignore
const styles = StyleSheet.create(defaultStyles);

export default connect((state: RootState) => {
    return {
        ready: state.app.ready,
        room: state.room,
    }
})(Main);
