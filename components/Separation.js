import { StyleSheet, View } from "react-native";

export default function ListItemSeparator() {
  return <View style={styles.separation} />;
}

const styles = StyleSheet.create({
  separation: {
    height: 1.5,
    backgroundColor: "rgb(76, 76, 77)",
    marginHorizontal: 45,
  },
});
