import Entypo from "@expo/vector-icons/Entypo";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import {
  Alert,
  FlatList,
  Image,
  Pressable,
  RefreshControl,
  StyleSheet,
  Text,
  View,
} from "react-native";
import ListItemSeparator from "../components/ListItemSeparator.js";
import colors from "../config/color.js";
import { useRootine } from "../hooks/useRootine.jsx";
import { supabase } from "../lib/supabase";

export default function ListeExercices({ id } = {}) {
  const router = useRouter();
  const [pressedExercice, setPressedExercice] = useState(null);

  const [exercices, setExercices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const {
    addExerciceToRootine,
    exercices: rootineExercices,
    rootine,
  } = useRootine();

  console.log("====== Exercices:", addExerciceToRootine, rootine);

  useEffect(() => {
    fetchExercices();
  }, []);

  const fetchExercices = async () => {
    try {
      const { data, error } = await supabase
        .from("exercices_de_base")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;
      setExercices(data || []);
    } catch (error) {
      Alert.alert("Erreur", "Impossible de charger les exercices.");
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  const handleRefresh = () => {
    setRefreshing(true);
    fetchExercices();
  };

  if (loading) {
    return (
      <View style={styles.centered}>
        <Text>Chargement...</Text>
      </View>
    );
  }

  const handleAddExercice = () => {
    if (pressedExercice !== null) {
      console.log("pressedExercice", pressedExercice);

      addExerciceToRootine(pressedExercice);
    }
  };

  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.RootineTitle}>Ajouter des Exercices</Text>
      </View>
      <Pressable style={styles.icon} onPress={() => router.back()}>
        <Entypo name="chevron-left" size={24} color="black" />
      </Pressable>
      <View style={[styles.ajoutContainer]}>
        <Pressable
          style={styles.creerContent}
          onPress={() => {
            handleAddExercice();
            router.back();
          }}
        >
          <Text style={styles.ajoutText}>Ajouter à la routine </Text>
        </Pressable>
      </View>
      <FlatList
        style={{
          width: "100%",
          padding: 20,
          backgroundColor: "#f9fcf8",
        }}
        data={exercices}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 230 }}
        keyExtractor={(item, index) => `${item.id}-${index}`}
        renderItem={({ item }) => (
          <Pressable
            key={item.id}
            onPress={() => setPressedExercice(item)}
            style={
              pressedExercice && pressedExercice.id === item.id
                ? {
                    ...styles.exerciceCard,
                    borderColor: "#BEF264",
                    borderWidth: 2,
                  }
                : styles.exerciceCard
            }
          >
            <Image
              source={{ uri: item.image }}
              style={styles.exerciceImage}
              resizeMode="contain"
            />
            <Text style={styles.exerciceName}>{item.nom}</Text>
          </Pressable>
        )}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />
        }
        itemSeparatorComponent={() => <ListItemSeparator />}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f9fcf8",
    paddingTop: 60,
  },
  RootineTitle: {
    fontSize: 26,
    fontWeight: "900",
    marginLeft: 80,
    paddingTop: 7,
    paddingBottom: 30,
  },
  exerciceCard: {
    backgroundColor: "#f7f7f7",
    borderRadius: 12,
    padding: 10,
    marginBottom: 20,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    borderWidth: 2,
    borderColor: "#E2E8F0",
    borderStyle: "solid",
  },
  exerciceImage: {
    width: "90%",
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
});
