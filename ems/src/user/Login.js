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
  background-color: #e5e5f7;
background-size: 15px 15px;
background-image: repeating-linear-gradient(45deg, #f7b045 0, #f7b045 1.5px, #e5e5f7 0, #e5e5f7 50%);
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

