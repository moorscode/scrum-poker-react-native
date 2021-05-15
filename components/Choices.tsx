import React from "react";
import {Button, StyleSheet, Text, View} from "react-native";
import {connect} from "react-redux";
import {RootState, VoteValue} from "../store";

type Props = {
    choices: VoteValue[];
    myCurrentVote: VoteValue;
    myInitialVote: VoteValue;
    onChoice: Function;
}

const Choices = ({choices, myCurrentVote, myInitialVote, onChoice}: Props) => {
    return (
        <>
            <Text style={styles.heading}>Choices</Text>
            <View style={styles.voteList}>
                {
                    choices.map(
                        (choice: VoteValue) => {
                            const color = (myCurrentVote === choice) ? "#a4286a" : ((myInitialVote === choice) ? "" : "#82a159");
                            return <View
                                key={"choice " + choice}
                                style={styles.buttonView}>
                                <Button
                                    color={color}
                                    title={"" + choice}
                                    onPress={(event) => onChoice(choice)}
                                />
                            </View>;
                        }
                    )
                }
            </View>
        </>
    );
}

const styles = StyleSheet.create({
    heading: {
        fontSize: 20,
        fontWeight: "bold",
    },
    voteList: {
        flexDirection: "row",
        justifyContent: "space-evenly",
        backgroundColor: "#fff",
        padding: 2,
        borderRadius: 3,
        width: 400,
        marginTop: 4,
    },
    buttonView: {
        margin: 2,
    }
})

export default connect((state: RootState) => {
    return {choices: state.points, myInitialVote: state.votes.myInitialVote, myCurrentVote: state.votes.myCurrentVote}
})(Choices);
