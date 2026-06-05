/**
 * CountdownTimerApp Functional Component
 */

import React, { useRef, useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import CountDownTimer from "react-native-countdown-timer-hooks";

function CountdownTimerApp() {
  // Timer References
  const refTimer = useRef();

  // For keeping a track of the timer
  const [timerEnd, setTimerEnd] = useState(false);

  const timerOnProgressFunc = (remainingTimeInSecs) => {
    console.log("On Progress tracker :", remainingTimeInSecs);
  };

  const timerCallbackFunc = (timerFlag) => {
    // Setting timer flag to false once complete
    setTimerEnd(timerFlag);
    console.warn("Alert the user when timer runs out...");
  };

  return (
    <View style={styles.container}>
      <View style={{ display: timerEnd ? "none" : "flex" }}>
        <CountDownTimer
          ref={refTimer}
          timestamp={120}
          timerOnProgress={timerOnProgressFunc}
          timerCallback={timerCallbackFunc}
          containerStyle={styles.timerContainerStyle}
          textStyle={styles.timerTextStyle}
        />
      </View>
      <TouchableOpacity
        style={[
          {
            display: timerEnd ? "flex" : "none",
          },
          styles.touchableOpacityStyle,
        ]}
        onPress={() => {
          setTimerEnd(false);
          refTimer.current.resetTimer();
        }}
      >
        <Text style={styles.touchableOpacityTextStyle}>Resend</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  timerContainerStyle: {
    height: 56,
    width: 120,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 35,
    backgroundColor: "#2196f3",
  },
  timerTextStyle: {
    fontSize: 25,
    color: "#FFFFFF",
    fontWeight: "500",
    letterSpacing: 0.25,
  },
  touchableOpacityStyle: {
    height: 56,
    width: 120,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 35,
    backgroundColor: "#512da8",
  },
  touchableOpacityTextStyle: {
    fontSize: 18,
    color: "#FFFFFF",
    fontWeight: "bold",
  },
});

export default CountdownTimerApp;

