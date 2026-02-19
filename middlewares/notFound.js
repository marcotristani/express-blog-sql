function notFound(req, res, next) {
  //forzo stato server 404 notFound
  res.status(404);
  //faccio tornare come risposta chiamata api l'errore notFound
  res.json({
    error: "notFound",
    message: "pagina non trovata",
  });
}

module.exports = notFound;
