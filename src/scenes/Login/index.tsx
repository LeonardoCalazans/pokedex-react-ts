import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthGoogleContext } from "../../contexts/authGoogle";
import { Wrapper, Button, Title } from "./styles";

const Login = () => {
  const { signInGoogle, signed } = useContext(AuthGoogleContext);
  
  const handleLoginFromGoogle = async () => {
    await signInGoogle();
  };

  if (!signed) {
    return (
      <Wrapper>
        <Title>
          Bem vindo ao Pokedex com deploy automatizado com o firebase
        </Title>
        <Button onClick={handleLoginFromGoogle}>Logar com o Google</Button>
      </Wrapper>
    );
  }

  return <Navigate to="/Home" />;
};

export default Login;
