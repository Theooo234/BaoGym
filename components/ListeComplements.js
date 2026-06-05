import Feather from "@expo/vector-icons/Feather";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import Fontisto from "@expo/vector-icons/Fontisto";
import { useRouter } from "expo-router";
import { useState } from "react";
import { StyleSheet, Switch, Text, TouchableOpacity, View } from "react-native";
import colors from "../config/color.js";

export default function ListeComplements({ item }) {
  const router = useRouter();
  const [isEnabled, setIsEnabled] = useState(false);
  const toggleSwitch = () => setIsEnabled((previousState) => !previousState);

  //   const subTitle = `${item.date} at ${item.horaire} - ${item.ville} - ${item.typeEvenement}`;

  return (
    <>
      <View style={styles.container}>
        <View style={styles.textContainer}>
          <Text style={styles.icon}>
            <Fontisto name="pills" size={24} color={colors.baogreen} />
          </Text>
          <Text style={styles.title}>{item.nom}</Text>
          <Text style={styles.subTitle}>
            {item.type} - {item.quantite}
          </Text>

          <TouchableOpacity
            style={styles.edit}
            onPress={() => router.push(`/editComplement/${item.id}`)}
          >
            <Feather name="edit-2" size={24} color="black" />
          </TouchableOpacity>
          {/* <Text style={styles.description}>{item.description}</Text> */}
        </View>

        <View style={styles.separation}></View>

        <View style={styles.bottomContainer}>
          <View style={styles.hourContainer}>
            <FontAwesome6 name="clock" size={24} color="#65A30D" />
            <Text style={styles.hourText}>{item.heure}</Text>
          </View>
          <View style={styles.switchContainer}>
            <Text
              style={[
                styles.switchText,
                isEnabled ? styles.switchTextActive : styles.switchTextInactive,
              ]}
            >
              Rappel
            </Text>
            <Switch
              trackColor={{ false: "#767577", true: colors.baogreen }} // Couleur du fond (Désactivé / Activé)
              thumbColor={isEnabled ? "#f9fcf8" : "#f9fcf8"} // Couleur de la bille
              ios_backgroundColor="#767577" // Couleur de fond spécifique à iOS
              onValueChange={toggleSwitch} // Fonction appelée au clic
              value={isEnabled} // Valeur actuelle
            />
          </View>
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    backgroundColor: "#ffffff",
    borderRadius: 28,
    marginBottom: 20,
    width: "100%",
    shadowColor: "#000",
    // shadowOffset: {
    //   width: 0,
    //   height: 20,
    // },
    // shadowOpacity: 0.1,
    elevation: 4,
    borderWidth: 1,
    borderColor: "#f2e7e7",
    overflow: "hidden",
    borderStyle: "solid",
    zIndex: 1,
  },

  imageContainer: {
    width: "100%",
    height: 180,
    backgroundColor: "#E2E8F0",
  },

  image: {
    width: "100%",
    height: "100%",
  },

  textContainer: {
    padding: 20,
  },

  title: {
    fontWeight: "bold",
    fontSize: 20,
    color: "#1E293B",
    marginBottom: 6,
    marginLeft: 60,
  },

  subTitle: {
    fontWeight: "500",
    fontSize: 14,
    color: "#64748B",
    marginLeft: 60,
  },

  edit: {
    position: "absolute",
    top: 16,
    right: 20,
    fontSize: 24,
    color: colors.slate,
  },
  description: {
    marginTop: 20,
    fontSize: 14,
    color: "#475569",
    fontWeight: "500",
  },
  icon: {
    position: "absolute",
    top: 20,
    left: 20,
    backgroundColor: "#ECFCCB",
    padding: 10,
    borderRadius: 16,
  },
  jsp: {
    // // flexDirection: "row",
    // alignItems: "center",
  },
  separation: {
    height: 1,
    backgroundColor: "#E2E8F0",
    marginHorizontal: 20,
    marginBottom: 20,
  },
  bottomContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    // backgroundColor: "red",
    bottom: 10,
  },
  hourContainer: {
    flexDirection: "row",
    // backgroundColor: "blue",
    gap: 10,
    alignItems: "center",
  },
  hourText: {
    fontSize: 16,
    color: colors.baogreen,
    fontWeight: "500",
  },
  switchContainer: {
    flexDirection: "row",
    alignItems: "center",
    // backgroundColor: "green",
  },
  switchText: {
    marginRight: 10,
    fontSize: 16,
    fontWeight: "500",
  },
  switchTextInactive: {
    color: "#475569",
  },
  switchTextActive: {
    color: colors.baogreen,
  },
});
