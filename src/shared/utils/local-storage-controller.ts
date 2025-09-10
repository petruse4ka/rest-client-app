type lsValue = string | number | boolean | object | [];

export const localStorageController = {
  set(key: string, value: lsValue) {
    window.localStorage.setItem(key, JSON.stringify(value));
  },

  get(key: string) {
    try {
      const value = window.localStorage.getItem(key);

      if (value) {
        return JSON.parse(value);
      }

      return null;
    } catch (e) {
      console.error(e);
      return null;
    }
  },

  remove(key: string) {
    window.localStorage.removeItem(key);
  },
};
