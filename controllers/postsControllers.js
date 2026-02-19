//importo lista post che mi servirà nelle funzioni
const posts = require("./../data/postsList");

//importo DB
const connection = require("./../data/db");

//funzione da eseguire nella rotta index
function index(req, res) {
  // //creo array con lista posts da filtrare e lo inizializzo come la lista originale
  // let filteredPosts = posts;
  // //se esiste un valore di query fornito allora applico il filtro
  // if (req.query.tag) {
  //   //recuperiamo il valore per la chiave tag fornitaci nella query string normalizzata
  //   const tag = req.query.tag.toLowerCase();
  //   //verifico se il tag arrivato è presente nell'array tags dell'oggetto posts e mi faccio tornare i post che soddisfano questa condizione
  //   filteredPosts = posts.filter((post) => {
  //     //normalizzo i valori da confrontare
  //     const normalTags = post.tags.map((tag) => tag.toLowerCase());
  //     return normalTags.includes(tag);
  //   });
  // }
  // //costruisco l'oggetto da restituire come json
  // const objectJson = {
  //   number_posts: filteredPosts.length,
  //   posts: filteredPosts,
  // };
  // //   res.send(tag);
  // res.json(objectJson);

  //definiamo la query sql
  const sql = "SELECT * FROM posts";

  //eseguo la query
  connection.query(sql, (err, results) => {
    if (err) return res.status(500).json({ error: "Database query failed" });
    //creo oggetto che voglio far tornare con valore results tornato dal DB
    const objectJson = {
      number_posts: results.length,
      posts: results,
    };
    //ritorno l'oggetto
    res.json(objectJson);
  });
}

//funzione da eseguire nella rotta show
function show(req, res) {
  //recuper il parametro id che mi viene dato nella richiesta dell'endpoint
  const id = parseInt(req.params.id);

  //vado a recuperare il post con id fornitoci come parametro
  const post = posts.find((post) => post.id === id);

  //verifico se questo post esiste nella lista
  if (!post) {
    //se non esiste vado a forzare o stato con codice 404 not found
    res.status(404);
    //finico la funzione restiturendo questo messaggio di errore
    return res.send({
      error: "Not Found",
      message: "post non trovato nella lista",
    });
  }

  //Se invece questo post essite restituisco l'oggetto del post ricercato
  res.json(post);
}

//funzione da eseguire nella rotta store
function store(req, res) {
  //vado a crearmi un id univoco(provvisorio poichè quando avrò i database non avrò questa necessità)
  const id = Date.now();

  //vado a creare l'oggetto nel nuovo post con le informazioni ricavate dal body della richiesta all'endpoint della nostra API
  const newPost = {
    id: id,
    title: req.body.title,
    content: req.body.content,
    image: req.body.image,
    tags: req.body.tags,
  };

  //faccio un push di quest'oggetto nell'array della lista dei post
  posts.push(newPost);

  //faccio ritornare questo nuovo oggetto per vederne l'anteprima
  res.status(201);
  res.json(newPost);
}

//funzione da eseguire nella rotta update
function update(req, res) {
  //recupero id, oggetto post relatico a quell'id e gestisco eventuali errori come fatto nelle altre logiche in cui si richiedeva id come parametro
  const id = parseInt(req.params.id);
  const post = posts.find((post) => post.id === id);
  if (!post) {
    res.status(404);
    return res.send({
      error: "Not Found",
      message: "il post da modificare non è presente nella lista dei post",
    });
  }

  //vado a riassegnare il valore delle proprietà del post selezionato con i valori delle proprietà che mi sono arriavti nel body della request
  post.title = req.body.title;
  post.image = req.body.image;
  post.content = req.body.content;
  post.tags = req.body.tags;

  //stampo un anteprima dell'oggetto modificato
  res.json(post);
}

//funzione da eseguire nella rotta modify
function modify(req, res) {
  //recupero id, oggetto post relatico a quell'id e gestisco eventuali errori come fatto nelle altre logiche in cui si richiedeva id come parametro
  const id = parseInt(req.params.id);
  const post = posts.find((post) => post.id === id);
  if (!post) {
    res.status(404);
    return res.send({
      error: "Not Found",
      message: "il post da modificare non è presente nella lista dei post",
    });
  }

  // //detrutturo oggetto req.body per comodità
  // const { title, content, image, tags } = req.body;
  // //vado a verificare quali proprietà mi sono arrivate nel body e modifico quelle arrivate

  // title && (post.title = title);
  // content && (post.content = content);
  // image && (post.image = image);
  // tags && (post.tags = tags);

  // // Definisco le proprietà modificabili
  // const property = ["title", "content"];

  // //vado a vedere se mi sono arrivatè in request proprietà che combaciano con quelle modificabili e le vado a modificare
  // property.forEach((prop) => req.body[prop] && (post[prop] = req.body[prop]));

  //rendo ancora più flessibile non sapendo quali proprietà mi arrivano nel req.body
  for (let property in req.body) {
    post[property] = req.body[property];
  }

  //vado a stampare un anteprima dell'elemento modificato
  res.json(post);
}

//funzione da eseguire nella rotta destroy
function destroy(req, res) {
  //recupero id dell'elemento che voglio andare ad eliminare
  const id = parseInt(req.params.id);

  // //recupero l'elemento che voglio eliminare
  // const post = posts.find((post) => post.id === id);

  // //verifico se è presente quest'elemento e se non c'è faccio ritornare messaggio di errore
  // if (!post) {
  //   res.status(404);

  //   return res.send({
  //     error: "Not found",
  //     message:
  //       "Non è stato possibile cancellare il post perchè non è presente nella lista posts",
  //   });
  // }

  // //vado ad eliminare con splice l'elemento recuperato
  // posts.splice(posts.indexOf(post), 1);
  // //forzo lo stato con successo a 204
  // res.sendStatus(204);

  //definisco query sql con Prepared Statements
  const sql = "DELETE FROM posts WHERE id = ?";

  //eseguo chiamata query con id recuperato da params
  connection.query(sql, [id], (err) => {
    if (err) return res.status(500).json({ error: "Failed to delete post" });
    res.sendStatus(204);
  });
}

module.exports = { index, show, store, update, modify, destroy };
