import React, {useEffect, useState} from "react";
import {StyleSheet, Text, View} from "react-native";
import {connect} from "react-redux";
import {RootState, toggleRevealVotes, Vote, VoteValue} from "../store";
import defaultStyles, {colors} from "../utils/defaultStyles";
import {Chip, ProgressBar, Switch} from "react-native-paper";

type Props = {
    votes: Vote[];
    voteCount: number;
    voteAverage: VoteValue;
    votesRevealed: boolean;
    nearestPointAverage: VoteValue;
    voters: string[];
    myVote: VoteValue,
    points: VoteValue[];
}

const Results = (
    {
        votes,
        voteAverage,
        votesRevealed,
        nearestPointAverage,
        voters,
        voteCount,
        myVote,
        points
    }: Props) => {
    const [average, setAverage] = useState("");
    const [averageContext, setAverageContext] = useState("");
    const [standardDeviation, setStandardDeviation] = useState("");

    useEffect(() => {
        if (!votesRevealed && (voteCount === 0 || voteCount < voters.length)) {
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
    }, [voteAverage, voteCount, voters.length, votesRevealed]);

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

        const numberVotes: number[] = flattenedVotes
            .filter((vote: VoteValue) => typeof vote === "number")
            .map((vote: VoteValue): number => parseFloat("" + vote));

        let powers = 0;
        for (let i = 0; i < numberVotes.length; i++) {
            powers += Math.pow(numberVotes[i] - parseFloat(average), 2);
        }

        setStandardDeviation("" + Math.round(Math.sqrt(powers / numberVotes.length) * 100) / 100);
    }, [average, votes]);

    const getVoteDisplay = (vote: Vote) => {
        let initial, current, icon;
        if (vote.currentValue !== vote.initialValue) {
            initial = <>
                <Text>&larr;</Text>
                <Chip mode="outlined">{"" + vote.initialValue}</Chip>
            </>;
        }

        current = <></>;

        switch (vote.currentValue) {
            case '#':
                icon = "account-search";
                break;
            case '!':
                icon = "account-alert";
                break;
            default:
                current = <Chip>{"" + vote.currentValue}</Chip>
                icon = "account";
                break;
        }

        return (
            <View style={styles.voter}>
                <Chip
                    icon={icon}
                    mode="outlined"
                    selected={voters.length === voteCount}
                    selectedColor={voters.length === voteCount ? "#ffffff" : "#000"}
                    style={voters.length === voteCount ? styles.spacingRight : null}
                    textStyle={voters.length === voteCount ? {color: "white"} : ""}
                >
                    {vote.voterName}
                </Chip>
                {current}
                {initial}
            </View>
        );
    }

    let contextView;
    if (averageContext !== "") {
        contextView = <View style={styles.spaceBelow}>
            <Text style={styles.alignCenterBold}>Average story point: {averageContext}</Text>
        </View>;
    }

    let stats;
    if (average !== "" && (votesRevealed || voteCount === voters.length)) {
        stats = <View style={styles.statsContainer}>
            <Text style={styles.stats}>Average: {average}</Text>
            <Text style={styles.stats}>Standard deviation: {standardDeviation}</Text>
            <Text style={styles.alignRightBold}>Average story point: {average ? nearestPointAverage : average}</Text>
        </View>;
    }

    return (
        <>
            {contextView}
            <ProgressBar progress={(1 / voters.length) * voteCount} color="#a4286a"/>
            <View style={styles.revealVotes}>
                <Text>Votes revealed</Text>
                <Switch
                    value={votesRevealed}
                    onValueChange={toggleRevealVotes}
                    disabled={voteCount === 0 || myVote === "" || voteCount === voters.length}
                    color={colors.pink}
                />
            </View>
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
        justifyContent: "space-between",
        alignContent: "center",
        flexWrap: "wrap",
    },
    spacingRight: {
        marginRight: 4,
        backgroundColor: colors.pink,
    },
    statsContainer: {
        paddingRight: 4,
    },
    vote: {
        padding: 5,
        backgroundColor: colors.lightGray,
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
    revealVotes: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        width: 340,
        marginBottom: 16,
        paddingVertical: 8,
        paddingLeft: 4,
        borderBottomColor: colors.lightGray,
        borderBottomWidth: 1,
        borderTopColor: colors.lightGray,
        borderTopWidth: 1,
    },
})

export default connect((state: RootState) => {
    return {
        votes: state.votes.votes,
        voteCount: state.votes.voteCount,
        voteAverage: state.votes.voteAverage,
        votesRevealed: state.votes.votesRevealed,
        nearestPointAverage: state.votes.nearestPointAverage,
        myVote: state.votes.myCurrentVote,
        voters: state.members.voters,
        points: state.points,
    };
})(Results);
