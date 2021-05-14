import React, {Component} from "react";
import {Button, View, StyleSheet, Text} from "react-native";

class Choices extends Component {
    render() {
        return (
            <View style={styles.fixToText}>
                {
                    this.props.choices.map(
                        (choice) => {
                            const color = ( this.props.myVote === choice ) ? "#F00" : ( ( this.props.myInitialVote === choice ) ? "#0F0" : "#00F" );
                            return <View
                                key={"choice " + choice}
                                style={styles.buttonView}>
                                    <Button
                                        color={color}
                                        title={ "" + choice}
                                        onPress={(event) => this.props.onChoice( choice )}
                                    />
                            </View>;
                        }
                    )
                }
            </View>
        );
    }
}

const styles = StyleSheet.create( {
    fixToText: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        flexWrap: 'wrap',
        width: 280,
        margin: 16,
    },
    buttonView: {
        margin: 2,
    }
})

export default Choices;