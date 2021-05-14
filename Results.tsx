import React, {Component} from "react";
import {Button, View, StyleSheet, Text} from "react-native";

class Results extends Component {
    getVoteDisplay( vote, index ) {
        return <View style={styles.voter}>
            <Button
            key={"vote-value-" + index}
            title={ "" + vote.currentValue }
            onPress={ () => {} }
            />
            <Text style={styles.buttonView}>{vote.voterName}</Text>
            {vote.currentValue !== vote.initialValue &&
                <Text>({"" + vote.initialValue})</Text>
            }
            </View>;
    }

    render() {
        console.log(this.props);
        if ( ! this.props.votes ) {
            return;
        }

        return (
            <View style={styles.fixToText}>
                {
                    this.props.votes.map(
                        (vote, index) => {
                            return <View
                                key={"result" + index}
                                style={styles.buttonView}>
                                { this.getVoteDisplay( vote, index ) }
                            </View>;
                        }
                    )
                }
            </View>
        );
    }
}

const styles = StyleSheet.create( {
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

export default Results;