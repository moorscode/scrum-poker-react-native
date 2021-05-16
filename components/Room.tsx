import {StyleSheet, Text, TextInput, View} from "react-native";
import React, {useEffect, useState} from "react";
import {connect} from "react-redux";
import {changeRoom, RootState} from "../store";
import useDebounce from "../utils/useDebounce";
import defaultStyles from "../utils/defaultStyles";

type Props = {
    name: string;
}

const Room = ({name}: Props) => {
    const [nameInput, setNameInput] = useState(name);

    const debouncedName = useDebounce(nameInput, 750);

    useEffect(() => {
        changeRoom(debouncedName);
    }, [debouncedName]);

    useEffect(() => {
        setNameInput(name);
    }, [name]);

    return (
        <View style={styles.roomContainer}>
            <Text style={styles.label}>Room: </Text>
            <TextInput style={styles.input} onChangeText={setNameInput} value={nameInput} placeholder={name}/>
        </View>
    );
}

const styles = StyleSheet.create({
    ...defaultStyles,
    roomContainer: {
        flexDirection: "row",
        alignItems: "center",
        alignContent: "flex-start",
        margin: 4,
    },
});

export default connect((state: RootState) => ({name: state.room}))(Room);