import {SafeAreaView, StyleSheet, Text, TextInput, View} from "react-native";
import Choices from "./Choices";
import React from "react";
import Results from "./Results";
import {connect} from "react-redux";
import {vote} from "./store";

const Separator = () => (
    <View style={styles.separator}/>
);

function Main(props) {
    if ( ! props.ready ) {
        return (
            <View><Text>Loading...</Text></View>
        );
    }

    let inRoomChildren;
    if (props.room) {
        inRoomChildren =
            <>
                <Separator/>
                <Choices
                    choices={props.points}
                    myVote={props.votes.myCurrentVote}
                    myInitialVote={props.votes.myInitialVote}
                    onChoice={vote}
                />
                <Separator/>
                <Results votes={props.votes.votes}/>
            </>;
    }

    return (
        <SafeAreaView style={styles.container}>
            <View>
                <Text style={styles.text}>Name: {props.user.name}</Text>
            </View>
            <View>
                <Text style={styles.text}>Observer: {props.user.observer}</Text>
            </View>
            <View style={styles.room}>
                <Text style={styles.text}>Room: {props.room}</Text>
                {/*<TextInput onChangeText={props.onRoomChange} style={styles.input} value={props.room.toLowerCase()}/>*/}
            </View>
            <View>
                <Text style={styles.text}>Story: {props.story}</Text>
            </View>
            {inRoomChildren}
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    input: {
        padding: 4,
        margin: 6,
        fontSize: 16,
        width: 120,
        borderWidth: 1,
    },
    text: {
        fontSize: 16,
    },
    room: {
        flexDirection: 'row',
        justifyContent: "center",
        alignItems: "center",
    },
    separator: {
        marginVertical: 8,
        borderBottomColor: '#737373',
        borderBottomWidth: StyleSheet.hairlineWidth,
    },
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});

export default connect((state) => state)(Main);
