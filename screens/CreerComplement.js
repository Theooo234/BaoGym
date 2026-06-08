import Entypo from "@expo/vector-icons/Entypo";
import { useRouter } from "expo-router";
import { Pressable, StyleSheet, Text, View } from "react-native";
import Screen from "../components/Screen.js";
import colors from "../config/color.js";

export default function CreerComplement() {
  const router = useRouter();
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
        <View style={[styles.ajoutContainer]}>
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
    backgroundColor: "green",
    // backgroundColor: "#f9fcf8",
    alignItems: "left",
    justifyContent: "flex-start",
    marginVertical: 20,
    marginHorizontal: 20,
  },
  topContainer: {
    width: "100%",
    height: 120,
    backgroundColor: "#f9fcf8",
    borderRadius: 20,
    position: "relative",
    flexDirection: "row",
  },
  icon: {
    width: 50,
    height: 50,
    borderRadius: 40,
    backgroundColor: "#ffffff",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 1,
    borderWidth: 1,
    borderColor: "#E2E8F0",
  },
  titleContainer: {
    position: "absolute",

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
