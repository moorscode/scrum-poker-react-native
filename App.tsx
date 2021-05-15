import React, {useEffect} from "react";
import Main from "./components/Main";
import {Provider} from 'react-redux';
import store from './store';
import socket from './utils/Socket';
import {SafeAreaView, StyleSheet} from "react-native";

function App() {
    // const debouncedRoom = useDebounce( room, 500 );
    useEffect(() => {
        return function exit() {
            const state = store.getState();
            if ( ! socket.connected ) { return; }

            if (state.room) {
                socket.emit("leave", {poker: state.room});
            }

            socket.disconnect();
        }
    }, [] );

    return (
        <Provider store={store}>
            <SafeAreaView style={styles.container}>
                <Main/>
            </SafeAreaView>
        </Provider>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});

export default App;
