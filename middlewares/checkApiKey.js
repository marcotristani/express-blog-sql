function checkApiKey(req, res, next) {
  //recupero api key datami come query string
  const API_Key = req.query.API_Key;

  //faccio check che sia corretta questa key
  if (API_Key !== "MarcoAPI2000") {
    //se non corretta forzo lo stato 401 unauthorized
    res.status(401);
    //faccio terminare la chiamata api con il ritorno dell'errore
    return res.json({
      error: "Invalid API Key",
      message: "La chiave dell'API non è valida",
    });
  }
  //se chiave valida vado avanti
  next();
}

module.exports = checkApiKey;
