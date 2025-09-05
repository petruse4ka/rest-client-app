import { orangeColors } from '../style';

export const lightTheme = {
  token: {
    colorPrimary: 'rgba(226, 186, 98, 1)',
    colorBgBase: '#979797ff',
    fontSize: 16,
    colorIcons: '#f59e0b',
  },
  components: {
    Layout: {
      headerBg: '#4f4f52ff',
      footerBg: '#4f4f52ff',
      bodyBg: '#979797ff',
    },
    Select: {},
  },
};

export const darkTheme = {
  token: {
    colorPrimary: '#f59e0b',
    colorBgBase: '#27272a',
    fontSize: 16,
  },
  components: {
    Layout: {
      headerBg: '#18181b',
      footerBg: '#18181b',
      bodyBg: '#27272a',
    },
    Select: {
      activeOutlineColor: 'none',
      colorText: '#f59e0b',
      colorTextQuaternary: '#f59e0b',
      optionActiveBg: 'rgba(99, 99, 99, 1)',
      optionSelectedColor: '#f59e0b',
      optionSelectedBg: '#18181b',
      colorBorder: '#f59e0b',
      colorBgElevated: '#979797ff',
    },
    Dropdown: {
      colorBgElevated: '#979797ff',
      colorText: orangeColors[100],
      controlItemBgHover: 'rgba(99, 99, 99, 1)',
    },
    Button: {
      colorText: '#f59e0b',
    },
  },
};
