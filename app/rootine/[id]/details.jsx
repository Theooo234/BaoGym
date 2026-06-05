import RootineInfo from "@/screens/RootineInfo";
import { useLocalSearchParams } from "expo-router";

const Index = () => {
  const local = useLocalSearchParams();


  return (
    <RootineInfo id={local.id} />
  )
}

export default Index;
