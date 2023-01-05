const logger = (req, res,next) => {
  console.log(`${req.method} \t ${req.header.origin}`);
  next();
};

module.exports= logger