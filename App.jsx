// import React, { useEffect } from "react";
// import { View, Dimensions } from "react-native";
// import Animated, { useSharedValue, useAnimatedStyle, withRepeat, withTiming, Easing } from "react-native-reanimated";
// import Svg, { Circle, Rect, Path } from "react-native-svg";

// const { width, height } = Dimensions.get("window");

// const DoraemonFly = () => {
//   const position = useSharedValue(height - 200);

//   useEffect(() => {
//     position.value = withRepeat(
//       withTiming(100, {
//         duration: 3000,
//         easing: Easing.inOut(Easing.ease),
//       }),
//       -1,
//       true
//     );
//   }, []);

//   const animatedStyle = useAnimatedStyle(() => {
//     return {
//       transform: [{ translateY: position.value }],
//     };
//   });

//   return (
//     <View style={{ flex: 1, backgroundColor: "#fff", justifyContent: "center", alignItems: "center" }}>
//       <Animated.View style={animatedStyle}>
//         <Svg height="200" width="150" viewBox="0 0 150 200">
//           {/* Doraemon Head */}
//           <Circle cx="75" cy="60" r="59" fill="skyblue" stroke="black" strokeWidth="2" />
//           <Circle cx="75" cy="80" r="40" fill="white" stroke="black" strokeWidth="2" />
//           <Circle cx="58" cy="40" r="16" fill="white" stroke="black" strokeWidth="2" />
//           <Circle cx="92" cy="40" r="16" fill="white" stroke="black" strokeWidth="2" />
//           <Circle cx="59" cy="40" r="4" fill="black" />
//           <Circle cx="90" cy="40" r="4" fill="black" />
          
//           {/* Doraemon Nose */}
//           <Circle cx="75" cy="58" r="8" fill="red" stroke="black" strokeWidth="1" />
          
//           {/* Doraemon Mouth */}
//           <Path d="M 60 95 Q 75 110, 90 95" stroke="black" strokeWidth="1" fill="none" />
          
//           {/* Doraemon Body */}
//           <Rect x="35" y="120" width="80" height="80" fill="skyblue" stroke="black" strokeWidth="2" rx="10" />
          
//           {/* Doraemon Legs */}
//           <Circle cx="40" cy="185" r="15" fill="white" stroke="black" strokeWidth="2" />
//           <Circle cx="110" cy="185" r="15" fill="white" stroke="black" strokeWidth="2" />
          
//           {/* Doraemon Hands */}
//           <Circle cx="25" cy="130" r="12" fill="white" stroke="black" strokeWidth="2" />
//           <Circle cx="125" cy="130" r="12" fill="white" stroke="black" strokeWidth="2" />
          
//           {/* Bamboo Copter */}
//           <Rect x="60" y="1" width="30" height="5" fill="yellow" stroke="black" strokeWidth="2" />
//           <Rect x="72" y="6" width="6" height="15" fill="yellow" stroke="black" strokeWidth="2" />
//         </Svg>
//       </Animated.View>
//     </View>
//   );
// };

// export default DoraemonFly;
import React, { useEffect, useState } from "react";
import { View, Dimensions, Text, TouchableOpacity } from "react-native";
import Animated, { useSharedValue, useAnimatedStyle, withRepeat, withTiming, Easing } from "react-native-reanimated";
import Svg, { Circle, Rect, Path, Line } from "react-native-svg";
import Sound from "react-native-sound";

const { width, height } = Dimensions.get("window");
const DORAEMON_SIZE = 220;
const SAFE_TOP = 50; // Upar se safe margin
const SAFE_BOTTOM = 100; // Neeche se safe margin

const App = () => {
  const position = useSharedValue(height - SAFE_BOTTOM - DORAEMON_SIZE);
  const copterRotation = useSharedValue(0);
  const [music, setMusic] = useState(null); // To store the Sound instance

  useEffect(() => {
    // Play music when the component is loaded
    const musicInstance = new Sound('doraemonmusic.mp3', Sound.MAIN_BUNDLE, (error) => {
      if (error) {
        console.log('Error loading sound', error);
        return;
      }
      musicInstance.setNumberOfLoops(-1); // Set the music to loop indefinitely
      musicInstance.play(); // Play the music
      setMusic(musicInstance); // Save the instance in state
    });

    position.value = withRepeat(
      withTiming(SAFE_TOP, { duration: 3000, easing: Easing.inOut(Easing.ease) }),
      -1,
      true
    );

    copterRotation.value = withRepeat(
      withTiming(360, { duration: 1000, easing: Easing.linear }),
      -1
    );

    // Cleanup sound when component is unmounted
    return () => {
      if (music) {
        music.stop();
        music.release();
      }
    };
  }, []);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: position.value }],
  }));

  const copterStyle = useAnimatedStyle(() => ({
    transform: [{ rotate: `${copterRotation.value}deg` }],
  }));

  // Toggle music play/pause
  const toggleMusic = (action) => {
    if (music) {
      if (action === 'stop') {
        music.stop(); // Stop the music
      } else {
        music.play(); // Play the music
      }
    }
  };

  return (
    <View style={{ flex: 1, backgroundColor: "#87CEEB", justifyContent: "flex-start", alignItems: "center" }}>
      <View>
        <Text style={{ color: "black", fontSize: 20, fontWeight: "500", marginVertical: 20 }}>Faique</Text>
      </View>

      {/* Buttons to control music */}
      <View style={{ flexDirection: "row", marginVertical: 20 }}>
        <TouchableOpacity onPress={() => toggleMusic('play')} style={{ backgroundColor: "#4CAF50", padding: 10, marginHorizontal: 10, borderRadius:10 }}>
          <Text style={{ color: "black" }}>Music On</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => toggleMusic('stop')} style={{ backgroundColor: "#F44336", padding: 10, marginHorizontal: 10, borderRadius:10 }}>
          <Text style={{ color: "black" }}>Music Off</Text>
        </TouchableOpacity>
      </View>

      <Animated.View style={[{ position: "absolute", bottom: SAFE_BOTTOM }, animatedStyle]}>
        <Svg height={DORAEMON_SIZE} width="160" viewBox="0 0 150 220">
          {/* Doraemon Head */}
          <Circle cx="75" cy="70" r="60" fill="skyblue" stroke="black" strokeWidth="2" />
          <Circle cx="75" cy="85" r="40" fill="white" stroke="black" strokeWidth="2" />
          <Circle cx="58" cy="40" r="15" fill="white" stroke="black" strokeWidth="2" />
          <Circle cx="92" cy="40" r="15" fill="white" stroke="black" strokeWidth="2" />
          <Circle cx="59" cy="40" r="4" fill="black" />
          <Circle cx="90" cy="40" r="4" fill="black" />
          
          {/* Nose */}
          <Circle cx="75" cy="55" r="8" fill="red" stroke="black" strokeWidth="1" />

          {/* Mouth */}
          <Path d="M 60 95 Q 75 110, 90 95" stroke="black" strokeWidth="2" fill="none" />

          {/* Whiskers */}
          <Path d="M 40 65 L 70 65" stroke="black" strokeWidth="1" />
          <Path d="M 40 75 L 70 75" stroke="black" strokeWidth="1" />
          <Path d="M 40 85 L 70 85" stroke="black" strokeWidth="1" />
          <Path d="M 110 65 L 80 65" stroke="black" strokeWidth="1" />
          <Path d="M 110 75 L 80 75" stroke="black" strokeWidth="1" />
          <Path d="M 110 85 L 80 85" stroke="black" strokeWidth="1" />

          {/* Body */}
          <Rect x="35" y="120" width="80" height="80" fill="skyblue" stroke="black" strokeWidth="2" rx="10" />

          {/* Pocket */}
          <Path d="M 50 140 Q 75 180, 100 140" stroke="black" strokeWidth="2" fill="white" />

          {/* Bell & Collar */}
          <Rect x="35" y="116" width="80" height="6" fill="red" stroke="black" strokeWidth="2" />
          <Circle cx="75" cy="125" r="8" fill="yellow" stroke="black" strokeWidth="2" />
          <Line x1="75" y1="138" x2="75" y2="145" stroke="black" strokeWidth="2" />

          {/* Legs */}
          <Circle cx="45" cy="200" r="15" fill="white" stroke="black" strokeWidth="2" />
          <Circle cx="105" cy="200" r="15" fill="white" stroke="black" strokeWidth="2" />

          {/* Hands */}
          <Circle cx="25" cy="140" r="12" fill="white" stroke="black" strokeWidth="2" />
          <Circle cx="125" cy="140" r="12" fill="white" stroke="black" strokeWidth="2" />

          {/* Animated Bamboo Copter */}
          <Animated.View style={[{ position: "absolute", top: -20, left: 60 }, copterStyle]}>
            <Svg width="40" height="20">
              <Rect x="0" y="8" width="40" height="4" fill="yellow" stroke="black" strokeWidth="2" />
            </Svg>
          </Animated.View>

          {/* Copter Stick */}
          <Rect x="72" y="6" width="6" height="15" fill="yellow" stroke="black" strokeWidth="2" />
        </Svg>
      </Animated.View>
    </View>
  );
};

export default App;
