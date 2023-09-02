import styled from "styled-components";
import { AccountBox } from "./index";
import { motion } from 'framer-motion';
import { useEffect } from "react";

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
  background-color: #0b0535;
`

const Login = () => {

    useEffect(() => {
      document.title = "Login | HAXGUZ"
    }, []);

    return (
      <>
        <motion.div
          className="container text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 2.5 }}
        >
          <Contain>
            <AppContainer>
              <AccountBox />
            </AppContainer>
          </Contain>
        </motion.div>
    </>
    );
    }

export default Login;

