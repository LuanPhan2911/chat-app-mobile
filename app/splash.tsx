import { useAuth } from "@/contexts/auth-context";
import { SplashScreen } from "expo-router";

SplashScreen.preventAutoHideAsync();

const SplashScreenController = () => {
  const { isLoading } = useAuth();
  if (!isLoading) {
    SplashScreen.hide();
  }
  return null;
};

export default SplashScreenController;
