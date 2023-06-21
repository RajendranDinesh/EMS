import styled from "styled-components";
import { AccountBox } from "./index";

const AppContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content:center;
  align-items:center;
  `

  const Contain = styled.div`
  height: 100vh;
  background-color: #010001
`

const Login = () => {
    return (
<Contain>
        <AppContainer>
      <AccountBox />
    </AppContainer>
</Contain>);
    }

export default Login;

