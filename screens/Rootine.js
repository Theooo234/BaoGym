import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import { useRouter } from "expo-router";
import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import ListExercices from "../components/ListeRootines.js";
import ListItemSeparator from "../components/ListItemSeparator.js";
import Screen from "../components/Screen.js";
import colors from "../config/color.js";

export const Rootines = [
  {
    id: "67",
    nom: "Séance Push",
    duréeEstimée: "1h 30min",
    jourPrévu: "Lundi",
    description:
      "Séance de musculation pour le haut du corps, axée sur les mouvements de poussée.",
    exercices: [
      {
        id: 1,
        nom: "Développé Couché",
        image:
          "https://www.docteur-fitness.com/wp-content/uploads/2019/08/developpe-couche.gif",
        series: 4,
        repetitions: 8,
      },
      {
        id: 2,
        nom: "Développé Incliné",
        image:
          "https://www.docteur-fitness.com/wp-content/uploads/2021/10/developpe-incline-barre.gif",
        series: 3,
        repetitions: 10,
      },
      {
        id: 3,
        nom: "Écartés à la Poulie",
        image:
          "https://www.docteur-fitness.com/wp-content/uploads/2000/06/ecarte-poulie-vis-a-vis-exercice-musculation-pectoraux.gif",
        series: 3,
        repetitions: 12,
      },
    ],
  },
  {
    id: "69",
    nom: "Séance Pull",
    duréeEstimée: "1h 45min",
    jourPrévu: "Mardi",
    description:
      "Séance de musculation pour le haut du corps, axée sur les mouvements de traction.",
    exercices: [
      {
        id: 4,
        nom: "Tractions",
        image:
          "https://www.docteur-fitness.com/wp-content/uploads/2022/02/traction-musculation-dos.gif",
        series: 4,
        repetitions: 10,
      },
      {
        id: 5,
        nom: "Tirage Vertical",
        image:
          "https://www.docteur-fitness.com/wp-content/uploads/2021/11/tirage-vertical-poitrine.gif",
        series: 3,
        repetitions: 10,
      },
      {
        id: 6,
        nom: "Rowing Bucheron",
        image:
          "https://www.docteur-fitness.com/wp-content/uploads/2021/08/rowing-haltere-un-bras.gif",
        series: 3,
        repetitions: 10,
      },
    ],
  },
  {
    id: "104",
    nom: "Séance Legs",
    duréeEstimée: "1h 30min",
    jourPrévu: "Mercredi",
    description:
      "Séance de musculation pour les jambes, incluant des exercices pour les quadriceps, les ischio-jambiers et les mollets.",
    exercices: [
      {
        id: 7,
        nom: "Presse à Jambes",
        image:
          "https://www.docteur-fitness.com/wp-content/uploads/2022/08/presse-a-cuisses-inclinee.gif",
        series: 4,
        repetitions: 12,
      },
      {
        id: 8,
        nom: "Leg Curl",
        image:
          "https://www.docteur-fitness.com/wp-content/uploads/2021/10/leg-curl-allonge.gif",
        series: 3,
        repetitions: 12,
      },
      {
        id: 9,
        nom: "Extension Jambes",
        image:
          "https://www.docteur-fitness.com/wp-content/uploads/2000/06/leg-extension-exercice-musculation.gif",
        series: 3,
        repetitions: 15,
      },
    ],
  },
  {
    id: "7561",
    nom: "Séance Upper",
    duréeEstimée: "1h 30min",
    jourPrévu: "Vendredi",
    description:
      "Séance de musculation pour le haut du corps, combinant des exercices de poussée et de traction.",
    exercices: [
      {
        id: 10,
        nom: "Développé Couché",
        image:
          "https://www.docteur-fitness.com/wp-content/uploads/2019/08/developpe-couche.gif",
        series: 3,
        repetitions: 12,
      },
      {
        id: 11,
        nom: "Tirage Vertical",
        image:
          "https://www.docteur-fitness.com/wp-content/uploads/2021/11/tirage-vertical-poitrine.gif",
        series: 3,
        repetitions: 10,
      },
      {
        id: 12,
        nom: "Curl Marteau",
        image:
          "https://www.docteur-fitness.com/wp-content/uploads/2022/09/curl-haltere-prise-neutre.gif",
        series: 3,
        repetitions: 12,
      },
    ],
  },
  {
    id: "54945",
    nom: "Séance Lower",
    duréeEstimée: "1h 30min",
    jourPrévu: "Samedi",
    description:
      "Séance de musculation pour les jambes, incluant des exercices pour les quadriceps, les ischio-jambiers et les mollets.",
    exercices: [
      {
        id: 13,
        nom: "Squat",
        image:
          "https://www.docteur-fitness.com/wp-content/uploads/2021/11/homme-faisant-un-squat-avec-barre.gif",
        series: 4,
        repetitions: 10,
      },
      {
        id: 14,
        nom: "Leg Curl",
        image:
          "https://www.docteur-fitness.com/wp-content/uploads/2021/10/leg-curl-allonge.gif",
        series: 3,
        repetitions: 12,
      },
      {
        id: 15,
        nom: "Mollets avec Partenaire",
        image:
          "https://www.docteur-fitness.com/wp-content/uploads/2022/10/extensions-des-mollets-avec-partenaire.gif",
        series: 3,
        repetitions: 15,
      },
    ],
  },
];

export default function Rootine() {
  const router = useRouter();

  //   const { evenements } = useEvent();

  return (
    <Screen>
      <View>
        <View>
          <Text style={styles.RootineTitle}>Vos Rootines</Text>
        </View>
        <View>
          <FlatList
            style={{
              width: "100%",
              padding: 20,
              backgroundColor: "#f9fcf8",
            }}
            data={Rootines}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ paddingBottom: 230 }}
            keyExtractor={(item) => item.id}
            //renderItem={({ item }) => <Text>{item.typeEvenement}</Text>}
            renderItem={({ item }) => <ListExercices item={item} />}
            itemSeparatorComponent={() => <ListItemSeparator />}
            ListHeaderComponent={() => (
              <TouchableOpacity
                style={styles.creer}
                onPress={() => router.push("/rootine/creation")}
              >
                <View style={styles.creerContent}>
                  <FontAwesome5 name="plus" size={16} color={colors.baogreen} />
                  <Text style={styles.creerText}>Créer une Rootine</Text>
                </View>
              </TouchableOpacity>
            )}
          />
        </View>
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
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
});
