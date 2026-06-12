import DateTimePicker from "@react-native-community/datetimepicker";
import { useState } from "react";
import {
    Platform,
    StatusBar,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import colors from "../config/color.js";

export default function BeautifulNativePicker() {
  const [date, setDate] = useState(new Date());
  const [show, setShow] = useState(false);

  const onChange = (event, selectedDate) => {
    // Sur Android, on ferme le dialog tout de suite après la sélection
    if (Platform.OS === "android") {
      setShow(false);
    }

    if (selectedDate) {
      setDate(selectedDate);
    }
  };

  // Formater l'heure proprement (ex: 08:05)
  const formatTime = (dateToFormat) => {
    const hours = dateToFormat.getHours().toString().padStart(2, "0");
    const minutes = dateToFormat.getMinutes().toString().padStart(2, "0");
    return `${hours}:${minutes}`;
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" />

      <View style={styles.card}>
        {/* RECOUVREMENT DU BOUTON DECLENCHEUR */}
        <TouchableOpacity
          style={styles.timeButton}
          onPress={() => setShow(true)}
          activeOpacity={0.7}
        >
          <Text style={styles.timeText}>{formatTime(date)}</Text>
          {/* <View style={styles.badge}>
            <Text style={styles.badgeText}>Modifier</Text>
          </View> */}
        </TouchableOpacity>
      </View>

      {/* LE PICKER NATIF */}
      {show && (
        <View style={Platform.OS === "ios" ? styles.iosPickerContainer : null}>
          {Platform.OS === "ios" && (
            <TouchableOpacity
              style={styles.iosCloseButton}
              onPress={() => setShow(false)}
            >
              <Text style={styles.iosCloseButtonText}>OK</Text>
            </TouchableOpacity>
          )}

          <DateTimePicker
            value={date}
            mode="time"
            is24Hour={true}
            display={Platform.OS === "ios" ? "spinner" : "default"}
            onChange={onChange}
            textColor="#1F2937" // iOS uniquement
          />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "transparent",
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  card: {
    backgroundColor: "transparent",
    borderRadius: 24,
    padding: 30,
    width: "100%",
    maxWidth: 340,
    alignItems: "center",
    // Ombres haut de gamme
    // shadowColor: "#000",
    // shadowOffset: { width: 0, height: 10 },
    // shadowOpacity: 0.05,
    // shadowRadius: 20,
    // elevation: 4,
  },
  timeButton: {
    backgroundColor: "#ffffff",
    // borderColor: colors.baogreen,
    // borderRadius: 20,
    borderRadius: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    borderColor: "#E2E8F0",
    borderWidth: 1,
    paddingVertical: 15,
    paddingHorizontal: 30,
    alignItems: "center",
    position: "relative",
    width: "85%",
  },
  timeText: {
    fontSize: Platform.OS === "ios" ? 48 : 35,
    fontWeight: Platform.OS === "ios" ? 400 : 600,
    color: "#64748D",
    letterSpacing: 2,
  },
  badge: {
    position: "absolute",
    bottom: -10,
    backgroundColor: colors.baogreen,
    // backgroundColor: "#6366F1",
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 10,
  },
  badgeText: {
    color: "#FFFFFF",
    fontSize: 11,
    fontWeight: "700",
    textTransform: "uppercase",
  },

  // -- STYLES SPECIFIQUES POUR IOS (Car iOS affiche le spinner directement dans l'écran) --
  iosPickerContainer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "#FFFFFF",
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    paddingBottom: 40,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: -10 },
    shadowOpacity: 0.1,
    shadowRadius: 15,
    elevation: 20,
  },
  iosCloseButton: {
    alignSelf: "flex-end",
    padding: 16,
  },
  iosCloseButtonText: {
    color: colors.baogreen,
    fontWeight: "700",
    fontSize: 16,
    right: 10,
  },
});

// ...Platform.select({
//   ios: {
//     fontSize: 48,
//   },
//   android: {
//     fontSize: 35
//   },
// }),
