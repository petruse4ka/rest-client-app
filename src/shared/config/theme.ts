import { orangeColors, zincColors, seanceColors } from '../style';

export const lightTheme = {
  token: {
    colorPrimary: orangeColors[400],
    colorBgBase: zincColors[100],
    colorTextBase: zincColors[800],
    fontSize: 16,
    titleColor: orangeColors[400],
  },
  components: {
    Typography: {
      colorTextHeading: orangeColors[400],
      colorTextDescription: orangeColors[300],
      colorLink: orangeColors[700],
      colorLinkHover: orangeColors[800],
      fontSizeHeading1: 64,
      titleMarginBottom: 10,
      fontWeightStrong: 600,
    },
    Layout: {
      headerBg: seanceColors[100],
      footerBg: seanceColors[100],
      bodyBg: `linear-gradient(45deg, ${seanceColors[200]}, ${seanceColors[300]})`,
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
      colorPrimary: `linear-gradient(45deg, ${orangeColors[300]}, ${orangeColors[500]})`,
      colorPrimaryHover: `linear-gradient(45deg, ${orangeColors[400]}, ${orangeColors[600]})`,
      defaultBg: 'transparent',
      defaultHoverBg: 'transparent',
      defaultBorderColor: orangeColors[500],
      defaultHoverBorderColor: orangeColors[600],
      defaultColor: orangeColors[500],
      defaultHoverColor: orangeColors[600],
      primaryShadow: '0',
      borderRadius: 25,
      borderRadiusLG: 25,
      fontWeightLG: 500,
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
    titleColor: orangeColors[400],
  },
  components: {
    Typography: {
      colorTextHeading: orangeColors[400],
      colorTextDescription: orangeColors[100],
      colorLink: orangeColors[100],
      colorLinkHover: orangeColors[200],
      fontSizeHeading1: 64,
      titleMarginBottom: 10,
      titleMarginTop: 0,
      fontWeightStrong: 600,
    },
    Layout: {
      headerBg: zincColors[800],
      footerBg: zincColors[800],
      bodyBg: `linear-gradient(45deg, ${zincColors[700]}, ${zincColors[900]})`,
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
      colorPrimary: `linear-gradient(45deg, ${orangeColors[300]}, ${orangeColors[500]})`,
      colorPrimaryHover: `linear-gradient(45deg, ${orangeColors[400]}, ${orangeColors[600]})`,
      primaryBorderColor: zincColors[600],
      primaryHoverBorderColor: orangeColors[600],
      defaultBg: 'transparent',
      defaultHoverBg: 'transparent',
      defaultBorderColor: orangeColors[500],
      defaultHoverBorderColor: orangeColors[500],
      defaultColor: orangeColors[400],
      defaultHoverColor: orangeColors[500],
      primaryShadow: '0',
      borderRadius: 25,
      fontWeight: 500,

      borderRadiusSM: 25,
      borderRadiusLG: 25,
      controlHeightSM: 33,
      paddingInlineSM: 15,

      controlHeight: 40,
      paddingInline: 15,
      contentFontSize: 18,

      contentFontSizeLG: 25,
      paddingInlineLG: 40,
      controlHeightLG: 45,
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
