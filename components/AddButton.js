import React from "react";
import { View, StyleSheet, TouchableHighlight, Animated } from "react-native";
import { FontAwesome5, Feather } from "@expo/vector-icons";
import { withNavigation } from 'react-navigation'

class AddButton extends React.Component {
    mode = new Animated.Value(0);
    buttonSize = new Animated.Value(1);

    handlePress = () => {
      this.props.navigation.navigate('Create');
      console.log("pressed the button");
        Animated.sequence([
            Animated.timing(this.buttonSize, {
                toValue: 0.95,
                duration: 50
            }),
            Animated.timing(this.buttonSize, {
                toValue: 1,
                duration: 50
            }),
            Animated.timing(this.mode, {
                toValue: this.mode._value === 0 ? 1 : 0,
                duration: 50
            })
        ]).start();
    };

    render() {

        const sizeStyle = {
            transform: [{ scale: this.buttonSize }]
        };

        return (
            <View style={{ position: "absolute", alignItems: "center" }}>
                <Animated.View style={[styles.button, sizeStyle]}>
                    <TouchableHighlight onPress={this.handlePress} underlayColor="#f6b425">
                        <Animated.View >
                            <FontAwesome5 name="plus" size={24} color="#FFF" />
                        </Animated.View>
                    </TouchableHighlight>
                </Animated.View>
            </View>
        );
    }
}
export default withNavigation(AddButton);

const styles = StyleSheet.create({
    button: {
        alignItems: "center",
        justifyContent: "center",
        width: 72,
        height: 72,
        borderRadius: 36,
        backgroundColor: "#f6b425",
        position: "absolute",
        marginTop: -60,
        shadowColor: "#f6b425",
        shadowRadius: 5,
        shadowOffset: { height: 10 },
        shadowOpacity: 0.3,
        borderWidth: 3,
        borderColor: "#FFFFFF"
    },
    secondaryButton: {
        position: "absolute",
        alignItems: "center",
        justifyContent: "center",
        width: 48,
        height: 48,
        borderRadius: 24,
        backgroundColor: "#f6b425"
    }
});
