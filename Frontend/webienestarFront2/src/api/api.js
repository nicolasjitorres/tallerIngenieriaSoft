import axios from "axios";

export default async function handleLogs (msj, tipoUs) {
  const user = JSON.parse(localStorage.getItem("user"));
  const { id } = user;
  try {
    const response = await axios.post("http://localhost:8080/logs", {
      idUsuario: id,
      mensaje: msj,
      tipoUsuario: tipoUs
    });
    console.log(response.data);
  } catch (error) {
    console.error("Error al registrar el log:", error);
  }
};
