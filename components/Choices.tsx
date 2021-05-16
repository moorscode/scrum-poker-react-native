import React from "react";
import {Button, StyleSheet, Text, View} from "react-native";
import {connect} from "react-redux";
import {RootState, VoteValue} from "../store";
import defaultStyles from "../utils/defaultStyles";

type Props = {
    choices: VoteValue[];
    myCurrentVote: VoteValue;
    myInitialVote: VoteValue;
    onChoice: Function;
}

const Choices = ({choices, myCurrentVote, myInitialVote, onChoice}: Props) => {
    return (
        <>
            <Text style={styles.h2}>Choices</Text>
            <View style={styles.voteList}>
                {
                    choices.map(
                        (choice: VoteValue) => {
                            const color = (myCurrentVote === choice) ? "#a4286a" : ((myInitialVote === choice) ? "" : "#82a159");
                            return <View
                                key={"choice " + choice}
                                style={styles.smallMargin}>
                                <Button
                                    color={color}
                                    title={"" + choice}
                                    onPress={() => onChoice(choice)}
                                />
                            </View>;
                        }
                    )
                }
            </View>
        </>
    );
}

// @ts-ignore
const styles = StyleSheet.create({
    ...defaultStyles,
    voteList: {
        flexDirection: "row",
        justifyContent: "space-evenly",
        backgroundColor: "#fff",
        padding: 2,
        borderRadius: 3,
        width: 400,
        marginTop: 4,
    },
})

export default connect((state: RootState) => {
    return {choices: state.points, myInitialVote: state.votes.myInitialVote, myCurrentVote: state.votes.myCurrentVote}
})(Choices);
