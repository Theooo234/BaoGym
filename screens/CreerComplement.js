import { StyleSheet, Text, TextInput, View } from "react-native";
import Screen from "../components/Screen.js";

export default function CreerComplement() {
  return (
    <Screen>
      <View style={styles.background}>
        <Text style={styles.title}>Nouveau Complement</Text>

        <View style={styles.inputContainer}>
          <Text style={styles.nom}>Nom du complément :</Text>
          <TextInput
            style={styles.input}
            placeholder="Entrez votre nom"
            placeholderTextColor="#999"
            // value={username}
            // onChangeText={setUsername} // Met à jour l'état directement
          />
        </View>
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    backgroundColor: "transparent",
    // backgroundColor: "#f9fcf8",
    alignItems: "left",
    justifyContent: "flex-start",
    marginVertical: 20,
    marginHorizontal: 20,
  },
  title: {
    fontSize: 40,
    fontWeight: 800,

    backgroundColor: "green",
  },
  inputContainer: {
    backgroundColor: "red",
    alignItems: "left",
    justifyContent: "center",
  },
  nom: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
});

{
  /* <View></View>
<Text></Text> */
}
