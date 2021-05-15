import {Button, View} from "react-native";
import {RootState, setObserving} from "../store";
import {connect} from "react-redux";
import React from "react";

type Props = {
    observing: boolean;
};

const Observer = ( { observing }: Props ) => {
    return (
        <View>
            <Button title={"Switch to " + ( observing ? "voter":"observing" ) } onPress={ () => setObserving(!observing) }/>
        </View>
    );
}

export default connect( ( state:RootState ) => ( { observing: state.user.observer } ) )(Observer);
