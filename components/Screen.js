import { StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

function Screen({ children }) {
  return (
    /* 1. On ajoute la propriété edges pour bloquer uniquement le haut ("top") */
    <SafeAreaView edges={["top"]} style={styles.screen}>
      {children}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: {
    backgroundColor: "#f9fcf8",
    flex: 1,
  },
});

export default Screen;
