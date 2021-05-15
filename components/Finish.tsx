import React from "react";
import {Button} from "react-native";
import {finishRefinement} from "../store";

export const Finish = () => {
    return (
        <Button onPress={finishRefinement} title={"Finish refinement"} />
    )
}
