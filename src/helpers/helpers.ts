export const getRootUrl = (): string => {
  let rootUrl = "";

  if (process.env.NODE_ENV == "development" || process.env.NODE_ENV == "test") {
    rootUrl = "http://localhost:3000/prod";
  } else {
    rootUrl =
      "https://5v2ysgp454.execute-api.ap-southeast-1.amazonaws.com/prod";
  }

  return rootUrl;
};
