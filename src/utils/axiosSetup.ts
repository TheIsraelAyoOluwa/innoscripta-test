import { Axios } from "axios";

export function setupGlobalAxiosInstanceAuth(axios: Axios) {
  axios.interceptors.request.use(
    (config) => {
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  axios.interceptors.response.use(
    (res) => {
      return res;
    },
    async (error) => {
      if (error.response) {
        if ([401].includes(error.response.status)) {
          // removeToken("token");
          console.log(error.response.status, "error response");
          // window.location.replace("/auth/login");
        }
      }
      return Promise.reject(error);
    }
  );
}
