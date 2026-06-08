import { Stack } from "expo-router";
import { RootineProvider } from "../../provider/RootineProvider.jsx";

export default function AppLayout() {
  return (
    <RootineProvider>
      <Stack
        screenOptions={{
          headerShown: false,
          animation: 'slide_from_right',
        }}
      />
    </RootineProvider>
  );
}