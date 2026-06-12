import Entypo from "@expo/vector-icons/Entypo";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import DateTimePicker from "@react-native-community/datetimepicker";
import { useRouter } from "expo-router";
import { useState } from "react";
import {
  Image,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import Modal from "react-native-modal";
import colors from "../config/color.js";
import { useRootine } from "../hooks/useRootine.jsx";

const createMidnightDate = () => {
  const midnight = new Date();
  midnight.setHours(0, 0, 0, 0);
  return midnight;
};

export default function CreerRootine({ onChangeTime }) {
  const router = useRouter();
  const { addRootine, rootine, setRootine, exercices, updateExercice } =
    useRootine();
  const [isModalVisible, setModalVisible] = useState(false);

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  const goBackToRootines = () => {
    if (router.canGoBack()) {
      router.back();
      return;
    }

    router.replace("/home/rootines");
  };

  const handlesubmit = async () => {
    //faire la validation des champs
    if (!rootine.nom || !rootine.duree || !rootine.jour) {
      alert("Veuillez remplir tous les champs");
      return;
    }

    await addRootine();
    goBackToRootines();
  };
  //   const { evenements } = useEvent();

  const [date, setDate] = useState(createMidnightDate);
  const [show, setShow] = useState(false);

  const onChange = (event, selectedDate) => {
    // Sur Android, on ferme le dialog tout de suite après la sélection
    if (Platform.OS === "android") {
      setShow(false);
    }

    if (selectedDate) {
      setDate(selectedDate);
      onChangeTime?.(formatTime(selectedDate));
      setRootine((rootine) => ({
        ...rootine,
        duree: formatTime(selectedDate),
      }));
    }
  };

  // Formater l'heure proprement (ex: 08:05)
  const formatTime = (dateToFormat) => {
    const hours = dateToFormat.getHours().toString().padStart(2, "0");
    const minutes = dateToFormat.getMinutes().toString().padStart(2, "0");
    return `${hours}:${minutes}`;
  };

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
                <View
                  style={{
                    backgroundColor: "#E2E8F0",
                    width: "50%",
                    height: 1.5,
                    alignSelf: "center",
                  }}
                />
              </Pressable>
              <Pressable
                style={styles.modalOption}
                onPress={() => {
                  setRootine({ ...rootine, jour: "Mardi" });
                  toggleModal();
                }}
              >
                <Text style={styles.modalText}>Mardi</Text>
                <View
                  style={{
                    backgroundColor: "#E2E8F0",
                    width: "50%",
                    height: 1.5,
                    alignSelf: "center",
                  }}
                />
              </Pressable>
              <Pressable
                style={styles.modalOption}
                onPress={() => {
                  setRootine({ ...rootine, jour: "Mercredi" });
                  toggleModal();
                }}
              >
                <Text style={styles.modalText}>Mercredi</Text>
                <View
                  style={{
                    backgroundColor: "#E2E8F0",
                    width: "50%",
                    height: 1.5,
                    alignSelf: "center",
                  }}
                />
              </Pressable>
              <Pressable
                style={styles.modalOption}
                onPress={() => {
                  setRootine({ ...rootine, jour: "Jeudi" });
                  toggleModal();
                }}
              >
                <Text style={styles.modalText}>Jeudi</Text>
                <View
                  style={{
                    backgroundColor: "#E2E8F0",
                    width: "50%",
                    height: 1.5,
                    alignSelf: "center",
                  }}
                />
              </Pressable>
              <Pressable
                style={styles.modalOption}
                onPress={() => {
                  setRootine({ ...rootine, jour: "Vendredi" });
                  toggleModal();
                }}
              >
                <Text style={styles.modalText}>Vendredi</Text>
                <View
                  style={{
                    backgroundColor: "#E2E8F0",
                    width: "50%",
                    height: 1.5,
                    alignSelf: "center",
                  }}
                />
              </Pressable>
              <Pressable
                style={styles.modalOption}
                onPress={() => {
                  setRootine({ ...rootine, jour: "Samedi" });
                  toggleModal();
                }}
              >
                <Text style={styles.modalText}>Samedi</Text>
                <View
                  style={{
                    backgroundColor: "#E2E8F0",
                    width: "50%",
                    height: 1.5,
                    alignSelf: "center",
                  }}
                />
              </Pressable>
              <Pressable
                style={styles.modalOption}
                onPress={() => {
                  setRootine({ ...rootine, jour: "Dimanche" });
                  toggleModal();
                }}
              >
                <Text style={styles.modalText}>Dimanche</Text>
                <View
                  style={{
                    backgroundColor: "#E2E8F0",
                    width: "50%",
                    height: 1.5,
                    alignSelf: "center",
                  }}
                />
              </Pressable>
            </ScrollView>

            <Pressable style={styles.modalCloseButton} onPress={toggleModal}>
              <Text style={styles.modalCloseText}> Selectionner </Text>
            </Pressable>
          </View>
        </Pressable>
      </Modal>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.avoidingView}
      >
        <View style={styles.container}>
          <Pressable style={styles.icon} onPress={goBackToRootines}>
            <Entypo name="chevron-left" size={24} color="black" />
          </Pressable>
          <View style={styles.titleContainer}>
            <Text style={styles.title}>Créer une Rootine</Text>
          </View>

          <View style={[styles.ajoutContainer]}>
            <Pressable
              style={styles.creerContent}
              onPress={() => {
                handlesubmit();
              }}
            >
              <Text style={styles.ajoutText}>Créer la Rootine</Text>
            </Pressable>
          </View>
          <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ paddingBottom: 130 }}
          >
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

              {/* <Text style={[styles.label, { marginTop: 15 }]}>DURÉE ESTIMÉE</Text>
            <Pressable
              style={styles.input}
              placeholder="Ex: 1h 00min"
              placeholderTextColor="#94A3B8"
              value={rootine.duree}
              onChangeText={(text) => {
                setRootine({ ...rootine, duree: text });
              }}
            >
              <Text
                style={[
                  styles.inputText,
                  { color: rootine.jour ? "#0F172A" : "#94A3B8" },
                ]}
              >
                {rootine.jour || "Sélectionner une durée estimée"}
              </Text>
            </Pressable> */}

              <StatusBar barStyle="dark-content" />

              <View style={styles.inputContainer}>
                <Text style={[styles.label, { marginTop: 15 }]}>
                  DURÉE ESTIMÉE
                </Text>
                <Pressable
                  style={styles.input}
                  placeholderTextColor="#94A3B8"
                  onPress={() => setShow(true)}
                >
                  <Text style={styles.inputText}> {formatTime(date)} </Text>
                </Pressable>

                {/* LE PICKER NATIF */}
                {show && (
                  <View
                    style={
                      Platform.OS === "ios"
                        ? styles.iosPickerContainer
                        : styles.androidPickerContainer
                    }
                  >
                    {Platform.OS === "ios" && (
                      <TouchableOpacity
                        style={styles.iosCloseButton}
                        onPress={() => setShow(false)}
                      >
                        <Text style={styles.iosCloseButtonText}>OK</Text>
                      </TouchableOpacity>
                    )}
                    <View style={styles.iosPickerTitleContainer}>
                      <Text style={styles.iosPickerTitle}>
                        Choisissez une durée
                      </Text>
                    </View>

                    <View
                      style={
                        Platform.OS === "ios" ? styles.iosPickerWindow : null
                      }
                    >
                      <DateTimePicker
                        value={date}
                        mode="time"
                        is24Hour={true}
                        display={Platform.OS === "ios" ? "spinner" : "default"}
                        onChange={onChange}
                        textColor="#1F2937" // iOS uniquement
                        style={Platform.OS === "ios" ? styles.iosPicker : null}
                      />
                    </View>
                  </View>
                )}
              </View>

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
                {exercices == null || exercices.length === 0 ? (
                  <View>
                    <Text
                      style={{
                        color: "#64748B",
                        fontSize: 16,
                        textAlign: "center",
                        marginBottom: 10,
                      }}
                    >
                      Aucun exercice ajouté pour le moment
                    </Text>
                    <View
                      style={{
                        backgroundColor: "#E2E8F0",
                        width: "70%",
                        height: 2,
                        alignSelf: "center",
                      }}
                    />
                  </View>
                ) : (
                  exercices.map((item, index) => (
                    <View
                      key={`${item.id}-${index}`}
                      style={{
                        backgroundColor: "#F1F5F9",
                        borderRadius: 16,
                        padding: 16,
                        marginBottom: 10,
                        alignItems: "center",
                      }}
                    >
                      <Image
                        style={styles.exerciceImage}
                        source={{ uri: item.image }}
                        resizeMode="contain"
                      />
                      <Text style={{ fontSize: 16, fontWeight: "bold" }}>
                        {item.nom}
                      </Text>
                      <Text style={{ color: "#64748B", marginTop: 4 }}>
                        {item.nbr_serie} séries x {item.nbr_rep} reps
                      </Text>

                      <View style={styles.inputContainerBigBoss}>
                        <View style={styles.inputExoContainer}>
                          <Text style={styles.inputExoText}>Séries :</Text>
                          <TextInput
                            key={`serie-${item.id}`}
                            style={styles.inputExo}
                            placeholder="0"
                            placeholderTextColor="#94A3B8"
                            value={item.nbr_serie?.toString() || ""}
                            onChangeText={(text) => {
                              updateExercice(item.id, {
                                nbr_serie: text,
                              });
                            }}
                          />
                        </View>
                        <View style={styles.inputExoContainer}>
                          <Text style={styles.inputExoText}>Reps :</Text>
                          <TextInput
                            key={item.id}
                            style={styles.inputExo}
                            placeholder="0"
                            placeholderTextColor="#94A3B8"
                            value={item.nbr_rep?.toString() || ""}
                            onChangeText={(text) => {
                              updateExercice(item.id, {
                                nbr_rep: text,
                              });
                            }}
                          />
                        </View>
                        <View style={styles.inputExoContainer}>
                          <Text style={styles.inputExoText}>Poids :</Text>
                          <TextInput
                            key={`${item.id}-poids`}
                            style={styles.inputExo}
                            placeholder="0"
                            placeholderTextColor="#94A3B8"
                            value={item.poids?.toString() || ""}
                            onChangeText={(text) => {
                              updateExercice(item.id, { poids: text });
                            }}
                          />
                        </View>
                      </View>
                    </View>
                  ))
                )}

                <TouchableOpacity
                  style={styles.creer}
                  onPress={() => router.push("/rootine/add")}
                >
                  <View style={styles.creerContent} type="submit">
                    <FontAwesome5
                      name="plus"
                      size={16}
                      color={colors.baogreen}
                    />
                    <Text style={styles.creerText}>Ajouter un Exercice</Text>
                  </View>
                </TouchableOpacity>
              </View>
            </View>
          </ScrollView>
        </View>
      </KeyboardAvoidingView>
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
    zIndex: 10,
    borderWidth: 1,
    borderColor: "#E2E8F0",
  },
  titleContainer: {
    position: "absolute",
    top: 42,
    left: 0,
    right: 0,
    minHeight: 75,
    flexDirection: "column",
    alignItems: "flex-start",
    backgroundColor: "#f9fcf8",
    zIndex: 2,
    elevation: 2,
    justifyContent: "center",
    paddingLeft: 85,
    paddingRight: 20,
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
    marginBottom: 15,
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
  // -- STYLES SPECIFIQUES POUR IOS (Car iOS affiche le spinner directement dans l'écran) --
  iosPickerContainer: {
    position: "absolute",
    top: 32,
    left: 0,
    right: 0,
    backgroundColor: "white",
    height: 150,
    width: "100%",
    borderRadius: 16,
    // borderTopRightRadius: 24,
    zIndex: 9999,
    borderWidth: 1,
    borderColor: "#E2E8F0",
  },
  androidPickerContainer: {
    position: "absolute",
    top: 45,
    left: 0,
    right: 0,
    zIndex: 9999,
  },
  iosPickerWindow: {
    height: 102,
    overflow: "hidden",
    justifyContent: "center",
  },
  iosPicker: {
    height: 90,
    alignSelf: "center",
  },
  iosCloseButton: {
    alignSelf: "flex-end",
    padding: 16,
  },
  iosCloseButtonText: {
    color: colors.baogreen,
    fontWeight: "700",
    fontSize: 16,
    right: 10,
  },
  iosPickerTitleContainer: {
    position: "absolute",
    top: 16,
    left: 16,
  },
  iosPickerTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: colors.baogreen,
  },
  inputContainer: {
    width: "100%",
    position: "relative",
    zIndex: 9999,
  },
  inputExoContainer: { width: "30%", alignItems: "center" },
  inputExo: {
    borderWidth: 1,
    borderColor: "#E2E8F0",
    borderRadius: 16,
    padding: 16,
    fontSize: 16,
    fontWeight: "bold",
    color: "#0F172A",
    backgroundColor: "white",
    width: "100%",
    marginTop: 0,
    textAlign: "center",
  },
  inputExoText: {
    fontSize: 10,
    fontWeight: "bold",
    color: "#64748B",
    marginBottom: 6,
    letterSpacing: 1,
    marginTop: 15,
  },
  inputContainerBigBoss: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    position: "relative",
    zIndex: 9999,
  },
  avoidingView: {
    flex: 1,
  },
});
