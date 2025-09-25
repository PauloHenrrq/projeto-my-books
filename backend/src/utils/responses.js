const answers = {
  success: (res, message, details) => {
    res.status(200).json({
      message: message,
      details: details,
    });
  },
  created: (res, message, details) => {
    res.status(201).json({
      message: message,
      details: details,
    });
  },
  badRequest: (res, message) => {
    res.status(400).json({
      message: message,
    });
  },
  unauthorized: (res, message) => {
    res.status(401).json({
      message: message,
    });
  },
  notFound: (res, message) => {
    res.status(404).json({
      message: message,
    });
  },
  semanticError: (res, message) => {
    res.status(422).json({
      message: message,
    });
  },
  internalServerError: (res, message) => {
    res.status(500).json({
      message: message,
    });
  },
};

module.exports = answers;
