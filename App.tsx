import React, {useEffect, useState} from "react";
import Main from "./components/Main";
import {Provider} from 'react-redux';
import store, {RootState} from './store';
import socket from './utils/socket';
import {SafeAreaView, ScrollView, StyleSheet, View, ViewStyle} from "react-native";
import FlashMessage from "react-native-flash-message";
import {colors} from "./utils/defaultStyles";

function App() {
    const [background, setBackground] = useState(colors.lightGray);

    useEffect(() => {
        return function exit() {
            const state = store.getState();
            if (!socket.connected) {
                return;
            }

            if (state.room) {
                socket.emit("leave", {poker: state.room});
            }

            socket.disconnect();
        }
    }, []);

    const backgroundStyle = (style: ViewStyle) => {
        return {
            ...style,
            backgroundColor: background,
        }
    };

    store.subscribe(() => {
        const state: RootState = store.getState();
        setBackground(state.app.backgroundColor);
    });

    return (
        <Provider store={store}>
            <SafeAreaView style={backgroundStyle(styles.background)}>
                <ScrollView style={styles.scrollView}>
                    <View style={styles.container}>
                        <Main/>
                    </View>
                </ScrollView>
                <FlashMessage position="top" />
            </SafeAreaView>
        </Provider>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "flex-start",
    },
    scrollView: {
        flex: 1,
        backgroundColor: "#fff",
        margin: 24,
        marginTop: __DEV__ ? 50 : 24,
        marginBottom: 0,
        padding: 10,
        borderRadius: 10,
        borderBottomLeftRadius: 0,
        borderBottomRightRadius: 0,
    },
    background: {
        flex: 1,
        backgroundColor: colors.lightGray,
    }
});

export default App;
