import mongoose from "mongoose";

const reporteSchema = mongoose.Schema(
  {
    nombreservicio: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Servicio",
      required: true,
    },
    sedimento: {
      type: String,
      required: true,
    },
    objetos: {
      type: String,
      required: true,
    },
    piso: {
      type: String,
      required: true,
    },
    paredes: {
      type: String,
      required: true,
    },
    techo: {
      type: String,
      required: true,
    },
    succiones: {
      type: String,
      required: true,
    },
    numerosucciones: {
      type: String,
      required: true,
    },
    escaleras: {
      type: String,
      required: true,
    },
    numeroescaleras: {
      type: String,
      required: true,
    },
    vasoscomunicantes: {
      type: String,
      required: true,
    },
    observaciones: {
      type: String,
      required: true,
    },
    estado: {
      type: Boolean,
      default: false,
    },
    completado: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Usuario",
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

const Reporte = mongoose.model("Reporte", reporteSchema);

export default Reporte;
