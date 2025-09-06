import { orangeColors, zincColors } from '../style';

export const lightTheme = {
  token: {
    colorPrimary: orangeColors[400],
    colorBgBase: zincColors[100],
    colorTextBase: zincColors[800],
    fontSize: 16,
    backgroundColorGradientStart: '#d1d5db',
    backgroundColorGradientEnd: '#ddd6fe',
    titleColor: orangeColors[400],
  },
  components: {
    Typography: {
      colorTextHeading: zincColors[900],
      colorTextDescription: orangeColors[300],
      colorLink: orangeColors[700],
      colorLinkHover: orangeColors[800],
    },
    Layout: {
      headerBg: '#e0e7ff',
      footerBg: '#e0e7ff',
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
      colorText: orangeColors[400],
      primaryShadow: '0',
      primaryColor: zincColors[50],
    },
    Drawer: {
      colorIcon: orangeColors[700],
      colorIconHover: orangeColors[400],
    },
    Divider: {
      colorSplit: orangeColors[700],
    },
  },
};

export const darkTheme = {
  token: {
    colorPrimary: orangeColors[400],
    colorBgBase: zincColors[800],
    colorTextBase: orangeColors[100],
    fontSize: 16,
    backgroundColorGradientStart: zincColors[700],
    backgroundColorGradientEnd: zincColors[900],
    titleColor: orangeColors[400],
  },
  components: {
    Typography: {
      colorTextHeading: zincColors[900],
      colorTextDescription: orangeColors[300],
      colorLink: orangeColors[100],
      colorLinkHover: orangeColors[200],
    },
    Layout: {
      headerBg: zincColors[800],
      footerBg: zincColors[800],
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
      colorText: orangeColors[400],
      primaryShadow: '0',
      primaryColor: zincColors[50],
    },
    Drawer: {
      colorIcon: orangeColors[500],
      colorIconHover: orangeColors[400],
    },
    Divider: {
      colorSplit: orangeColors[100],
    },
  },
};
