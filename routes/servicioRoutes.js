import express from 'express'

import {
	obtenerServicios,
	nuevoServicio,
	obtenerServicio,
	editarServicio,
	eliminarServicio,
	agregarColaborador,
	eliminarColaborador,
} from "../controllers/servicioController.js"
import checkAuth from "../middleware/checkAuth.js"

const router = express.Router()

router
	.route("/")
	.get(checkAuth, obtenerServicios)
	.post(checkAuth, nuevoServicio);

router
	.route("/:id")
	.get(checkAuth, obtenerServicio)
	.put(checkAuth, editarServicio)
	.delete(checkAuth, eliminarServicio);

router.post("/agregar-colaborador/:id", checkAuth, agregarColaborador)
router.post("/eliminar-colaborador/:id", checkAuth, eliminarColaborador);

export default router
