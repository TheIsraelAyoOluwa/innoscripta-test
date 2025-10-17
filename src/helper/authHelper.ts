export const getToken = (value: string) => {
  if (typeof window === "undefined") return undefined;

  if (!localStorage.getItem(value)) return undefined;

  const token = localStorage.getItem(value);

  if (token) {
    return localStorage.getItem(value);
  }
};

export const removeToken = (arg: string) => {
  localStorage.removeItem(arg);
};

export const setToken = ({
  token,
  tokenName,
}: {
  token: string;
  tokenName: string;
}) => {
  localStorage.setItem(tokenName, token);
};
