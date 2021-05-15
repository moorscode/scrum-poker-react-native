import React from "react";
import {StyleSheet, Text, View} from "react-native";
import {connect} from "react-redux";
import {RootState, Vote, VoteValue} from "../store";

type Props = {
    votes: Vote[];
    voteCount: number;
    voteAverage: VoteValue;
    nearestPointAverage: VoteValue;
    voters: string[];
    points: VoteValue[];
}

const Results = ({votes, voteAverage, nearestPointAverage, voters, voteCount, points}: Props) => {
    const getVoteDisplay = (vote: Vote) => {
        let initial;
        if (vote.currentValue !== vote.initialValue) {
            initial = <Text>({"" + vote.initialValue})</Text>;
        }

        return <View style={styles.voter}>
            <Text style={styles.vote}>{vote.currentValue}</Text>
            <Text style={styles.buttonView}>{vote.voterName}</Text>
            {initial}
        </View>;
    }

    const getAverage = () => {
        if (voteCount === 0 || voteCount < voters.length) {
            return "";
        }

        if (voteAverage === "coffee") {
            return "Coffee break";
        }

        if (voteAverage === "?") {
            return "Not enough clarity, please go further in depth.";
        }

        // @ts-ignore
        return Math.round(voteAverage * 100) / 100;
    }

    const average = getAverage();

    const averageContext = () => {
        if (average === "") {
            return "";
        }

        // Find the difference between the lowest and the highest votes.
        const lowestIndex = points.indexOf(votes[0].currentValue);
        const highestIndex = points.indexOf(votes[votes.length - 1].currentValue);

        const highestNumericPoint = points.filter((point: VoteValue) => typeof point === "number").length;
        if (highestIndex >= highestNumericPoint) {
            return "";
        }

        if (highestIndex - lowestIndex > 2) {
            return `Large gap between lowest and highest vote: ${highestIndex - lowestIndex} cards!`;
        }
    }

    const standardDeviation = () => {
        if (average === "") {
            return "";
        }

        if (votes.length <= 1) {
            return "n/a";
        }

        const flattendVotes = votes.map((vote: Vote) => vote.currentValue);

        if (flattendVotes.indexOf("coffee") !== -1) {
            return "n/a";
        }

        if (flattendVotes.indexOf("?") !== -1) {
            return "n/a";
        }

        let powers = 0;
        for (let i = 0; i < votes.length; i++) {
            powers += Math.pow(parseFloat(votes.map((vote: Vote) => vote.currentValue)[i]) - average, 2);
        }

        return Math.round(Math.sqrt(powers / votes.length) * 100) / 100;
    }

    let context = averageContext();

    let contextView;
    if (context !== "") {
        contextView = <View style={styles.spaceBelow}>
            {context && <Text style={styles.bold}>Average story point: {context}</Text>}
        </View>;
    }

    let stats;
    if (average !== "") {
        stats = <View style={styles.statsContainer}>
            <Text style={styles.stats}>Average: {average}</Text>
            <Text style={styles.stats}>Standard deviation: {standardDeviation()}</Text>
            <Text style={styles.statsBold}>Average story point: {average ? nearestPointAverage : average}</Text>
        </View>;
    }

    return (
        <>
            {contextView}
            <View style={styles.container}>
                <View style={styles.voteList}>
                    {
                        votes.map(
                            (vote: Vote, index: number) => {
                                return <View
                                    key={"result" + index}
                                    style={styles.buttonView}>
                                    {getVoteDisplay(vote)}
                                </View>;
                            }
                        )
                    }
                </View>
                {stats}
            </View>
        </>
    );
}

const styles = StyleSheet.create({
    voteList: {
        flexDirection: "column",
        justifyContent: "flex-start",
        alignContent: "center",
        flexWrap: "wrap",
    },
    spaceBelow: {
        marginBottom: 8,
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
    },
    statsContainer: {},
    stats: {
        textAlign: "right",
        flexWrap: "wrap",
    },
    statsBold: {
        textAlign: "right",
        fontWeight: "bold",
    },
    bold: {
        fontWeight: "bold",
        textAlign: "center",
    },
    container: {
        width: 340,
        marginHorizontal: 4,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
    },
})

export default connect((state: RootState) => {
    return {
        votes: state.votes.votes,
        voteCount: state.votes.voteCount,
        voteAverage: state.votes.voteAverage,
        nearestPointAverage: state.votes.nearestPointAverage,
        voters: state.members.voters,
        points: state.points,
    };
})(Results);
