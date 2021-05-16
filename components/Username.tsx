import {StyleSheet, Text, TextInput, View} from "react-native";
import React, {useEffect, useState} from "react";
import {connect} from "react-redux";
import {changeName, RootState} from "../store";
import useDebounce from "../utils/useDebounce";
import defaultStyles from "../utils/defaultStyles";

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
        <View style={styles.userContainer}>
            <Text style={styles.label}>Name: </Text>
            <TextInput style={styles.input} onChangeText={setNameInput} value={nameInput}/>
        </View>
    );
}

const styles = StyleSheet.create({
    ...defaultStyles,
    userContainer: {
        flexDirection: "row",
        alignItems: "center",
        alignContent: "center",
        flexWrap: 'wrap',
        margin: 4,
    },
});

export default connect((state: RootState) => ({name: state.user.name}))(Username);