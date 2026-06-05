import Feather from "@expo/vector-icons/Feather";
import { useState } from "react";
import {
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";
import colors from "../config/color";
import Separator from "./Separation";

export default function Serie({ serieNumber, showSeparator = true }) {
  const [isChecked, setisChecked] = useState(false);
  const onToggle = () => {
    setisChecked((prev) => !prev);
  };
  return (
    <>
      <View style={styles.input}>
        <Text style={styles.label}>Série {serieNumber}</Text>
        <TextInput style={styles.repInput} placeholder="0" />
        <Text style={styles.label}>reps</Text>
        <TextInput style={styles.poidsInput} placeholder="0" />
        <Text style={styles.label}>kg</Text>
        <TouchableOpacity
          style={[
            styles.checkboxContainer,
            isChecked && styles.checkboxChecked,
          ]}
          onPress={onToggle}
          activeOpacity={0.7}
        >
          <Feather
            name="check"
            size={16}
            isChecked={isChecked}
            color={isChecked ? "#ffffff" : "#cbd5e1"}
          />
        </TouchableOpacity>
      </View>
      {showSeparator && <Separator />}
    </>
  );
}

const styles = StyleSheet.create({
  separation: {
    height: 1.5,
    backgroundColor: "rgb(76, 76, 77)",
    marginHorizontal: 45,
  },
  input: {
    backgroundColor: "#ffffff",
    marginVertical: 2,
    width: "100%",
    padding: 10,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#E2E8F0",
    borderStyle: "solid",
    flexDirection: "row",
    alignItems: "center",
  },
  poidsInput: {
    color: "#0F172A",
    fontSize: 14,
    fontFamily: "Inter",
    fontWeight: "500",
    backgroundColor: "#f7f7f7",
    paddingHorizontal: 2,
    paddingVertical: 5,
    borderRadius: 6,
    width: 40,
    textAlign: "center",
    marginLeft: 15,
    marginRight: 5,
  },
  label: {
    color: "#64748B",
    fontSize: 14,
    fontFamily: "Inter",
    fontWeight: "500",
  },
  repInput: {
    color: "#0F172A",
    fontSize: 14,
    fontFamily: "Inter",
    fontWeight: "500",
    backgroundColor: "#f7f7f7",
    marginLeft: 15,
    marginRight: 5,
    paddingVertical: 5,
    borderRadius: 6,
    width: 40,
    textAlign: "center",
  },
  checkboxContainer: {
    width: 28,
    height: 28,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: "#CBD5E1",
    alignItems: "center",
    justifyContent: "center",
    marginLeft: 12,
    backgroundColor: "transparent",
  },
  checkboxChecked: {
    backgroundColor: colors.baogreen,
    borderColor: colors.baogreen,
  },
});
