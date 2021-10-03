export const findEmailDomain = (email: string) => {
  const domain = email?.substring(email?.lastIndexOf("@") + 1).split(".");
  if (!domain || !domain[0]) {
    return null;
  }
  return domain[0];
};
