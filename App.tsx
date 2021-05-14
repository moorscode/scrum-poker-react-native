import React from "react";
import Main from "./Main";
import {Provider} from 'react-redux';
import store from './store';

function App() {
    // const debouncedRoom = useDebounce( room, 500 );

    // useEffect(() => {
    //     return function exit() {
    //         if ( ! socket || ! socket.connected ) { return; }
    //
    //         if (currentRoom) {
    //             socket.emit("leave", {poker: room});
    //         }
    //
    //     }
    // }, [] );
    //
    // useEffect( () => {
    //     if ( currentRoom && userId ) {
    //         socket.emit("leave", {poker: currentRoom});
    //     }
    //
    //     if ( debouncedRoom && userId ) {
    //         socket.emit("join", {poker: debouncedRoom, name: "mobile"});
    //     }
    // }, [ debouncedRoom ] );

    return (
        <Provider store={store}>
            <Main/>
        </Provider>
    );
}

export default App;

