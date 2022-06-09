import { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { AuthGoogleContext } from "../contexts/authGoogle";

export const PrivateRoutes = (): JSX.Element => {
  const { signed } = useContext(AuthGoogleContext);
  console.log(signed);
  return signed ? <Outlet /> : <Navigate to="/" />;
};
