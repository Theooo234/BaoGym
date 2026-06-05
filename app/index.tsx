import { Link } from "expo-router";
import { Text, View } from "react-native";

export default function Index() {
  // return <EventInfo />;

  return (
    // <Redirect href="/home" />
    <View
      style={{
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        gap: 20,
      }}
    >
      <Text>Index</Text>
      <Link href={"/home"} push asChild>
        <Text>Go to home</Text>
      </Link>
      <Link href={"/rootine/add"} push asChild>
        <Text>Go to exercices</Text>
      </Link>
      <Link href={"/auth/login"} push asChild>
        <Text>Go to login</Text>
      </Link>
    </View>
  );
}
