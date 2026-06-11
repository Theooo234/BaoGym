import DateTimePicker from "@react-native-community/datetimepicker";
import { useEffect, useState } from "react";
import {
  Platform,
  Pressable,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import colors from "../config/color.js";

const createMidnightDate = () => {
  const midnight = new Date();
  midnight.setHours(0, 0, 0, 0);
  return midnight;
};

export default function CreateRootinePicker({ onChangeTime }) {
  const [date, setDate] = useState(createMidnightDate);
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

  useEffect(() => {
    onChangeTime?.(formatTime(date));
  }, [date, onChangeTime]);

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" />

      <View style={styles.inputContainer}>
        <Text style={[styles.label, { marginTop: 15 }]}>DURÉE ESTIMÉE</Text>
        <Pressable
          style={styles.input}
          placeholderTextColor="#94A3B8"
          onPress={() => setShow(true)}
        >
          <Text style={styles.inputText}> {formatTime(date)} </Text>
        </Pressable>

        {/* LE PICKER NATIF */}
        {show && (
          <View
            style={
              Platform.OS === "ios"
                ? styles.iosPickerContainer
                : styles.androidPickerContainer
            }
          >
            {Platform.OS === "ios" && (
              <TouchableOpacity
                style={styles.iosCloseButton}
                onPress={() => setShow(false)}
              >
                <Text style={styles.iosCloseButtonText}>OK</Text>
              </TouchableOpacity>
            )}
            <View style={styles.iosPickerTitleContainer}>
              <Text style={styles.iosPickerTitle}>Choisissez une durée</Text>
            </View>

            <View style={Platform.OS === "ios" ? styles.iosPickerWindow : null}>
              <DateTimePicker
                value={date}
                mode="time"
                is24Hour={true}
                display={Platform.OS === "ios" ? "spinner" : "default"}
                onChange={onChange}
                textColor="#1F2937" // iOS uniquement
                style={Platform.OS === "ios" ? styles.iosPicker : null}
              />
            </View>
          </View>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "transparent",
    width: "100%",
    zIndex: 20,
  },
  // -- STYLES SPECIFIQUES POUR IOS (Car iOS affiche le spinner directement dans l'écran) --
  iosPickerContainer: {
    position: "absolute",
    top: 32,
    left: 0,
    right: 0,
    backgroundColor: "white",
    height: 150,
    width: "100%",
    borderRadius: 16,
    // borderTopRightRadius: 24,
    zIndex: 9999,
    borderWidth: 1,
    borderColor: "#E2E8F0",
  },
  androidPickerContainer: {
    position: "absolute",
    top: 45,
    left: 0,
    right: 0,
    zIndex: 9999,
  },
  iosPickerWindow: {
    height: 102,
    overflow: "hidden",
    justifyContent: "center",
  },
  iosPicker: {
    height: 90,
    alignSelf: "center",
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
  iosPickerTitleContainer: {
    position: "absolute",
    top: 16,
    left: 16,
  },
  iosPickerTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: colors.baogreen,
  },
  label: {
    fontSize: 10,
    fontWeight: "bold",
    color: "#64748B",
    marginBottom: 6,
    letterSpacing: 1,
  },
  input: {
    backgroundColor: "#F1F5F9",
    borderWidth: 1,
    borderColor: "#E2E8F0",
    borderRadius: 16,
    padding: 16,
    fontSize: 16,
    fontWeight: "bold",
    color: "#0F172A",
  },
  inputText: {
    fontSize: 16,
    fontWeight: "bold",
  },
  inputContainer: {
    width: "100%",
    position: "relative",
    zIndex: 9999,
  },
});
