import {ImageStyle, StyleSheet, TextStyle, ViewStyle} from "react-native";

type StyleEntry = ViewStyle|TextStyle|ImageStyle[];

type StyleDefinition = {
    [key:string]: StyleEntry;
}

const sideBySide:StyleEntry = {
    flexDirection: "row",
    justifyContent: "space-between",
    alignContent: "space-between",
    alignItems: "center",
}

const defaultStyles:StyleDefinition = {
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    separator: {
        marginVertical: 8,
        borderBottomColor: '#333',
        borderBottomWidth: StyleSheet.hairlineWidth,
        minHeight: 2,
    },
    sideBySide: sideBySide,
    sideBySideFullWidth: {
        ...sideBySide,
        width: 340,
    },
    h1: {
        fontSize: 32,
        fontWeight: "bold",
        marginBottom: 8,
        marginHorizontal: 4,
        color: "#a4286a",
        alignSelf: "flex-start",
    },
    h2: {
        fontSize: 20,
        fontWeight: "bold",
    },
    smallMargin: {
        margin: 2,
    },
    bold: {
        fontWeight: "bold",
    },
    spaceBelow: {
        marginBottom: 8,
    },
    input: {
        marginHorizontal: 2,
        fontSize: 16,
        width: 120,
        color: "#a4286a",
        paddingLeft: 2,
        borderBottomWidth: 1,
        borderBottomColor: "#a4286a",
    },
    label: {
        fontSize: 16,
        minWidth: 50,
    },
};

export default defaultStyles;
