import React from "react";
import {Button, StyleSheet, View} from "react-native";
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
        <View style={styles.fixToText}>
            {
                choices.map(
                    (choice: number | string) => {
                        const color = (myCurrentVote === choice) ? "#F00" : ((myInitialVote === choice) ? "#0F0" : "#00F");
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
    );
}

const styles = StyleSheet.create({
    fixToText: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        flexWrap: 'wrap',
        width: 280,
        margin: 16,
    },
    buttonView: {
        margin: 2,
    }
})

export default connect((state: RootState) => {
    return {choices: state.points, myInitialVote: state.votes.myInitialVote, myCurrentVote: state.votes.myCurrentVote}
})(Choices);
