import {Vote, VoteValue} from "../store";
import {colors} from "./defaultStyles";

export default (voteCount: number, voterCount: number, voteAverage: VoteValue, votes: Vote[], points: VoteValue[]): string => {
    if (voteCount === 0 || voteCount < voterCount || typeof voteAverage === "string") {
        return colors.lightGray;
    }

    // Find the difference between the lowest and the highest votes.
    const lowestIndex = points.indexOf(votes[0].currentValue);
    const highestIndex = points.indexOf(votes[votes.length - 1].currentValue);

    const pointsSpread = highestIndex - lowestIndex;

    switch (true) {
        case pointsSpread === 0:
            return colors.green;
        case pointsSpread >= 2:
            return colors.red;
        default:
            return colors.lightGray;
    }
}
