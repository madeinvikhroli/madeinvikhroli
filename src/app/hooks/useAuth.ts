import { useContext } from "react";
import { AuthContext } from "../ui/components/context/AuthProvider";

const useAuth = () => {
  const context = useContext(AuthContext);
  if (!AuthContext) {
    throw new Error("useAuth must be used within a AuthProvider");
  }
  return context;
};

export default useAuth;
