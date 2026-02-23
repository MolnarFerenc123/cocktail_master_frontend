import Constants from "expo-constants";

const getBackendUrl = () => {
  const debuggerHost =
    Constants.expoConfig?.hostUri || Constants.manifest?.debuggerHost;

  if (debuggerHost) {
    const ip = debuggerHost.split(":")[0];
    return `http://${ip}:3001`;
  }
  return "http://localhost:3001";
};

export const CONFIG = {
  API_URL: getBackendUrl(),
};
