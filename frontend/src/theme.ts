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
      "danger-text-color": "#F85149",
      "danger-text-hover": "white",
      "date-time-color": "#B7B5B5",
      "paragraph-color": "#1A2744",
      "nav-btn-hover-bg": "#f9f6fd",
      "menu-hover-bg": "#317CEC",
      "menu-hover-text": "white",
      "menu-hover-border": "#317CEC",
      "menu-active-bg": "#317CEC",
      "card-bg": "#FAFAFA",
      "btn-bg": "#317CEC",
      "btn-hover-bg": "#0A56C8",
      "btn-danger": "#F85149",
    },
    dark: {
      "bg-default": "#232323",
      "bg-color": "#282829",
      "border-color": "#373434",
      "text-color": "white",
      "low-text-color": "#978D8D",
      "danger-text-color": "#F85149",
      "danger-text-hover": "white",
      "date-time-color": "#B7B5B5",
      "paragraph-color": "#FFFFFF",
      "nav-btn-hover-bg": "#4C4C4C",
      "menu-hover-bg": "#317CEC",
      "menu-hover-text": "white",
      "menu-hover-border": "#317CEC",
      "menu-active-bg": "#317CEC",
      "card-bg": "#232323",
      "btn-bg": "#317CEC",
      "btn-hover-bg": "#0A56C8",
      "btn-danger": "#F85149",
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
    "danger-text-color": {
      default: tokens.colors.light["danger-text-color"],
      _dark: tokens.colors.dark["danger-text-color"],
    },
    "danger-text-hover": {
      default: tokens.colors.light["danger-text-hover"],
      _dark: tokens.colors.dark["danger-text-hover"],
    },
    "date-time-color": {
      default: tokens.colors.light["date-time-color"],
      _dark: tokens.colors.dark["date-time-color"],
    },
    "paragraph-color": {
      default: tokens.colors.light["paragraph-color"],
      _dark: tokens.colors.dark["paragraph-color"],
    },
    "nav-btn-hover-bg": {
      default: tokens.colors.light["nav-btn-hover-bg"],
      _dark: tokens.colors.dark["nav-btn-hover-bg"],
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
    "btn-bg": {
      default: tokens.colors.light["btn-bg"],
      _dark: tokens.colors.dark["btn-bg"],
    },
    "btn-hover-bg": {
      default: tokens.colors.light["btn-hover-bg"],
      _dark: tokens.colors.dark["btn-hover-bg"],
    },
    "btn-danger": {
      default: tokens.colors.light["btn-danger"],
      _dark: tokens.colors.dark["btn-danger"],
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
