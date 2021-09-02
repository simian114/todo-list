interface IlocalStorageHelper {
  getItem: (key: string) => any | null;
  setItem: (key: string, data: any) => void;
  removeItem: (key: string) => void;
}

const localStorageHelper: IlocalStorageHelper = {
  getItem: (key) => {
    const data: string | null = localStorage.getItem(key);
    if (!data) return null;
    if (typeof data === 'string') return data;
    return JSON.parse(data);
  },
  setItem: (key, data) => {
    typeof data === 'string'
      ? localStorage.setItem(key, data)
      : localStorage.setItem(key, JSON.stringify(data));
  },
  removeItem: (key: string) => {
    localStorage.removeItem(key);
  },
};
export default localStorageHelper;
