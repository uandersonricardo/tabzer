import React, { useContext } from "react";

import { Button, Flex } from "@chakra-ui/react";
import { Link } from "react-router-dom";

import { AuthContext } from "../../contexts/Auth";

const Home: React.FC = () => {
  const { isAuthenticated, signOut } = useContext(AuthContext);

  return (
    <Flex w="100vw" h="100vh" align="center" justify="center">
      {isAuthenticated ? (
        <Button colorScheme="blue" onClick={signOut}>
          Sair
        </Button>
      ) : (
        <Link to="/signin">
          <Button colorScheme="blue">Entrar</Button>
        </Link>
      )}
    </Flex>
  );
};

export default Home;
