function checkTime(req, res, next) {
  //Rintraccio la data corrente da pc
  const timeNow = new Date().toLocaleString();
  //quando viene effettuata una chiamata stampo l'ora e la data
  console.log(
    `Hai chiamato la rotta con url " ${req.originalUrl} " con il metodo  " ${req.method} " il : ${timeNow} `,
  );
  //vado avanti con le richieste
  next();
}
module.exports = checkTime;
