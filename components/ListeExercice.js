import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import { useRouter } from "expo-router";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { SvgXml } from "react-native-svg";
import colors from "../config/color.js";

export default function ListeExercice({ item }) {
  const router = useRouter();
  const MyIcon = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="yes" stroke="${colors.white}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
  <path d="M5 12h11" />
  <path d="M13 6l6 6-6 6" />
</svg>`;

  //   const subTitle = `${item.date} at ${item.horaire} - ${item.ville} - ${item.typeEvenement}`;

  return (
    <>
      <View style={styles.container}>
        <TouchableOpacity
          style={styles.grosbutton}
          activeOpacity={0.5}
          onPress={() => router.push(`/rootine/${item.id}/details`)}
        >
          <View style={styles.textContainer}>
            <Text style={styles.icon}>
              <FontAwesome6 name="dumbbell" size={24} color="#65A30D" />
            </Text>
            <Text style={styles.title}>{item.nom}</Text>
            <Text style={styles.edit}>...</Text>
            <Text style={styles.subTitle}>
              {item.duréeEstimée} - {item.jourPrévu}
            </Text>
            <Text style={styles.description}>{item.description}</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          activeOpacity={0.5}
          onPress={() => router.push(`/rootine/${item.id}/start`)}
        >
          <View style={styles.buttonContent}>
            <Text style={styles.textButton}>Commencer la eeRootine</Text>
            <SvgXml
              xml={MyIcon}
              width={20}
              height={20}
              style={{ marginLeft: 8 }}
            />
          </View>
        </TouchableOpacity>
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
  button: {
    backgroundColor: colors.baogreen,
    padding: 12,
    borderRadius: 50,
    borderStyle: "solid",
    borderColor: colors.baogreen,
    borderWidth: 1,
    alignItems: "center",
    margin: 20,
    marginTop: 0,
  },
  edit: {
    position: "absolute",
    top: 10,
    right: 20,
    fontSize: 24,
    color: colors.slate,
  },
  textButton: {
    color: colors.white,
    fontSize: 16,
    fontWeight: "700",
  },
  buttonContent: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
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
});
