import { extendTheme, ThemeConfig } from "@chakra-ui/react";

const config: ThemeConfig = {
  initialColorMode: "light",
};

const tokens = {
  colors: {
    light: {
      "bg-default": "#F4F7FE",
      "bg-color": "white",
      "border-color": "#F4F4F4",
      "text-color": "#1A2744",
      "low-text-color": "#978D8D",
      "menu-hover-bg": "#317CEC",
      "menu-hover-text": "white",
      "menu-hover-border": "#317CEC",
      "menu-active-bg": "#317CEC",
      "card-bg": "#FAFAFA",
    },
    dark: {
      "bg-default": "#232323",
      "bg-color": "#282829",
      "border-color": "#373434",
      "text-color": "white",
      "low-text-color": "#978D8D",
      "menu-hover-bg": "#317CEC",
      "menu-hover-text": "white",
      "menu-hover-border": "#317CEC",
      "menu-active-bg": "#317CEC",
      "card-bg": "#232323",
    },
  },
};

const semanticTokens = {
  colors: {
    "bg-default": {
      default: tokens.colors.light["bg-default"],
      _dark: tokens.colors.dark["bg-default"],
    },
    "bg-color": {
      default: tokens.colors.light["bg-color"],
      _dark: tokens.colors.dark["bg-color"],
    },
    "border-color": {
      default: tokens.colors.light["border-color"],
      _dark: tokens.colors.dark["border-color"],
    },
    "text-color": {
      default: tokens.colors.light["text-color"],
      _dark: tokens.colors.dark["text-color"],
    },
    "low-text-color": {
      default: tokens.colors.light["low-text-color"],
      _dark: tokens.colors.dark["low-text-color"],
    },
    "menu-hover-bg": {
      default: tokens.colors.light["menu-hover-bg"],
      _dark: tokens.colors.dark["menu-hover-bg"],
    },
    "menu-hover-text": {
      default: tokens.colors.light["menu-hover-text"],
      _dark: tokens.colors.dark["menu-hover-text"],
    },
    "menu-hover-border": {
      default: tokens.colors.light["menu-hover-border"],
      _dark: tokens.colors.dark["menu-hover-border"],
    },
    "menu-active-bg": {
      default: tokens.colors.light["menu-active-bg"],
      _dark: tokens.colors.dark["menu-active-bg"],
    },
    "card-bg": {
      default: tokens.colors.light["card-bg"],
      _dark: tokens.colors.dark["card-bg"],
    },
  },
};

const styles = {
  global: {
    body: {
      background: "bg-default",
    },
  },
};

const theme = extendTheme({ config, styles, semanticTokens });

export default theme;
