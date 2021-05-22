import React from "react";
import {Button, StyleSheet, Text, View} from "react-native";
import {connect} from "react-redux";
import {RootState, VoteValue} from "../store";
import defaultStyles, { colors } from "../utils/defaultStyles";
import {Chip} from "react-native-paper";

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
                                <Chip
                                    mode="outlined"
                                    onPress={() => onChoice(choice)}
                                    selected={myCurrentVote === choice}
                                    selectedColor={myCurrentVote === choice ? "#fff": "#000"}
                                    style={myCurrentVote === choice ? styles.currentVote : ( myInitialVote === choice ? styles.initialVote : {} )  }
                                    textStyle={ myCurrentVote === choice ? { color: "#fff" } : ( myInitialVote === choice ? { color: "#000" } : {} ) }
                                >
                                    {"" + choice}
                                </Chip>
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
        backgroundColor: "#ffffff",
        flexWrap: "wrap",
        padding: 2,
        borderRadius: 3,
        width: 300,
        marginTop: 4,
    },
    initialVote: {
        backgroundColor: colors.lightGray,
    },
    currentVote: {
        backgroundColor: colors.pink,
    },
})

export default connect((state: RootState) => {
    return {choices: state.points, myInitialVote: state.votes.myInitialVote, myCurrentVote: state.votes.myCurrentVote}
})(Choices);
