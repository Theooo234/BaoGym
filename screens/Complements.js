import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import ListComplements from "../components/ListeComplements.js";
import ListItemSeparator from "../components/ListItemSeparator.js";
import Picker from "../components/Picker.js";
import Screen from "../components/Screen.js";
import colors from "../config/color.js";

export const ComplementsData = [
  {
    id: "67",
    nom: "Whey",
    heure: "11:00",
    quantite: "30g",
    type: "Protéine",
    icon: "https://www.flaticon.com/free-icon/shaker_18054041?term=shaker&page=1&position=3&origin=tag&related_id=18054041",
    description:
      "La whey est une protéine de haute qualité, rapidement absorbée par l'organisme, idéale pour la récupération musculaire après l'entraînement.",
  },
  {
    id: "68",
    nom: "Créatine",
    heure: "7:00",
    quantite: "5g",
    type: "Créatine monohydrate",
    icon: "https://www.flaticon.com/free-icon/supplement_16879044?term=supplement+jar&page=1&position=46&origin=search&related_id=16879044",
    description:
      "La créatine est un complément populaire pour améliorer la performance physique, augmenter la force et favoriser la récupération musculaire. Elle aide à reconstituer les réserves d'énergie dans les muscles pendant l'exercice intense.",
  },
  {
    id: "69",
    nom: "Spiruline",
    heure: "11:00",
    quantite: "10g",
    type: "Superaliment",
    icon: "https://www.flaticon.com/free-icon/leaves-of-a-plant_45777?term=plant&page=1&position=4&origin=search&related_id=45777",
    description:
      "La spiruline est une algue riche en nutriments, notamment en protéines, vitamines et minéraux. Elle est souvent utilisée comme complément alimentaire pour soutenir la santé générale, renforcer le système immunitaire et améliorer l'énergie.",
  },
];

export default function Complements() {
  const router = useRouter();
  const TOTAL_TIME = 20 * 60;
  const [secondsLeft, setSecondsLeft] = useState(TOTAL_TIME);
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    let interval = null;

    if (isActive && secondsLeft > 0) {
      interval = setInterval(() => {
        setSecondsLeft((prev) => prev - 1);
      }, 1000);
    } else if (secondsLeft === 0) {
      clearInterval(interval);
      setIsActive(false);
      alert("Tu peux aller chercher ta yanga bb");
    }

    return () => clearInterval(interval);
  }, [isActive, secondsLeft]);

  const formatTime = (timeInSeconds) => {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = timeInSeconds % 60;
    return `${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
  };

  const toggleTimer = () => setIsActive(!isActive);
  const resetTimer = () => {
    setIsActive(false);
    setSecondsLeft(TOTAL_TIME);
  };

  return (
    <Screen>
      <View style={styles.background}>
        <View>
          <Text style={styles.RootineTitle}>Vos Compléments</Text>
        </View>
        <View>
          <FlatList
            style={{
              width: "100%",
              padding: 20,
              backgroundColor: "#f9fcf8",
            }}
            data={ComplementsData}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ paddingBottom: 230 }}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => <ListComplements item={item} />}
            ItemSeparatorComponent={() => <ListItemSeparator />}
            ListHeaderComponent={() => (
              <TouchableOpacity
                style={styles.creer}
                onPress={() => router.push("/complements/creation")}
              >
                <View style={styles.creerContent}>
                  <FontAwesome5 name="plus" size={16} color={colors.baogreen} />
                  <Text style={styles.creerText}>Ajouter un Complement</Text>
                </View>
              </TouchableOpacity>
            )}
          />
          {/* <View style={styles.yangaButton}>
            <TouchableOpacity onPress={toggleTimer}>
              <Text>{isActive ? "Pause" : "Démarrer le timer"}</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={resetTimer}>
              <Text>Réinitialiser</Text>
            </TouchableOpacity>
            <Text>Temps restant : {formatTime(secondsLeft)}</Text>
          </View> */}
        </View>
        <Picker />
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    backgroundColor: "#f9fcf8",
  },
  RootineTitle: {
    fontSize: 40,
    fontWeight: 800,
    marginLeft: 20,
    marginTop: 20,
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
  yangaButton: {
    position: "absolute",
    bottom: 200,
    left: 20,
    right: 20,
    backgroundColor: colors.baogreen,
    paddingVertical: 15,
    borderRadius: 30,
    alignItems: "center",
  },
});
