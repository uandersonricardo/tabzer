import React, { useContext } from "react";

import { Box, Button, Container, Flex, Image } from "@chakra-ui/react";
import { Link } from "react-router-dom";

import logo from "../../../assets/logo.svg";
import { AuthContext } from "../../../contexts/Auth";

const Header: React.FC = () => {
  const { isAuthenticated, signOut } = useContext(AuthContext);

  return (
    <Box
      as="header"
      h="16"
      borderBottom="1px solid"
      borderBottomColor="gray.100"
    >
      <Container
        maxW="7xl"
        h="full"
        px={{ base: "6", md: "12" }}
        display="flex"
        alignItems="center"
        justifyContent="space-between"
      >
        <Link to="/">
          <Image src={logo} alt="Logo" h="10" />
        </Link>
        {isAuthenticated ? (
          <Button colorScheme="gray" onClick={signOut} size="sm">
            Sair
          </Button>
        ) : (
          <Link to="/signin">
            <Button colorScheme="blue" size="sm">
              Entrar
            </Button>
          </Link>
        )}
      </Container>
    </Box>
  );
};

export default Header;
