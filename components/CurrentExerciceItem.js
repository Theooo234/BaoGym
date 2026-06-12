import { Feather, Ionicons } from "@expo/vector-icons";
import { useEffect, useState } from "react";
import {
    Alert,
    Image,
    Pressable,
    StyleSheet,
    Text,
    TextInput,
    View,
} from "react-native";
import colors from "../config/color.js";
import { useRootine } from "../hooks/useRootine.jsx";
import { supabase } from "../lib/supabase.js";

export default function CurrentExerciceItem({ rootineId, exercice }) {
  const [serie, setSerie] = useState([]);
  const [isChecked, setIsChecked] = useState(false);
  const { deleteExercice, fetchExercicesByRootine, rootines } = useRootine();

  const rootine = rootines.find(
    (r) => r.id?.toString() === rootineId?.toString(),
  );

  useEffect(() => {
    fetchSerie(exercice.exercices.id);
  }, [exercice.exercices.id]);

  const fetchSerie = async (exerciceId) => {
    try {
      const { data, error } = await supabase
        .from("series")
        .select("*")
        .eq("exercice_id", exerciceId);

      if (error) throw error;
      setSerie(data || []);
      console.log("Séries pour l'exercice", data);
    } catch (error) {
      Alert.alert("Erreur", "Impossible de charger les séries.");
    } finally {
    }
  };
  const SerieItem = () => {
    const elt = [];

    for (let i = 0; i < serie.length; i++) {
      elt.push(
        <View style={styles.allInput}>
          <View style={styles.serieNbrContainer}>
            <Text style={styles.serieNbr}>{i + 1}</Text>
          </View>
          <TextInput
            style={styles.input}
            placeholder="0"
            placeholderTextColor="#94A3B8"
          />
          <TextInput
            style={styles.input}
            placeholder="0"
            placeholderTextColor="#94A3B8"
          />
          <Pressable
            style={styles.CheckboxContainer}
            onPress={() => setIsChecked(!isChecked)}
          >
            <Ionicons
              name={isChecked ? "checkbox" : "square-outline"}
              size={24}
              color={isChecked ? "#4CAF50" : "#757575"}
            />
          </Pressable>
        </View>,
      );
    }
    return elt;
  };

  return (
    <View key={exercice.exercices.id} style={styles.exerciceCard}>
      <Image
        source={{ uri: exercice.exercices.image }}
        style={styles.exerciceImage}
        resizeMode="contain"
      />
      <Text style={styles.exerciceName}>{exercice.exercices.nom}</Text>
      <View style={styles.statContainer}>
        <Text style={styles.kgText}>Série</Text>
        <Text style={styles.kgText}>kg</Text>
        <Text style={[styles.repText, { left: 15 }]}>reps</Text>
        <Text style={styles.repText}>Réussi</Text>
      </View>

      <SerieItem />

      <Pressable style={styles.addButton}>
        <Feather name="plus" style={styles.addIcon} />
        <Text style={styles.addText}>Ajouter une série</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f9fcf8",
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
    fontSize: 28,
    fontWeight: 900,
    color: "#0F172A",
    fontFamily: "Montserrat",
  },
  compteur: {
    marginTop: 4,
    fontSize: 14,
    color: colors.baogreen,
    fontFamily: "Inter",
    fontWeight: "700",
  },
  exercicesContainer: {
    marginTop: 150,
    paddingHorizontal: 20,
  },
  exerciceCard: {
    backgroundColor: "#f7f7f7",
    // backgroundColor: "#f7f7f7",
    borderRadius: 12,
    padding: 15,
    marginBottom: 20,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    borderWidth: 1,
    borderColor: "#E2E8F0",
    borderStyle: "solid",
  },
  exerciceImage: {
    width: "100%",
    height: 150,
    borderRadius: 8,
    marginBottom: 10,
    backgroundColor: "#ffffff",
    borderWidth: 1,
    borderColor: "#E2E8F0",
    borderStyle: "solid",
  },
  exerciceName: {
    fontSize: 18,
    fontWeight: "700",
    color: "#0F172A",
    fontFamily: "Montserrat",
  },
  exerciceDetails: {
    fontSize: 14,
    color: colors.baogreen,
    fontFamily: "Inter",
    marginTop: 5,
  },
  trashIcon: {
    position: "absolute",
    top: 5,
    right: 5,
    zIndex: 1,
    backgroundColor: "#ffffff",
    borderRadius: 20,
    padding: 5,
    borderWidth: 1,
    borderColor: "#E2E8F0",
    borderStyle: "solid",
  },
  ajoutContainer: {
    backgroundColor: colors.baogreen,
    position: "absolute",
    bottom: 20,
    zIndex: 99,
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
  creerContent: {
    flexDirection: "row",
    gap: 5,
    alignItems: "center",
  },
  allInput: {
    backgroundColor: "#ffffff",
    width: "100%",
    paddingHorizontal: 5,
    borderRadius: 8,
    alignItems: "center",
    flexDirection: "row",
    marginTop: 10,
    paddingVertical: 10,
    display: "flex",
    justifyContent: "space-around",
  },
  input: {
    backgroundColor: "#f7f7f7",
    borderWidth: 1,
    borderColor: "#f7f7f7",
    borderRadius: 8,
    padding: 10,
    width: 50,
    fontSize: 14,
    fontWeight: "bold",
    color: "#0F172A",
    textAlign: "center",
  },
  addButton: {
    flexDirection: "row",
    color: colors.white,
    marginTop: 10,
    backgroundColor: colors.baogreen,
    width: "100%",
    height: 45,
    borderRadius: 15,
    alignItems: "center",
    justifyContent: "center",
  },
  addIcon: {
    color: colors.white,
    fontSize: 24,
  },
  serieNbrContainer: {
    padding: 10,
    fontSize: 14,
  },
  serieNbr: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#0F172A",
  },
  CheckboxContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  statContainer: {
    marginTop: 10,
    display: "flex",
    flexDirection: "row",
    gap: 45,
  },
  addText: {
    color: colors.white,
    fontSize: 16,
    fontWeight: "700",
    fontFamily: "Monserrat",
  },
});
