import { NavigationContainer } from "@react-navigation/native";
import { useRoute } from "./router";

export default function App() {
  const userouter = useRoute();

  return <NavigationContainer>{userouter}</NavigationContainer>;
}
