import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ component, loggedIn }) {
  return loggedIn ? component : <Navigate to="/sign-in" />;
}
