const express = require("express");
const app = express();
const port = 3000;

//importo il router
const routerPosts = require("./routers/routerPosts");

//-----------------------------IMPORTAZIONE MIDDLEWERES--------------------------------------//

const checkTime = require("./middlewares/checkTime");

//importo middlewere per gestione errore interno al server
const errorsHandler = require("./middlewares/errorsHandler");

//importo middlewere per gestione errore nel caso di pagina non trovata, se viene messa una rotta non esistente
const notFound = require("./middlewares/notFound");

//registro il body-parser per "application/json"
//attivo funzionalità per codificare il body
app.use(express.json());

//rendo accessibili i file statici della cartella public
app.use(express.static("public"));

//-------------------------------DEFINIZIONE MIDDLEWERE GLOBALI----------------------------//
app.use(checkTime);

//------------------------------------DEFINIZIONE ROTTE-----------------------------------//

//Rotta home del mio blog
app.get("/", (req, res) => res.send("<h1>Home del mio blog</h1>"));

//collegamento alle rotte del router
app.use("/posts", routerPosts);

//---------------------GESTIONE ERRORI-------------------------//
//faccio check errore interno server
app.use(errorsHandler);

//se rotta non esistente attivo middlewere che mi rimanda errore 404 Not found
app.use(notFound);

//---------------------------LISTEN SERVER----------------------------------//
//Ascolto e verifico che funzioni il mio server su questa porta
app.listen(port, () => console.log(`In ascolto sulla porta ${port}`));
