import STORAGEKEYS from "utils/StorageKeys";
const getToken = () => {
  const localToken = localStorage.getItem(STORAGEKEYS.__TOKEN);
  const sessionToken = sessionStorage.getItem(STORAGEKEYS.__TOKEN);
  const config = {
    headers: {
      Authorization: "",
    },
  };
  if (localToken && localToken.length !== 0) {
    config.headers.Authorization = `Bearer ${localToken}`;
    return config;
  } else if (sessionToken && sessionToken.length !== 0) {
    config.headers.Authorization = `Bearer ${sessionToken}`;
    return config;
  } else {
    return config;
  }
};

export default getToken;
