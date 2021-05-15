import {StyleSheet, Text, TextInput, View} from "react-native";
import React, {useEffect, useState} from "react";
import {connect} from "react-redux";
import {changeName, RootState} from "../store";
import useDebounce from "../utils/useDebounce";

type Props = {
    name: string;
}

const Username = ({name}: Props) => {
    const [nameInput, setNameInput] = useState(name);

    const debouncedName = useDebounce(nameInput, 750);

    useEffect(() => {
        changeName(debouncedName);
    }, [debouncedName]);

    useEffect(() => {
        setNameInput(name);
    }, [name]);

    return (
        <View style={styles.container}>
            <Text style={styles.text}>Name: </Text>
            <TextInput style={styles.input} onChangeText={setNameInput} value={nameInput}/>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        alignItems: "center",
        alignContent: "center",
        flexWrap: 'wrap',
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
        minWidth: 50,
        fontSize: 16,
    },
});

export default connect((state: RootState) => ({name: state.user.name}))(Username);