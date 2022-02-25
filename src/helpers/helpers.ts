export const getRootUrl = (): string => {
  const rootUrl =
    "https://5v2ysgp454.execute-api.ap-southeast-1.amazonaws.com/prod";

  // if (process.env.NODE_ENV == "development" || "test") {
  //   rootUrl = "http://localhost:3000/prod";
  // } else {
  //   rootUrl =
  //     "https://5v2ysgp454.execute-api.ap-southeast-1.amazonaws.com/prod";
  // }

  return rootUrl;
};
