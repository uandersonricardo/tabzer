import React from "react";

import { Box } from "@chakra-ui/react";
import { Outlet } from "react-router-dom";

import Header from "../Header";

const Layout: React.FC = () => (
  <>
    <Header />
    <Box as="main" flex="auto">
      <Outlet />
    </Box>
  </>
);

export default Layout;
