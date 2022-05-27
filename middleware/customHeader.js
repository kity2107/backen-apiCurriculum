const customHeader = (req, res, next) => {
  try {
    const api_key = req.headers.API_KEY;

    if (api_key === 'leifer-01') {
      next();
    } else {
      res.status(403);
      res.send({ error: 'api_key no es correcto' });
    }
    next();
  } catch (e) {
    res.status(403);
    res.send({ error: 'algo ocurrio en el custom-header' });
  }
};

module.exports = customHeader;
