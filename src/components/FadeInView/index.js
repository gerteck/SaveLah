import * as React from "react";
import { Animated } from "react-native";
import { useFocusEffect } from "@react-navigation/native";

const FadeInView = (props, { navigation }) => {
    const fadeAnim = React.useRef(new Animated.Value(0)).current; // Initial value for opacity: 0

    useFocusEffect(() => {
        Animated.timing(fadeAnim, {
            toValue: 1,
            duration: 150,
            useNativeDriver: true,
        }).start();
        return () => {
            Animated.timing(fadeAnim, {
                toValue: 0,
                duration: 150,
                useNativeDriver: true,
            }).start();
        };
    });

    return (
        <Animated.View // Special animatable View
            style={{
                flex: 1,
                opacity: fadeAnim, // Bind opacity to animated value
            }}
        >
            {props.children}
        </Animated.View>
    );
};

export default React.memo(FadeInView);