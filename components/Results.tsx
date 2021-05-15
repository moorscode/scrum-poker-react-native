import React from "react";
import {Button, StyleSheet, Text, View} from "react-native";
import {connect} from "react-redux";
import {RootState, Vote} from "../store";

type Props = {
    votes: Vote[];
}

const Results = ({votes}: Props) => {
    const getVoteDisplay = (vote: Vote, index: number) => {
        return <View style={styles.voter}>
            <Button
                key={"vote-value-" + index}
                title={"" + vote.currentValue}
                onPress={() => {
                }}
            />
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
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: "flex-start",
        alignContent: "center",
        flexWrap: 'wrap',
        width: 280,
        margin: 16,
    },
    buttonView: {
        margin: 2,
    },
    voter: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        margin: 2,
    }
})

export default connect((state: RootState) => {
    return {votes: state.votes.votes};
})(Results);
