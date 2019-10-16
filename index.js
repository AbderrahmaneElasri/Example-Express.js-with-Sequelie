import express from "express"
import bodyParser from "body-parser"
import logger from "morgan"

import { villeRouting, sejourRouting } from "./routes"



/** Création du serveur */
const server = express()

/** Ajout du parsing d'urls */
server.use(bodyParser.json())
server.use(bodyParser.urlencoded({ extended: true }))

/** Ajout d'un logger des requetes */
server.use(logger("dev"))

/** Ajout des routes configurés */
server.use(villeRouting)
server.use(sejourRouting)

/** Gestion d'erreur */
server.get((err, req, res, next) => {
    console.log("error handler")
    return res.status(500).json(err)
  })

/** Lancement du serveur */
server.listen(3000)

  