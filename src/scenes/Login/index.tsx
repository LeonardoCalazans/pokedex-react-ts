import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthGoogleContext } from "../../contexts/authGoogle";
import { Wrapper, Button, Title, Content } from "./styles";

const Login = () => {
  const { signInGoogle, signed } = useContext(AuthGoogleContext);
  
  const handleLoginFromGoogle = async () => {
    await signInGoogle();
  };

  if (!signed) {
    return (
      <Wrapper>
        <Content>
          <Title>
            Bem vindo ao Pokedex com deploy automatizado com o firebase
          </Title>
          <Button onClick={handleLoginFromGoogle}>
              Logar com o Google
          </Button>
        </Content>
      </Wrapper>
    );
  }

  return <Navigate to="/home" />;
};

export default Login;
