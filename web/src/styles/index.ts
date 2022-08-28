import { extendTheme } from "@chakra-ui/react";

const theme = extendTheme({
  config: {
    useSystemColorMode: false,
    initialColorMode: "light"
  },
  styles: {
    global: {
      "html, body, #root": {
        width: "100%",
        height: "100%"
      },
      "#root": {
        display: "flex",
        flexDirection: "column"
      }
    }
  },
  fonts: {
    body: "Inter, system-ui, sans-serif",
    heading: "Inter, system-ui, sans-serif",
    mono: "Menlo, monospace"
  }
});

export default theme;
