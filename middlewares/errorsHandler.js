function errorsHandler(err, req, res, next) {
  //forzo lo stato 500 error Internal Server
  res.status(500);
  //Faccio tornare come risposta l'errore con il messaggio dell'errore
  res.json({
    status: 500,
    message: err.message,
  });
}

module.exports = errorsHandler;

//per generare errore da js possiamo scrivere:

// throw new Error("errore generato da noi attraverso js");
