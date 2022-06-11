import { useState, createContext } from "react";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { app } from "../services/FirebaseConfig";
import { Navigate } from "react-router-dom";

const provider = new GoogleAuthProvider();

interface AuthGoogleContextData {
  signed: boolean;
  user: object | null;
  signInGoogle(): Promise<void>;
  signOut(): void;
}

interface AuthGoogleProviderProps {
  children?: React.ReactNode;
}

export const AuthGoogleContext = createContext<AuthGoogleContextData>(
  {} as AuthGoogleContextData
);

export const AuthGoogleProvider: React.FC<AuthGoogleProviderProps> = ({
  children,
}) => {
  const auth = getAuth(app);
  const [user, setUser] = useState<object | null>(() => {
    const storageUser = sessionStorage.getItem("@AuthFirebase:user");
    const storageToken = sessionStorage.getItem("@AuthFirebase:token");
    if (storageToken && storageUser) {
      return JSON.parse(storageUser);
    }
    return null;
  });

  const signInGoogle = async () => {
    try {
      const response = await signInWithPopup(auth, provider);
      const credential = GoogleAuthProvider.credentialFromResult(response);
      const token = credential?.accessToken;
      const user = response.user;
      setUser(user);
      sessionStorage.setItem("@AuthFirebase:token", JSON.stringify(token));
      sessionStorage.setItem(
        "@AuthFirebase:user",
        JSON.stringify(response.user)
      );
    } catch (error) {
      console.log(error);
    }
  };

  const signOut = async () => {
    sessionStorage.clear();
    setUser(null);
    return <Navigate to="/" />;
  };

  return (
    <AuthGoogleContext.Provider
      value={{
        signed: !!user,
        user,
        signInGoogle,
        signOut,
      }}
    >
      {children}
    </AuthGoogleContext.Provider>
  );
};
