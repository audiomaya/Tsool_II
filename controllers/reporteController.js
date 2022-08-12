import Servicio from "../models/Servicio.js"
import Reporte from "../models/Reporte.js"

const agregarReporte = async (req, res) => {
	const { servicio } = req.body

	const existeServicio = await Servicio.findById(servicio)

	if (!existeServicio) {
		const error = new Error("El servicio no existe")
		return res.status(404).json({ msg: error.message })
	}

	if (existeServicio.creador.toString() !== req.usuario._id.toString()) {
		const error = new Error("No tienes los permisos para añadir reportes")
		return res.status(403).json({ msg: error.message })
	}

	try {
		const reporteAlmacenado = await Reporte.create(req.body)
		//Almacenar el ID en el proyecto
		existeServicio.reportes.push(reporteAlmacenado._id)
		await existeServicio.save()
		res.json(reporteAlmacenado)
	} catch (error) {
		console.log(error)
	}
}

const obtenerReporte = async (req, res) => {
	const { id } = req.params

	const reporte = await Reporte.findById(id).populate("servicio")

	if (!reporte) {
		const error = new Error("Reporte no encontrado")
		return res.status(404).json({ msg: error.message })
	}

	if (reporte.servicio.creador.toString() !== req.usuario._id.toString()) {
		const error = new Error("Acción no válida")
		return res.status(403).json({ msg: error.message })
	}

	res.json(reporte)
}

const actualizarReporte = async (req, res) => {
	const { id } = req.params

	const reporte = await Reporte.findById(id).populate("servicio")

	if (!reporte) {
		const error = new Error("Reporte no encontrado")
		return res.status(404).json({ msg: error.message })
	}

	if (reporte.servicio.creador.toString() !== req.usuario._id.toString()) {
		const error = new Error("Acción no válida")
		return res.status(403).json({ msg: error.message })
	}

	reporte.sedimento = req.body || reporte.sedimento
	reporte.objetos = req.body || reporte.objetos
	reporte.piso = req.body || reporte.piso
	reporte.paredes = req.body || reporte.paredes
	reporte.techo = req.body || reporte.techo
	reporte.succiones = req.body || reporte. succiones
	reporte.numerosucciones = req.body || reporte.numerosucciones
	reporte.escaleras = req.body || reporte.escaleras
	reporte.numeroescaleras = req.body || reporte.numeroescaleras
	reporte.estado = req.body || reporte.estado
	reporte.completado = req.body || reporte.estado

	try {
		const reporteAlmacenado = await reporte.save()
		res.json(reporteAlmacenado)
	} catch (error) {
		console.log(error)
	}
}

const eliminarReporte = async (req, res) => {
	const { id } = req.params

	const reporte = await Reporte.findById(id).populate("servicio")

	if(!reporte) {
		const error = new Error("Reporte no encontrado")
		return res.status(404).json({ msg: error.message })
	}

	if (reporte.proyecto.creador.toString() !== req.usuario._id.toString()) {
		const error = new Error("Acción no válida")
		return res.status(404).json({ msg: error.message })
	}

	try {
		const servicio = await Servicio.findById(reporte.servicio)
		servicio.reportes.pull(reporte._id)
		await Promise.allSettled([ await servicio.save(), await reporte.deleteOne() ])
		res.json({ msg: "El reporte se eliminó" })
	} catch (error) {
		console.log(error)
	}
}

const cambiarEstado = async (req,res) => {
	const { id } = req.params

	const reporte = await Reporte. findById(id).populate("servicio")

	if (!reporte) {
		const error = new Error("Reporte no encontrado")
		return res.status(404).json({ msg: error.message })
	}

	if (
		reporte.servicio.creador.toString() !== req.usuarui._id.toString() && !reporte.servicio.colaboradores.some(
			(colaboradores) => colaboradores._id.toString() === req.usuario._id.toString()
		)
	) {
		const error = new Error("Acción no válida")
		return res.status(403).json({ msg: error.messge })
	}
	reporte.estado = !reporte.estado
	reporte.completado = req.usuario._id
	await reporte.save()

	const reporteAlmacenado = await Reporte.findById(id)
		.populate("servicio")
		.populate("completado")

	res.json(reporteAlmacenado)
}

export {
	agregarReporte,
	obtenerReporte,
	actualizarReporte,
	eliminarReporte,
	cambiarEstado,
}
