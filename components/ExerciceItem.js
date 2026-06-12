import { EvilIcons } from "@expo/vector-icons";
import { useEffect, useState } from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";
import Alert from "react-native/Libraries/Alert/Alert";
import colors from "../config/color.js";
import { useRootine } from "../hooks/useRootine.jsx";
import { supabase } from "../lib/supabase.js";

export default function ExerciceItem({ rootineId, exercice }) {
  const [pressedDelete, setPressedDelete] = useState(false);
  const { deleteExercice, fetchExercicesByRootine, setLoading, loading } =
    useRootine();
  const [serie, setSerie] = useState([]);
  const [incrementation, setIncrementation] = useState(0);

  useEffect(() => {
    fetchSerie(exercice.exercices.id);
  }, [rootineId, exercice.exercices.id]);

  const fetchSerie = async (exerciceId) => {
    setLoading(true);
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
      setLoading(false);
    }
  };

  const handleDelete = (id) => {
    setPressedDelete(true);
    if (!pressedDelete) {
      Alert.alert(
        "Confirmer la suppression",
        "Êtes-vous sûr de vouloir supprimer cet exercice ?",
        [
          { text: "Annuler", style: "cancel" },
          {
            text: "Supprimer",
            style: "destructive",
            onPress: () => {
              deleteExercice(id);
              fetchExercicesByRootine(rootineId);
            },
          },
        ],
      );
    }
    setPressedDelete(false);
  };

  const increment = setIncrementation + 1;
  return (
    <View key={exercice.id} style={styles.exerciceCard}>
      <TouchableOpacity
        style={styles.trashIcon}
        activeOpacity={0.5}
        onPress={() => handleDelete(exercice.exercices.id)}
      >
        <EvilIcons name="trash" size={28} color="red" />
      </TouchableOpacity>
      <Image
        source={{ uri: exercice.exercices.image }}
        style={styles.exerciceImage}
        resizeMode="contain"
      />
      <Text style={styles.exerciceName}>{exercice.exercices.nom}</Text>
      <Text style={styles.exerciceDetails}>
        {serie[incrementation]?.nbr_serie}3 séries :{" "}
        {serie[incrementation]?.nbr_rep} x {serie[incrementation]?.poids} kg
      </Text>
    </View>
  );
}

const styles = {
  exerciceCard: {
    backgroundColor: "#f7f7f7",
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
};
