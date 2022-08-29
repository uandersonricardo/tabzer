import React, { useContext } from "react";

import {
  Avatar,
  Box,
  Button,
  Container,
  Flex,
  Image,
  Menu,
  MenuButton,
  MenuDivider,
  MenuGroup,
  MenuItem,
  MenuList
} from "@chakra-ui/react";
import { Link } from "react-router-dom";

import logo from "../../../assets/logo.svg";
import { AuthContext } from "../../../contexts/Auth";

const Header: React.FC = () => {
  const { isAuthenticated, user, signOut } = useContext(AuthContext);

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
          <Menu>
            <MenuButton title={user?.name}>
              <Avatar name={user?.name} h="10" w="10" />
            </MenuButton>
            <MenuList>
              <Link to="/editor">
                <MenuItem>Nova tablatura</MenuItem>
              </Link>
              <MenuDivider />
              <MenuItem color="red.500" onClick={signOut}>
                Sair
              </MenuItem>
            </MenuList>
          </Menu>
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
