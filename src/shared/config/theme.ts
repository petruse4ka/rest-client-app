import { orangeColors, zincColors } from '../style';

export const lightTheme = {
  token: {
    colorPrimary: orangeColors[700],
    colorBgBase: zincColors[100],
    fontSize: 16,
  },
  components: {
    Layout: {
      headerBg: zincColors[200],
      footerBg: zincColors[200],
      bodyBg: zincColors[100],
    },
    Select: {
      activeOutlineColor: 'none',
      colorText: orangeColors[700],
      colorTextQuaternary: orangeColors[700],
      optionActiveBg: zincColors[300],
      optionSelectedColor: orangeColors[700],
      optionSelectedBg: zincColors[300],
      colorBorder: orangeColors[700],
      colorBgElevated: zincColors[200],
    },
    Dropdown: {
      colorBgElevated: zincColors[100],
      colorText: orangeColors[700],
      controlItemBgHover: zincColors[300],
    },
    Button: {
      colorText: orangeColors[700],
      primaryShadow: '0',
      primaryColor: zincColors[50],
    },
    Link: {
      colorText: orangeColors[700],
    },
    Drawer: {
      colorIcon: orangeColors[700],
      colorIconHover: orangeColors[400],
    },
  },
};

export const darkTheme = {
  token: {
    colorPrimary: orangeColors[500],
    colorBgBase: zincColors[800],
    fontSize: 16,
  },
  components: {
    Layout: {
      headerBg: zincColors[950],
      footerBg: zincColors[900],
      bodyBg: zincColors[800],
    },
    Select: {
      activeOutlineColor: 'none',
      colorText: orangeColors[500],
      colorTextQuaternary: orangeColors[500],
      optionActiveBg: zincColors[500],
      optionSelectedColor: orangeColors[500],
      optionSelectedBg: zincColors[700],
      colorBorder: orangeColors[500],
      colorBgElevated: zincColors[600],
    },
    Dropdown: {
      colorBgElevated: zincColors[600],
      colorText: orangeColors[500],
      controlItemBgHover: zincColors[500],
    },
    Button: {
      colorText: orangeColors[500],
      primaryShadow: '0',
      primaryColor: zincColors[50],
    },
    Link: {
      colorText: orangeColors[500],
    },
    Drawer: {
      colorIcon: orangeColors[500],
      colorIconHover: orangeColors[400],
    },
  },
};
