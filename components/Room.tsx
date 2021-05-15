import {StyleSheet, Text, TextInput, View} from "react-native";
import React, {useEffect, useState} from "react";
import {connect} from "react-redux";
import {changeRoom, RootState} from "../store";
import useDebounce from "../utils/useDebounce";

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
        <View style={styles.container}>
            <Text style={styles.text}>Room: </Text>
            <TextInput style={styles.input} onChangeText={setNameInput} value={nameInput} placeholder={name}/>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        alignItems: "center",
        alignContent: "flex-start",
        margin: 4,
    },
    input: {
        paddingHorizontal: 5,
        marginHorizontal: 2,
        fontSize: 16,
        width: 120,
        borderWidth: 1,
    },
    text: {
        fontSize: 16,
        minWidth: 50,
    },
});

export default connect((state: RootState) => ({name: state.room}))(Room);