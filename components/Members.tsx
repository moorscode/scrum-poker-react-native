import React from "react";
import {MemberList, RootState} from "../store";
import {connect} from "react-redux";
import {List} from "react-native-paper";
import {StyleSheet, View} from "react-native";
import defaultStyles, {colors} from "../utils/defaultStyles";

type Props = {
    members: MemberList;
}

const Members = ({members}: Props) => {
    return (
        <View style={styles.sideBySideFullWidth}>
            <List.Accordion title="Participants" style={styles.list} titleStyle={styles.title}>
                <List.Subheader style={styles.subheader}>Voters</List.Subheader>
                {members.voters.map(
                    (voter: string, index: number) =>
                        <List.Item
                            style={styles.listItem}
                            key={"voter-" + index}
                            title={voter}
                            left={() => <List.Icon style={ { marginRight: 0, marginVertical: 0, marginLeft: 0 } } icon="account"/>}
                        />
                )}
                <List.Subheader style={styles.subheader}>Observers</List.Subheader>
                {members.observers.map(
                    (observer: string, index: number) =>
                        <List.Item
                            style={styles.listItem}
                            key={"observer-" + index}
                            title={observer}
                            left={() => <List.Icon style={ { marginRight: 0, marginVertical: 0, marginLeft: 0 } } icon="account"/>}
                        />
                )}
                <List.Subheader style={styles.subheader}>Disconnected</List.Subheader>
                {members.disconnected.map(
                    (disconnected: string, index: number) =>
                        <List.Item
                            style={styles.listItem}
                            key={"disconnected-" + index}
                            title={disconnected}
                            left={() => <List.Icon style={ { marginRight: 0, marginVertical: 0, marginLeft: 0 } } icon="account"/>}
                        />
                )}
            </List.Accordion>
        </View>
    )
};

const styles = StyleSheet.create({
    ...defaultStyles,
    list: {
        width: 340,
    },
    listItem: {
        margin: 0,
        paddingVertical: 0,
    },
    title: {
        color: colors.pink,
    },
    subheader: {
        color: colors.green,
        borderBottomWidth: 1,
        paddingBottom: 6,
        paddingHorizontal: 0,
        borderBottomColor: colors.lightGray,
        marginHorizontal: 16,
    },
});

export default connect((state: RootState) => {
    return {
        members: state.members
    };
})(Members);
