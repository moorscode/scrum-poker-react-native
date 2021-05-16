import React, {useEffect, useState} from "react";
import Main from "./components/Main";
import {Provider} from 'react-redux';
import store, {RootState} from './store';
import socket from './utils/Socket';
import {SafeAreaView, StyleSheet, View} from "react-native";

function App() {
    const [ background, setBackground ] = useState( "#eee" );

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

    store.subscribe( () => {
        const state: RootState = store.getState();
        setBackground( state.app.backgroundColor );
    });

    const backgroundStyle = ( style: any ) => {
        return {
            ...style,
            backgroundColor: background,
        }
    };

    return (
        <Provider store={store}>
            <SafeAreaView style={backgroundStyle(styles.background)}>
                <View style={styles.container}>
                    <Main/>
                </View>
            </SafeAreaView>
        </Provider>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        alignItems: "center",
        justifyContent: "flex-start",
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
        backgroundColor: "#eee",
    }
});

export default App;
