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

export const colors = {
    pink: "#a4286a",
    green: "#82a159",
    red: "#c94545",
    lightGray: "#eeeeee",
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
        color: colors.pink,
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
        height: 28,
        color: colors.pink,
        paddingVertical: 0,
        borderBottomWidth: 1,
        borderBottomColor: colors.pink,
    },
    label: {
        fontSize: 16,
        minWidth: 50,
    },
};

export default defaultStyles;
