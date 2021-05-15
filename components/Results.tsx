import React from "react";
import {Button, StyleSheet, Text, TouchableWithoutFeedback, View} from "react-native";
import {connect} from "react-redux";
import {RootState, Vote} from "../store";

type Props = {
    votes: Vote[];
}

const Results = ({votes}: Props) => {
    const getVoteDisplay = (vote: Vote, index: number) => {
        return <View style={styles.voter}>
            <Text style={styles.vote}>{vote.currentValue}</Text>
            <Text style={styles.buttonView}>{vote.voterName}</Text>
            {vote.currentValue !== vote.initialValue &&
                <Text>({"" + vote.initialValue})</Text>
            }
        </View>;
    }

    return (
        <View style={styles.fixToText}>
            {
                votes.map(
                    (vote, index) => {
                        return <View
                            key={"result" + index}
                            style={styles.buttonView}>
                            {getVoteDisplay(vote, index)}
                        </View>;
                    }
                )
            }
        </View>
    );
}

const styles = StyleSheet.create({
    fixToText: {
        flexDirection: "column",
        justifyContent: "flex-start",
        alignContent: "center",
        flexWrap: "wrap",
        width: 340,
        margin: 8,
        marginHorizontal: 4,
    },
    vote: {
        padding: 5,
        backgroundColor: "#eee",
        textAlign: "center",
        minWidth: 60,
        borderRadius: 2,
        textTransform: "uppercase",

    },
    buttonView: {
        margin: 2,
    },
    voter: {
        flexDirection: "row",
        justifyContent: "flex-start",
        alignItems: "center",
        margin: 2,
    }
})

export default connect((state: RootState) => {
    return {votes: state.votes.votes};
})(Results);
