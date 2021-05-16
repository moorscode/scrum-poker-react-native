import {Button, StyleSheet, Text, TextInput, View} from "react-native";
import React, {useEffect, useState} from "react";
import {connect} from "react-redux";
import {changeStoryName, newStory, RootState} from "../store";
import useDebounce from "../utils/useDebounce";
import defaultStyles from "../utils/defaultStyles";

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
        <View style={styles.sideBySideFullWidth}>
            <View style={styles.storyContainer}>
                <Text style={styles.label}>Story: </Text>
                <TextInput style={styles.input} onChangeText={setNameInput} value={nameInput}/>
            </View>
            <Button onPress={newStory} title="New story"/>
        </View>
    );
}

const styles = StyleSheet.create({
    ...defaultStyles,
    storyContainer: {
        flexDirection: "row",
        alignItems: "center",
        alignContent: "center",
        flexWrap: 'wrap',
        margin: 4,
    },
});

export default connect((state: RootState) => ({name: state.story}))(Story);