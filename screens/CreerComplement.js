import AntDesign from "@expo/vector-icons/AntDesign";
import Entypo from "@expo/vector-icons/Entypo";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { useRouter } from "expo-router";
import { useState } from "react";
import { Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import Screen from "../components/Screen.js";
import colors from "../config/color.js";
export default function CreerComplement() {
  const router = useRouter();

  const [selectedDays, setSelectedDays] = useState({
    L: false,
    M1: false,
    M2: false,
    J: false,
    V: false,
    S: false,
    D: false,
    Tous: false,
  });

  const [selectedFormat, setSelectedFormat] = useState({
    pill: false,
    caps: false,
    liqu: false,
    poud: false,
  });

  const toggleDay = (dayKey) => {
    if (dayKey === "Tous") {
      // Si on clique sur "Tous", sélectionner/désélectionner tous les jours
      const allSelected = selectedDays.Tous;
      setSelectedDays({
        L: !allSelected,
        M1: !allSelected,
        M2: !allSelected,
        J: !allSelected,
        V: !allSelected,
        S: !allSelected,
        D: !allSelected,
        Tous: !allSelected,
      });
    } else {
      // Sinon, toggle simplement le jour cliqué
      setSelectedDays((prev) => ({
        ...prev,
        [dayKey]: !prev[dayKey],
      }));
    }
  };

  const toggleFormat = (formatKey) => {
    setSelectedFormat((prev) => {
      const isCurrentlySelected = prev[formatKey];
      if (isCurrentlySelected) {
        // Si on clique sur le format déjà sélectionné, le désélectionner
        return {
          pill: false,
          caps: false,
          liqu: false,
          poud: false,
        };
      } else {
        // Sinon, désélectionner tous et sélectionner celui-ci
        return {
          pill: false,
          caps: false,
          liqu: false,
          poud: false,
          [formatKey]: true,
        };
      }
    });
  };

  return (
    <Screen>
      <View style={styles.background}>
        <View style={styles.topContainer}>
          <Pressable style={styles.icon} onPress={() => router.back()}>
            <Entypo name="chevron-left" size={24} color="black" />
          </Pressable>
          <View style={styles.titleContainer}>
            <Text style={styles.title}>Nouveau Complément</Text>
          </View>
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.inputTitle}>Informations</Text>
          <TextInput
            style={styles.input}
            placeholder="Nom du complément (ex: Magnésium)"
            placeholderTextColor="#999595"
          />
          <TextInput
            style={styles.input}
            placeholder="Dosage (ex: 400mg)"
            placeholderTextColor="#999595"
          />
        </View>

        <View style={styles.formatContainer}>
          <Text style={styles.formatTitle}>Format</Text>
          <View style={styles.formatOptions}>
            <Pressable
              style={[
                styles.format,
                selectedFormat.pill && styles.formatSelected,
              ]}
              onPress={() => toggleFormat("pill")}
            >
              <MaterialCommunityIcons
                name="pill"
                style={[
                  styles.formatIcon,
                  selectedFormat.pill && styles.formatIconSelected,
                ]}
              />
              <Text
                style={[
                  styles.formatText,
                  selectedFormat.pill && styles.formatTextSelected,
                ]}
              >
                Pillule
              </Text>
            </Pressable>
            <Pressable
              style={[
                styles.format,
                selectedFormat.caps && styles.formatSelected,
              ]}
              onPress={() => toggleFormat("caps")}
            >
              <AntDesign
                name="medicine-box"
                style={[
                  styles.formatIcon,
                  selectedFormat.caps && styles.formatIconSelected,
                ]}
              />

              <Text
                style={[
                  styles.formatText,
                  selectedFormat.caps && styles.formatTextSelected,
                ]}
              >
                Capsule
              </Text>
            </Pressable>
            <Pressable
              style={[
                styles.format,
                selectedFormat.liqu && styles.formatSelected,
              ]}
              onPress={() => toggleFormat("liqu")}
            >
              <FontAwesome6
                name="droplet"
                style={[
                  styles.formatIcon,
                  selectedFormat.liqu && styles.formatIconSelected,
                ]}
              />
              <Text
                style={[
                  styles.formatText,
                  selectedFormat.liqu && styles.formatTextSelected,
                ]}
              >
                Liquide
              </Text>
            </Pressable>
            <Pressable
              style={[
                styles.format,
                selectedFormat.poud && styles.formatSelected,
              ]}
              onPress={() => toggleFormat("poud")}
            >
              <MaterialCommunityIcons
                name="grain"
                style={[
                  styles.formatIcon,
                  selectedFormat.poud && styles.formatIconSelected,
                ]}
              />
              <Text
                style={[
                  styles.formatText,
                  selectedFormat.poud && styles.formatTextSelected,
                ]}
              >
                Poudre
              </Text>
            </Pressable>
          </View>
        </View>
        <View style={styles.frequenceContainer}>
          <View style={styles.frequence}>
            <Text style={styles.frequencetext}>Fréquence</Text>
          </View>
          <View style={styles.joursun}>
            <Pressable
              style={[styles.jour, selectedDays.L && styles.jourSelected]}
              onPress={() => toggleDay("L")}
            >
              <Text
                style={[
                  styles.jourText,
                  selectedDays.L && styles.jourTextSelected,
                ]}
              >
                L
              </Text>
            </Pressable>
            <Pressable
              style={[styles.jour, selectedDays.M1 && styles.jourSelected]}
              onPress={() => toggleDay("M1")}
            >
              <Text
                style={[
                  styles.jourText,
                  selectedDays.M1 && styles.jourTextSelected,
                ]}
              >
                M
              </Text>
            </Pressable>
            <Pressable
              style={[styles.jour, selectedDays.M2 && styles.jourSelected]}
              onPress={() => toggleDay("M2")}
            >
              <Text
                style={[
                  styles.jourText,
                  selectedDays.M2 && styles.jourTextSelected,
                ]}
              >
                M
              </Text>
            </Pressable>
            <Pressable
              style={[styles.jour, selectedDays.J && styles.jourSelected]}
              onPress={() => toggleDay("J")}
            >
              <Text
                style={[
                  styles.jourText,
                  selectedDays.J && styles.jourTextSelected,
                ]}
              >
                J
              </Text>
            </Pressable>
            <Pressable
              style={[styles.jour, selectedDays.V && styles.jourSelected]}
              onPress={() => toggleDay("V")}
            >
              <Text
                style={[
                  styles.jourText,
                  selectedDays.V && styles.jourTextSelected,
                ]}
              >
                V
              </Text>
            </Pressable>
          </View>
          <View style={styles.joursdeux}>
            <Pressable
              style={[styles.jour, selectedDays.S && styles.jourSelected]}
              onPress={() => toggleDay("S")}
            >
              <Text
                style={[
                  styles.jourText,
                  selectedDays.S && styles.jourTextSelected,
                ]}
              >
                S
              </Text>
            </Pressable>
            <Pressable
              style={[styles.jour, selectedDays.D && styles.jourSelected]}
              onPress={() => toggleDay("D")}
            >
              <Text
                style={[
                  styles.jourText,
                  selectedDays.D && styles.jourTextSelected,
                ]}
              >
                D
              </Text>
            </Pressable>
            <Pressable
              style={[
                styles.jour,
                styles.jourTous,
                selectedDays.Tous && styles.jourSelected,
              ]}
              onPress={() => toggleDay("Tous")}
            >
              <Text
                style={[
                  styles.jourText,
                  selectedDays.Tous && styles.jourTextSelected,
                ]}
              >
                Tous
              </Text>
            </Pressable>
          </View>
        </View>
        <View style={styles.ajoutContainer}>
          <Pressable style={styles.creerContent} onPress="">
            <Text style={styles.ajoutText}>Enregistrer le Rappel</Text>
          </Pressable>
        </View>
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    // backgroundColor: "#f9fcf8",
    alignItems: "left",
    justifyContent: "flex-start",
    marginVertical: 0,
    marginHorizontal: 20,
  },
  topContainer: {
    backgroundColor: "transparent",
    // backgroundColor: "green",
    position: "relative",
    flexDirection: "row",
    gap: 15,
  },
  icon: {
    width: 50,
    height: 50,
    borderRadius: 40,
    backgroundColor: "#f9fcf8",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 1,
    borderWidth: 1,
    borderColor: "#E2E8F0",
  },
  titleContainer: {
    flexDirection: "column",
    alignItems: "flex-start",
  },
  title: {
    fontSize: 24,
    fontWeight: 900,
    marginTop: 12,
    color: "#0F172A",
    fontFamily: "Montserrat",
  },
  inputContainer: {
    backgroundColor: "transparent",
    // backgroundColor: "green",
    marginTop: 15,
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 12,
    gap: 12,
  },
  inputTitle: {
    fontSize: 26,
    fontWeight: 600,
    fontFamily: "Montserrat",
  },
  input: {
    backgroundColor: "white",
    borderRadius: 10,
    paddingHorizontal: 16,
    paddingVertical: 14,
    fontSize: 16,
    color: "#333",
    fontFamily: "Montserrat",
    borderWidth: 1,
    borderColor: "#E2E8F0",
    borderStyle: "solid",
  },
  formatContainer: {
    backgroundColor: "transparent",
    // backgroundColor: "yellow",
    paddingHorizontal: 10,
    paddingVertical: 10,
    borderRadius: 12,
    gap: 12,
    marginTop: 0,
  },
  formatTitle: {
    fontSize: 26,
    fontWeight: 600,
    fontFamily: "Montserrat",
  },
  formatOptions: {
    flexDirection: "row",
    gap: 10,
  },
  format: {
    flex: 1,
    width: 80,
    height: 80,
    backgroundColor: "#f9fcf8",
    paddingHorizontal: 8,
    paddingVertical: 15,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#E2E8F0",
    borderStyle: "solid",
    alignItems: "center",
    justifyContent: "center",
  },
  formatSelected: {
    backgroundColor: "#f0f8f1",
    borderColor: colors.baogreen,
    borderWidth: 2,
  },
  formatIcon: {
    fontSize: 22,
    color: "#C0C0C0",
    marginBottom: 5,
  },
  formatIconSelected: {
    color: colors.baogreen,
  },
  formatText: {
    fontSize: 14,
    fontWeight: 700,
    color: "#C0C0C0",
    fontFamily: "Montserrat",
  },
  formatTextSelected: {
    color: colors.baogreen,
  },
  joursun: {
    flexDirection: "row",
    justifyContent: "flex-start",
    padding: 5,
  },
  joursdeux: {
    flexDirection: "row",
    justifyContent: "flex-start",
    padding: 5,
  },
  jour: {
    backgroundColor: "white",
    borderRadius: 50,
    height: 50,
    width: 50,
    margin: 4,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    borderColor: "#E2E8F0",
    borderWidth: 1,
  },
  jourText: {
    color: "#64748D",
    fontSize: 21,
    fontWeight: "400",
  },
  jourSelected: {
    backgroundColor: colors.baogreen,
    borderColor: colors.baogreen,
  },
  jourTextSelected: {
    color: "white",
  },
  jourTous: {
    width: 120,
    paddingHorizontal: 20,
  },
  frequenceContainer: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    marginTop: 0,
    // backgroundColor: "cyan",
    backgroundColor: "transparent",
  },
  frequence: {
    padding: 5,
  },
  frequencetext: {
    fontSize: 26,
  },
  ajoutContainer: {
    backgroundColor: colors.baogreen,
    position: "absolute",
    bottom: 20,
    zIndex: 1,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 20,
    width: "80%",
    height: 56,
    left: "10%",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  creerContent: {
    flexDirection: "row",
    gap: 5,
    alignItems: "center",
  },
  ajoutText: {
    color: colors.white,
    fontSize: 18,
    fontWeight: "700",
    fontFamily: "Monserrat",
  },
});

{
  /* <View></View>
<Text></Text> */
}
