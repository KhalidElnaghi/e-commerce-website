import { useContext } from "react";
import { AuthContext } from "../../Contexts/AuthContext";
import { Navigate } from "react-router-dom";

export default function ProtectedAuth({ children }) {
  let { isUserLoggedIn } = useContext(AuthContext);

  if (!isUserLoggedIn) {
    return children;
  } else {
    return <Navigate to={"/home"} />;
  }
}
