import { useLocalSearchParams } from "expo-router";
import CurrentRootine from "../../../screens/CurrentRootine";

const Index = () => {
  const local = useLocalSearchParams();


  return (
  <CurrentRootine id={local.id} />
  )
}

export default Index;

