import React, {useEffect, useState} from "react";
import {StyleSheet, Text, View} from "react-native";
import {connect} from "react-redux";
import {RootState, Vote, VoteValue} from "../store";
import defaultStyles from "../utils/defaultStyles";

type Props = {
    votes: Vote[];
    voteCount: number;
    voteAverage: VoteValue;
    nearestPointAverage: VoteValue;
    voters: string[];
    points: VoteValue[];
}

const Results = ({votes, voteAverage, nearestPointAverage, voters, voteCount, points}: Props) => {
    const [average, setAverage] = useState("");
    const [averageContext, setAverageContext] = useState("");
    const [standardDeviation, setStandardDeviation] = useState("");

    useEffect(() => {
        if (voteCount === 0 || voteCount < voters.length) {
            setAverage("");
            return;
        }

        if (voteAverage === "coffee") {
            setAverage("Coffee break");
            return;
        }

        if (voteAverage === "?") {
            setAverage("Not enough clarity, please go further in depth.");
        }

        if (typeof voteAverage === "number") {
            setAverage("" + Math.round(voteAverage * 100) / 100);
        }
    }, [voteAverage, voteCount]);

    useEffect(() => {
        if (average === "") {
            setAverageContext("");
            return;
        }

        // Find the difference between the lowest and the highest votes.
        const lowestIndex = points.indexOf(votes[0].currentValue);
        const highestIndex = points.indexOf(votes[votes.length - 1].currentValue);

        const highestNumericPoint = points.filter((point: VoteValue) => typeof point === "number").length;
        if (highestIndex >= highestNumericPoint) {
            setAverageContext("");
            return;
        }

        if (highestIndex - lowestIndex > 2) {
            setAverageContext(`Large gap between lowest and highest vote: ${highestIndex - lowestIndex} cards!`);
        }
    }, [average, votes]);

    useEffect(() => {
        if (average === "") {
            setStandardDeviation("");
            return;
        }

        if (votes.length < 1) {
            setStandardDeviation("n/a");
            return;
        }

        const flattenedVotes = votes.map((vote: Vote) => vote.currentValue);

        if (flattenedVotes.indexOf("coffee") !== -1) {
            setStandardDeviation("n/a");
            return;
        }

        if (flattenedVotes.indexOf("?") !== -1) {
            setStandardDeviation("n/a");
            return;
        }

        let powers = 0;
        for (let i = 0; i < votes.length; i++) {
            powers += Math.pow(parseFloat(votes.map((vote: Vote) => "" + vote.currentValue)[i]) - parseInt(average, 10), 2);
        }

        setStandardDeviation("" + Math.round(Math.sqrt(powers / votes.length) * 100) / 100);
    }, [average, votes]);

    const getVoteDisplay = (vote: Vote) => {
        let initial;
        if (vote.currentValue !== vote.initialValue) {
            initial = <Text>({"" + vote.initialValue})</Text>;
        }

        return <View style={styles.voter}>
            <Text style={styles.vote}>{vote.currentValue}</Text>
            <Text style={styles.smallMargin}>{vote.voterName}</Text>
            {initial}
        </View>;
    }

    let contextView;
    if (averageContext !== "") {
        contextView = <View style={styles.spaceBelow}>
            <Text style={styles.alignCenterBold}>Average story point: {averageContext}</Text>
        </View>;
    }

    let stats;
    if (average !== "") {
        stats = <View>
            <Text style={styles.stats}>Average: {average}</Text>
            <Text style={styles.stats}>Standard deviation: {standardDeviation}</Text>
            <Text style={styles.alignRightBold}>Average story point: {average ? nearestPointAverage : average}</Text>
        </View>;
    }

    return (
        <>
            {contextView}
            <View style={styles.voteContainer}>
                <View style={styles.voteList}>
                    {
                        votes.map(
                            (vote: Vote, index: number) => {
                                return <View
                                    key={"result" + index}
                                    style={styles.smallMargin}>
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
    ...defaultStyles,
    voteList: {
        flexDirection: "column",
        justifyContent: "flex-start",
        alignContent: "center",
        flexWrap: "wrap",
    },
    vote: {
        padding: 5,
        backgroundColor: "#eee",
        textAlign: "center",
        minWidth: 60,
        borderRadius: 2,
        textTransform: "uppercase",
        marginRight: 4,

    },
    voter: {
        flexDirection: "row",
        justifyContent: "flex-start",
        alignItems: "center",
        margin: 2,
    },
    stats: {
        textAlign: "right",
        flexWrap: "wrap",
    },
    alignRightBold: {
        ...defaultStyles.bold,
        textAlign: "right",
    },
    alignCenterBold: {
        ...defaultStyles.bold,
        textAlign: "center",
    },
    voteContainer: {
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
