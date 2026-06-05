import Entypo from "@expo/vector-icons/Entypo";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import { useRouter } from "expo-router";
import {
    Pressable,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";

import { useState } from "react";
import colors from "../config/color.js";
import { useRootine } from "../hooks/useRootine.jsx";

export default function CreerRootine() {
  const router = useRouter();

  const [nom, setNom] = useState("");
  const [duree, setDuree] = useState("");
  const [jour, setJour] = useState("");

  const { addRootine, rootine, setRootine, updateRootine } = useRootine();

  const handlesubmit = async (e) => {
    e.preventDefault();
    const NouvelleRootine = {
      nom: nom,
      dureeEstimée: duree,
      jourPrévu: jour,
      exercices: [],
    };
    await addRootine(NouvelleRootine);
    setDuree("");
    setNom("");
    setJour("");
    router.push("/home/rootines");
  };

  //   const { evenements } = useEvent();
  console.log("===== WelcomeScreen ====", rootine);

  return (
    <>
      <View style={styles.container}>
        <Pressable style={styles.icon} onPress={() => router.back()}>
          <Entypo name="chevron-left" size={24} color="black" />
        </Pressable>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>Créer une Rootine</Text>
        </View>

        <View style={[styles.ajoutContainer]}>
          <Pressable style={styles.creerContent} onPress={handlesubmit}>
            <Text style={styles.ajoutText}>Créer ma Rootine</Text>
          </Pressable>
        </View>
        <View style={styles.card}>
          <Text style={styles.label}>NOM DE LA SÉANCE</Text>
          <TextInput
            style={styles.input}
            placeholder="Ex: Séance Jambes"
            placeholderTextColor="#94A3B8"
            value={rootine.nom}
            onChange={(e) => {
              rootine.name = e.nativeEvent.text;
              console.log("XXXX", rootine);
              updateRootine({ ...rootine });
            }}
          />

          <Text style={[styles.label, { marginTop: 15 }]}>DURÉE ESTIMÉE</Text>
          <TextInput
            style={styles.input}
            placeholder="Ex: 1h 00min"
            placeholderTextColor="#94A3B8"
            onChange={(e) => {
              rootine.duree = e.nativeEvent.text;
              setRootine(rootine);
            }}
          />

          <Text style={[styles.label, { marginTop: 15 }]}>JOUR </Text>
          <TextInput
            style={styles.input}
            placeholder="Ex: Mercredi"
            placeholderTextColor="#94A3B8"
            onChange={(e) => setJour(e.nativeEvent.text)}
          />
        </View>
        <View>
          <Text style={[styles.titleSection, { marginTop: 15 }]}>
            Exercices
          </Text>
          <View style={[styles.card, { marginTop: 0 }]}>
            <TouchableOpacity
              style={styles.creer}
              onPress={() => router.push("/rootine/add")}
            >
              <Pressable style={styles.creerContent} type="submit">
                <FontAwesome5 name="plus" size={16} color={colors.baogreen} />
                <Text style={styles.creerText}>Ajouter un Exercice</Text>
              </Pressable>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f9fcf8",
    paddingTop: 60,
    alignContent: "center",
  },
  icon: {
    position: "absolute",
    top: 60,
    left: 20,
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
    top: 57,
    left: 85,
    right: 20,
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
  ajoutText: {
    color: colors.white,
    fontSize: 18,
    fontWeight: "700",
    fontFamily: "Monserrat",
  },
  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 24,
    padding: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.03,
    shadowRadius: 10,
    elevation: 2,
    marginTop: 80,
    width: "90%",
    alignSelf: "center",
    borderWidth: 1,
    borderColor: "#E2E8F0",
    borderStyle: "solid",
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
  titleSection: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#0F172A",
    marginBottom: 16,
    marginLeft: "7%",
  },
  creer: {
    backgroundColor: colors.white,
    paddingVertical: 20,
    borderRadius: 24,
    borderStyle: "dashed",
    borderColor: "#BEF264",
    borderWidth: 2,
    alignItems: "center",
    marginVertical: 15,
    marginHorizontal: 5,
    color: "#BEF264",
    flexDirection: "row",
    gap: 8,
    justifyContent: "center",
  },
  creerContent: {
    flexDirection: "row",
    gap: 5,
    alignItems: "center",
  },
  creerText: {
    color: "#65A30D",
    fontSize: 18,
    fontWeight: "bold",
  },
});
