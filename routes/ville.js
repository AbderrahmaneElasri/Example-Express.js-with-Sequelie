import { Router } from "express"
import { Ville } from "../db"

const router = Router()

/**
 * Villes
 * route : /ville
 * @method GET,POST
 */
router
  .route("/ville")
  /**
   * @method GET
   * @return Array
   */
  .get(async (req, res) => {
    const { rows: villes, count } = await Ville.findAndCount()
    res.set("X-Total-Count", count)
    return res.json(villes)
  })
  /**
   * @method POST
   * @return Object
   */
  .post(async (req, res) => res.json(await Ville.create(req.body)))

/**
 * @route /ville/:id
 * @param id
 * @method GET,PUT,DELETE
 */
router
  .route("/ville/:id")
  .all(async (req, res, next) => {
    if (!req.params.id) throw new Error("ID_VILLE_OBLIGATOIRE")
    req.ville = await Ville.findById(req.params.id, {
      include: [{ all: true }]
    })
    if (!req.ville)
      return res
        .status(404)
        .json({ message: "VILLE_NON_TROUVEE", id: req.params.id })
    next()
  })
  /**
   * @method GET
   * @return Object
   */
  .get((req, res) => res.json(req.ville))
  /**
   * @method PUT
   * @return Object
   */
  .put(async (req, res) => res.json(await req.ville.update(req.body)))
  /**
   * @method DELETE
   * @return Object
   */
  .delete(async (req, res) => res.json(await req.ville.destroy()))

export default router
