const whiteList = [
    "http://www.google.com",
    "http://127.0.0.1:5000/login",
    "http://127.0.0.1:3000/login",
  ];
  const corsOptions = {
    origin: (origin, callback) => {
      if (whiteList.indexOf(origin) !== -1 || !origin) {
        callback(null, true);
      } else {
        callback(new Error("Blocked by CORS"));
      }
    },
    optionSuccessStatus: 200,
  };

  module.exports=corsOptions;