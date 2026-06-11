import { ActivityIndicator, View } from "react-native";
import colors from "../config/color.js";

export default function LoadingScreen() {
  return (
    <View>
      {/* C'est cette ligne qui affiche la roue de chargement */}
      <ActivityIndicator size="large" color={colors.baogreen} />
    </View>
  );
}
