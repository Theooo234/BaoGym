import Entypo from "@expo/vector-icons/Entypo";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import { useRouter } from "expo-router";
import { useState } from "react";
import {
    Pressable,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";
import Modal from "react-native-modal";
import Separation from "../components/Separation.js";
import colors from "../config/color.js";
import { useRootine } from "../hooks/useRootine.jsx";

export default function CreerRootine() {
  const router = useRouter();
  const { addRootine, rootine, setRootine, exercices } = useRootine();
  const [loading, setLoading] = useState(false);
  const [isModalVisible, setModalVisible] = useState(false);

  console.log("rootine", rootine);

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  const handlesubmit = async (e) => {
    e.preventDefault();
    //faire la validation des champs
    if (!rootine.nom || !rootine.duree || !rootine.jour) {
      alert("Veuillez remplir tous les champs");
      return;
    }

    console.log("Création de la rootine:", rootine);
    await addRootine();

    console.log("Rootine créée ?");

    router.dismiss();
  };
  //   const { evenements } = useEvent();
  console.log("===== CreerRootine ====", rootine);

  return (
    <>
      <Modal isVisible={isModalVisible} style={{ margin: 0 }}>
        <Pressable style={styles.modalOverlay} onPress={toggleModal}>
          <View
            style={{
              backgroundColor: "white",
              borderRadius: 20,
              justifyContent: "center",
              alignItems: "center",
              maxHeight: "40%",
            }}
          >
            <ScrollView
              showsVerticalScrollIndicator={false}
              style={styles.ScrollView}
            >
              <Pressable
                style={styles.modalOption}
                onPress={() => {
                  setRootine({ ...rootine, jour: "Lundi" });
                  toggleModal();
                }}
              >
                <Text style={styles.modalText}>Lundi</Text>
                <Separation />
              </Pressable>
              <Pressable
                style={styles.modalOption}
                onPress={() => {
                  setRootine({ ...rootine, jour: "Mardi" });
                  toggleModal();
                }}
              >
                <Text style={styles.modalText}>Mardi</Text>
                <Separation />
              </Pressable>
              <Pressable
                style={styles.modalOption}
                onPress={() => {
                  setRootine({ ...rootine, jour: "Mercredi" });
                  toggleModal();
                }}
              >
                <Text style={styles.modalText}>Mercredi</Text>
                <Separation />
              </Pressable>
              <Pressable
                style={styles.modalOption}
                onPress={() => {
                  setRootine({ ...rootine, jour: "Jeudi" });
                  toggleModal();
                }}
              >
                <Text style={styles.modalText}>Jeudi</Text>
                <Separation />
              </Pressable>
              <Pressable
                style={styles.modalOption}
                onPress={() => {
                  setRootine({ ...rootine, jour: "Vendredi" });
                  toggleModal();
                }}
              >
                <Text style={styles.modalText}>Vendredi</Text>
                <Separation />
              </Pressable>
              <Pressable
                style={styles.modalOption}
                onPress={() => {
                  setRootine({ ...rootine, jour: "Samedi" });
                  toggleModal();
                }}
              >
                <Text style={styles.modalText}>Samedi</Text>
                <Separation />
              </Pressable>
              <Pressable
                style={styles.modalOption}
                onPress={() => {
                  setRootine({ ...rootine, jour: "Dimanche" });
                  toggleModal();
                }}
              >
                <Text style={styles.modalText}>Dimanche</Text>
                <Separation />
              </Pressable>
            </ScrollView>

            <Pressable style={styles.modalCloseButton} onPress={toggleModal}>
              <Text style={styles.modalCloseText}> Selectionner </Text>
            </Pressable>
          </View>
        </Pressable>
      </Modal>
      <View style={styles.container}>
        <Pressable style={styles.icon} onPress={() => router.back()}>
          <Entypo name="chevron-left" size={24} color="black" />
        </Pressable>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>Créer une Rootine</Text>
        </View>

        <View style={[styles.ajoutContainer]}>
          <Pressable style={styles.creerContent} onPress={handlesubmit}>
            <Text style={styles.ajoutText}>Créer la Rootine</Text>
          </Pressable>
        </View>
        <View style={styles.card}>
          <Text style={styles.label}>NOM DE LA SÉANCE</Text>
          <TextInput
            style={styles.input}
            placeholder="Ex: Séance Jambes"
            placeholderTextColor="#94A3B8"
            value={rootine.nom}
            onChangeText={(text) => {
              setRootine({ ...rootine, nom: text });
            }}
          />

          <Text style={[styles.label, { marginTop: 15 }]}>DURÉE ESTIMÉE</Text>
          <TextInput
            style={styles.input}
            placeholder="Ex: 1h 00min"
            placeholderTextColor="#94A3B8"
            value={rootine.duree}
            onChangeText={(text) => {
              setRootine({ ...rootine, duree: text });
            }}
          />

          <Text style={[styles.label, { marginTop: 15 }]}>JOUR </Text>
          <Pressable
            style={styles.input}
            placeholder="Ex: Lundi"
            onPress={toggleModal}
          >
            <Text
              style={[
                styles.inputText,
                { color: rootine.jour ? "#0F172A" : "#94A3B8" },
              ]}
            >
              {rootine.jour || "Sélectionner un jour"}
            </Text>
          </Pressable>
        </View>

        <View>
          <Text style={[styles.titleSection, { marginTop: 15 }]}>
            Exercices ({exercices.length})
          </Text>
          <View style={[styles.card, { marginTop: 0 }]}>
            {/* {exercices == null || exercices.length === 0 ? ()} */}
            <TouchableOpacity
              style={styles.creer}
              onPress={() => router.push("/rootine/add")}
            >
              <View style={styles.creerContent} type="submit">
                <FontAwesome5 name="plus" size={16} color={colors.baogreen} />
                <Text style={styles.creerText}>Ajouter un Exercice</Text>
              </View>
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
  modalText: {
    fontSize: 16,
    fontWeight: "500",
    color: "#0F172A",
    fontFamily: "Inter",
    marginVertical: 10,
  },
  button: {
    backgroundColor: colors.baogreen,
    padding: 12,
    borderRadius: 15,
    borderStyle: "solid",
    borderColor: colors.baogreen,
    borderWidth: 1,
    alignItems: "center",
    marginTop: 20,
  },
  inputText: {
    fontSize: 16,
    fontWeight: "bold",
  },
  modalCloseText: {
    color: colors.white,
    fontSize: 16,
    fontWeight: "500",
    marginTop: 10,
    backgroundColor: colors.baogreen,
    paddingVertical: 15,
    paddingHorizontal: 50,
    borderRadius: 10,
  },
  modalCloseButton: {
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 20,
  },
  modalOverlay: {
    backgroundColor: "transparent",
    flex: 1,
    justifyContent: "flex-end",
    width: "100%",
  },
  modalOption: {
    padding: 15,
    width: "100%",
    alignItems: "center",
  },
  ScrollView: {
    width: "100%",
  },
});
