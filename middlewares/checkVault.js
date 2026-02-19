function checkVault(req, res, next) {
  //recupero vault key datami come query string
  const Vault_Key = req.query.Vault_Key;

  //faccio check che sia corretta questa key
  if (Vault_Key !== "VaultOK") {
    //se non corretta forzo lo stato 401 unauthorized
    res.status(401);
    //faccio terminare la chiamata api con il ritorno dell'errore
    return res.json({
      error: "Invalid Vault Key",
      message: "Utente non autorizzato, Vault Key non valida",
    });
  }
  //se chiave valida vado avanti
  next();
}
module.exports = checkVault;
