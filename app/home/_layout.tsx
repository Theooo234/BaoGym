import { DefaultTheme, ThemeProvider } from "@react-navigation/native";
import { Icon, Label, NativeTabs } from "expo-router/unstable-native-tabs";
import colors from "../../config/color";
import { RootineProvider } from "../../provider/RootineProvider.jsx";

export default function AppLayout() {
  return (
    <RootineProvider>
      <ThemeProvider value={DefaultTheme}>
        <NativeTabs tintColor={colors.baogreen}>
          <NativeTabs.Trigger name="rootines">
            <Icon sf="dumbbell.fill" drawable="ic_menu_book" />
            <Label>Rootines</Label>
          </NativeTabs.Trigger>
          <NativeTabs.Trigger name="complements">
            <Icon sf="waterbottle" drawable="ic_menu_account" />
            <Label>Compléments</Label>
          </NativeTabs.Trigger>
          <NativeTabs.Trigger name="profil">
            <Icon sf="person.fill" drawable="ic_menu_account" />
            <Label>Profil</Label>
          </NativeTabs.Trigger>
        </NativeTabs>
      </ThemeProvider>
    </RootineProvider>
  );
}
