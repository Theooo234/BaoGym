import Entypo from "@expo/vector-icons/Entypo";
import EvilIcons from "@expo/vector-icons/EvilIcons";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import {
  Alert,
  FlatList,
  Image,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import LoadingIndicator from "../components/LoadingIndicator.js";
import colors from "../config/color";
import { useRootine } from "../hooks/useRootine.jsx";

export default function EventInfo({ id }) {
  const router = useRouter();
  const [refreshing, setRefreshing] = useState(false);
  const {
    rootines,
    deleteExercice,
    fetchExercicesByRootine,
    exercices,
    loading,
  } = useRootine();
  const [pressedDelete, setPressedDelete] = useState(false);

  useEffect(() => {
    fetchExercicesByRootine(id);
  }, []);

  if (loading) {
    return (
      <View style={styles.centered}>
        <Text style={styles.loadingText}>Chargement...</Text>
        <LoadingIndicator />
      </View>
    );
  }

  const rootine = rootines.find((r) => r.id?.toString() === id?.toString());

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
              fetchExercicesByRootine(id);
            },
          },
        ],
      );
    }
    setPressedDelete(false);
  };
  return (
    <>
      <View style={styles.container}>
        <Pressable style={styles.icon} onPress={() => router.back()}>
          <Entypo name="chevron-left" size={24} color="black" />
        </Pressable>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>{rootine?.nom}</Text>
          <Text style={styles.subTitle}>
            {rootine?.duree_estimee?.slice(0, 5)} - {rootine?.jour_prevu}
          </Text>
        </View>

        <View style={[styles.ajoutContainer]}>
          <View style={styles.creerContent}>
            <FontAwesome5
              name="plus"
              size={15}
              color={colors.white}
              style={styles.plusIcon}
            />
            <Text style={styles.ajoutText}>Ajouter un Exercice</Text>
          </View>
        </View>

        <View style={styles.exercicesContainer}>
          <FlatList
            style={{
              width: "100%",
              padding: 20,
              backgroundColor: "#f9fcf8",
            }}
            data={exercices}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ paddingBottom: 90 }}
            keyExtractor={(item) => item.id}
            bounces={false}
            overScrollMode="never"
            //renderItem={({ item }) => <Text>{item.typeEvenement}</Text>}
            renderItem={({ item }) => (
              <View key={item.id} style={styles.exerciceCard}>
                <TouchableOpacity
                  style={styles.trashIcon}
                  activeOpacity={0.5}
                  onPress={() => handleDelete(item.exercices.id)}
                >
                  <EvilIcons name="trash" size={28} color="red" />
                </TouchableOpacity>
                <Image
                  source={{ uri: item.exercices.image }}
                  style={styles.exerciceImage}
                  resizeMode="contain"
                />
                <Text style={styles.exerciceName}>{item.exercices.nom}</Text>
                <Text style={styles.exerciceDetails}>
                  {item.exercices.series} séries - {item.exercices.repetitions}{" "}
                  répétitions
                </Text>
              </View>
            )}
          />
        </View>
      </View>
    </>
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
  subTitle: {
    marginTop: 4,
    fontSize: 14,
    color: "#64748B",
    fontFamily: "Inter",
    fontWeight: "700",
  },
  exercicesContainer: {
    marginTop: 120,
    paddingHorizontal: 20,
  },
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
    fontFamily: "Monserrat-",
  },
  creerContent: {
    flexDirection: "row",
    gap: 5,
    alignItems: "center",
  },
  centered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    gap: 10,
  },
  loadingText: {
    fontSize: 22,
    color: "#64748B",
    fontFamily: "Inter",
    fontWeight: "500",
  },
});
