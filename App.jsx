import React, { useEffect } from "react";
import { View, Dimensions } from "react-native";
import Animated, { useSharedValue, useAnimatedStyle, withRepeat, withTiming, Easing } from "react-native-reanimated";
import Svg, { Circle, Rect, Path } from "react-native-svg";

const { width, height } = Dimensions.get("window");

const DoraemonFly = () => {
  const position = useSharedValue(height - 200);

  useEffect(() => {
    position.value = withRepeat(
      withTiming(100, {
        duration: 3000,
        easing: Easing.inOut(Easing.ease),
      }),
      -1,
      true
    );
  }, []);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateY: position.value }],
    };
  });

  return (
    <View style={{ flex: 1, backgroundColor: "#fff", justifyContent: "center", alignItems: "center" }}>
      <Animated.View style={animatedStyle}>
        <Svg height="200" width="150" viewBox="0 0 150 200">
          {/* Doraemon Head */}
          <Circle cx="75" cy="60" r="59" fill="skyblue" stroke="black" strokeWidth="2" />
          <Circle cx="75" cy="80" r="40" fill="white" stroke="black" strokeWidth="2" />
          <Circle cx="58" cy="40" r="13" fill="white" stroke="black" strokeWidth="2" />
          <Circle cx="92" cy="40" r="13" fill="white" stroke="black" strokeWidth="2" />
          <Circle cx="59" cy="40" r="5" fill="black" />
          <Circle cx="90" cy="40" r="5" fill="black" />
          
          {/* Doraemon Nose */}
          <Circle cx="75" cy="85" r="5" fill="red" stroke="black" strokeWidth="1" />
          
          {/* Doraemon Mouth */}
          <Path d="M 60 95 Q 75 110, 90 95" stroke="black" strokeWidth="2" fill="none" />
          
          {/* Doraemon Body */}
          <Rect x="45" y="100" width="60" height="80" fill="skyblue" stroke="black" strokeWidth="2" rx="30" />
          
          {/* Doraemon Legs */}
          <Circle cx="60" cy="180" r="15" fill="white" stroke="black" strokeWidth="2" />
          <Circle cx="90" cy="180" r="15" fill="white" stroke="black" strokeWidth="2" />
          
          {/* Doraemon Hands */}
          <Circle cx="35" cy="130" r="12" fill="white" stroke="black" strokeWidth="2" />
          <Circle cx="115" cy="130" r="12" fill="white" stroke="black" strokeWidth="2" />
          
          {/* Bamboo Copter */}
          <Rect x="60" y="10" width="30" height="5" fill="yellow" stroke="black" strokeWidth="2" />
          <Rect x="72" y="15" width="6" height="15" fill="yellow" stroke="black" strokeWidth="2" />
        </Svg>
      </Animated.View>
    </View>
  );
};

export default DoraemonFly;
