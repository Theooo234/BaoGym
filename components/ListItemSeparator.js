import { StyleSheet, View } from "react-native";

const styles = StyleSheet.create({
  separator: {
    height: 1,
    backgroundColor: "#F1F5F9",
    width: "100%",
  },
});

export default function ListItemSeparator() {
  return <View style={styles.separator} />;
}
