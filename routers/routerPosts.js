const express = require("express");

//attivo il router
const router = express.Router();

//importo middlewere checkApiKey
const checkApiKey = require("./../middlewares/checkApiKey");

//importo middlewere checkVault
const checkVault = require("./../middlewares/checkVault");

//importo l'oggetto con tutte le funzioni da eseguire nelle varie rotte
const controllerPosts = require("../controllers/postsControllers");

//attico checkApiKey su tutte le rotte

router.use(checkApiKey);
//creo le varie rotte

//index
router.get("/", controllerPosts.index);

//show
router.get("/:id", controllerPosts.show);

//store
router.post("/", checkVault, controllerPosts.store);

//update
router.put("/:id", checkVault, controllerPosts.update);

//modify
router.patch("/:id", checkVault, controllerPosts.modify);

//destroy
router.delete("/:id", checkVault, controllerPosts.destroy);

module.exports = router;
