import { Router } from "express"
import { Sejour } from "../db"

const router = Router()

/**
 * Sejour
 * @route /sejour
 * @method GET,POST
 */
router
  .route("/sejour")
  /**
   * @method GET
   * @return Array
   */
  .get(async (req, res) => {
    const { rows: sejours, count } = await Sejour.findAndCount()
    res.set("X-Total-Count", count)
    return res.json(sejours)
  })
  /**
   * @method POST
   * @return Object
   */
  .post(async (req, res) => res.json(await Sejour.create(req.body)))

/**
 * @route /sejour/:id
 * @param id
 * @method GET,PUT,DELETE
 */
router
  .route("/sejour/:id")
  .all(async (req, res, next) => {
    if (!req.params.id) throw new Error("ID_SEJOUR_OBLIGATOIRE")
    req.sejour = await Sejour.findById(req.params.id, {
      include: [{ all: true }]
    })
    if (!req.sejour)
      return res
        .status(404)
        .json({ message: "SEJOUR_NON_TROUVEE", id: req.params.id })
    next()
  })
  /**
   * @method GET
   * @return Object
   */
  .get((req, res) => res.json(req.sejour))
  /**
   * @method PUT
   * @return Object
   */
  .put(async (req, res) => res.json(await req.sejour.update(req.body)))
  /**
   * @method DELETE
   * @return Object
   */
  .delete(async (req, res) => res.json(await req.sejour.destroy()))

export default router
