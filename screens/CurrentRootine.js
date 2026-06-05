import Entypo from "@expo/vector-icons/Entypo";
import { useRouter } from "expo-router";
import {
    FlatList,
    Image,
    Pressable,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import Serie from "../components/Serie.js";
import colors from "../config/color";
import { useAutoTimer } from "../hooks/UseAutoTimer";
import { Rootines } from "./Rootine";

export default function EventInfo({ id }) {
  const router = useRouter();

  const rootine = Rootines.find((r) => r.id === id);
  const exercices = rootine?.exercices || [];
  const { tempsFormate } = useAutoTimer();

  return (
    <>
      <View style={styles.container}>
        <Pressable style={styles.icon} onPress={() => router.back()}>
          <Entypo name="chevron-left" size={24} color="black" />
        </Pressable>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>{rootine.nom}</Text>
          <Text style={styles.compteur}>{tempsFormate}</Text>
        </View>
        <TouchableOpacity style={[styles.ajoutContainer]}>
          <View style={styles.creerContent}>
            <Text style={styles.ajoutText}>Terminer la Rootine</Text>
          </View>
        </TouchableOpacity>

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
                <Image
                  source={{ uri: item.image }}
                  style={styles.exerciceImage}
                  resizeMode="contain"
                />
                <Text style={styles.exerciceName}>{item.nom}</Text>
                <View style={styles.allInput}>
                  {Array.from({ length: item.series }).map((_, index) => (
                    <Serie
                      key={`${item.id}-serie-${index + 1}`}
                      serieNumber={index + 1}
                      showSeparator={index !== item.series - 1}
                    />
                  ))}
                </View>
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
    backgroundColor: "#f7f7f7",
    width: "100%",
    paddingHorizontal: 5,
    alignItems: "center",
    flexDirection: "column",
    justifyContent: "space-between",
    marginTop: 10,
  },
});
