import {Button, StyleSheet, Text, TextInput, View} from "react-native";
import React, {useEffect, useState} from "react";
import {connect} from "react-redux";
import {changeStoryName, newStory, RootState} from "../store";
import useDebounce from "../utils/useDebounce";

type Props = {
    name: string;
}

const Story = ({name}: Props) => {
    const [nameInput, setNameInput] = useState(name);

    const debouncedName = useDebounce(nameInput, 750);

    useEffect(() => {
        changeStoryName(debouncedName);
    }, [debouncedName]);

    useEffect(() => {
        setNameInput(name);
    }, [name]);

    return (
        <View style={styles.sideBySide}>
            <View style={styles.container}>
                <Text style={styles.text}>Story: </Text>
                <TextInput style={styles.input} onChangeText={setNameInput} value={nameInput}/>
                <Button onPress={newStory} title="New story"/>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        alignItems: "center",
        alignContent: "center",
        flexWrap: 'wrap',
        marginHorizontal: 4,
    },
    input: {
        padding: 4,
        margin: 6,
        fontSize: 16,
        width: 120,
        borderWidth: 1,
        marginRight: 10,
    },
    text: {
        fontSize: 16,
        minWidth: 50,
    },
    sideBySide: {
        flexDirection: "row",
        alignContent: "space-between",
        justifyContent: "flex-start",
        width: 400,
        alignItems: "center",
    }
});

export default connect((state: RootState) => ({name: state.story}))(Story);