import { useState, useEffect, useRef } from "react";
import axios from "axios";
import { Bar, Pie } from "react-chartjs-2";
import "chart.js/auto";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import {
  Button,
  Card,
  CardBody,
  Input,
  Option,
  Select,
  Typography,
} from "@material-tailwind/react";

const formatDate = (dateString) => {
  const date = new Date(dateString);
  const day = String(date.getDate() + 1).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = date.getFullYear();
  return `${day}-${month}-${year}`;
};

const InformeViandas = () => {
  const [tipoInforme, setTipoInforme] = useState("");
  const [fechaInicio, setFechaInicio] = useState("");
  const [fechaFin, setFechaFin] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [datosGrafico, setDatosGrafico] = useState(null);
  const [reservas, setReservas] = useState([]);
  const pdfRef = useRef();

  useEffect(() => {
    const fetchReservas = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8080/reservas/estudiante-vianda?fechaInicio=${formatDate(
            fechaInicio
          )}`
        );
        setReservas(response.data);
      } catch (error) {
        setError("Error al obtener las reservas.");
        console.error("Error al obtener las reservas:", error);
      }
    };

    if (fechaInicio) {
      fetchReservas();
    }
  }, [fechaInicio]);

  const handlerFiltrar = (e) => {
    e.preventDefault();

    if (!fechaInicio || !fechaFin) {
      setError("Por favor, ingrese un rango de fechas válido.");
      return;
    }

    const reservasFiltradas = reservas.filter((reserva) => {
      const fechaReserva = new Date(
        reserva.fecha.split("-").reverse().join("-")
      );
      const fechaFinDate = new Date(fechaFin);
      return fechaReserva <= fechaFinDate;
    });

    if (tipoInforme === "becarios") {
      const cantidadBecarios = reservasFiltradas.filter(
        (reserva) => reserva.becario
      ).length;
      const cantidadNoBecarios = reservasFiltradas.length - cantidadBecarios;

      setDatosGrafico({
        labels: ["Becarios", "No Becarios"],
        datasets: [
          {
            label: "Cantidad de reservas",
            data: [cantidadBecarios, cantidadNoBecarios],
            backgroundColor: [
              "rgba(75, 192, 192, 0.2)",
              "rgba(153, 102, 255, 0.2)",
            ],
            borderColor: ["rgba(75, 192, 192, 1)", "rgba(153, 102, 255, 1)"],
            borderWidth: 1,
          },
        ],
      });
    } else if (tipoInforme === "viandas") {
      const reservasPorTipo = {
        clásico: reservasFiltradas.filter(
          (reserva) => reserva.tipoVianda === "Clasico"
        ).length,
        saludable: reservasFiltradas.filter(
          (reserva) => reserva.tipoVianda === "Saludable"
        ).length,
      };

      setDatosGrafico({
        labels: ["Clásico", "Saludable"],
        datasets: [
          {
            label: "Cantidad de viandas retiradas",
            data: [reservasPorTipo.clásico, reservasPorTipo.saludable],
            backgroundColor: [
              "rgba(75, 192, 192, 0.2)",
              "rgba(153, 102, 255, 0.2)",
            ],
            borderColor: ["rgba(75, 192, 192, 1)", "rgba(153, 102, 255, 1)"],
            borderWidth: 1,
          },
        ],
      });
    }

    setError("");
    setSuccess("Informe generado exitosamente.");
  };

  const handleDownloadPDF = () => {
    const content = pdfRef.current;
    html2canvas(content).then((canvas) => {
        const imgData = canvas.toDataURL("image/png");
        const pdf = new jsPDF();
        
        const imgWidth = 120; 
        const imgHeight = (canvas.height * imgWidth) / canvas.width;

        const pageWidth = pdf.internal.pageSize.getWidth(); // Ancho de la página
        const xPosition = (pageWidth - imgWidth) / 2; // Posición x centrada
        const pageHeight = 290; // Altura de la página
        let heightLeft = imgHeight;
        let position = 10;

        pdf.addImage(imgData, "PNG", xPosition, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;

        while (heightLeft >= 0) {
            position = heightLeft - imgHeight;
            pdf.addPage();
            pdf.addImage(imgData, "PNG", xPosition, position, imgWidth, imgHeight);
            heightLeft -= pageHeight;
        }
        pdf.save("informe_viandas.pdf");
    });
};


  return (
    <div className="container mt-10 flex flex-wrap w-full justify-center">
      <Card className="mt-6 mb-6 w-96 p-5 justify-center">
        <CardBody className=" pb-3 gap-5">
          <Typography
            variant="h5"
            color="black"
            className="mb-8 text-center text-2xl"
          >
            Descarga de informes
          </Typography>

          <form className="flex flex-wrap gap-5 justify-center" onSubmit={handlerFiltrar}>
            <Select
              value={tipoInforme}
              onChange={(value) => setTipoInforme(value)}
              label="Selecione una opción"
              required
            >
              <Option value="becarios">Informe de becarios</Option>
              <Option value="viandas">Informe de viandas según su tipo</Option>
            </Select>

            <Input
              type="date"
              value={fechaInicio}
              onChange={(e) => setFechaInicio(e.target.value)}
              label="Fecha inicio:"
              required
            />

            <Input
              type="date"
              value={fechaFin}
              onChange={(e) => setFechaFin(e.target.value)}
              label="Fecha fin"
              required
            />

            <Button type="submit" className="bg-blue-500">
              Generar informe
            </Button>

            <Button type="submit" className="">
              Volver
            </Button>
          </form>
        </CardBody>

        {error && <Typography className="text-red-500 mt-4 text-center">{error}</Typography>}
        {success && <Typography className="text-green-500 mt-4 text-center">{success}</Typography>}

        <div ref={pdfRef}>
          {datosGrafico && (
            <div className="mt-6">
              <Typography className="text-xl font-bold mb-4 text-center">
                Vista previa del gráfico
              </Typography>
              <Typography className="text-center">
                {tipoInforme === "becarios"
                  ? "Cantidad de reservas de Becarios y No becarios"
                  : "Cantidad de viandas retiradas según su tipo"}
              </Typography>
              {tipoInforme === "becarios" ? (
                <Pie data={datosGrafico} />
              ) : (
                <Bar data={datosGrafico} />
              )}
            </div>
          )}
        </div>

        <Button onClick={handleDownloadPDF} className="bg-green-500 mt-5">
          Descargar PDF
        </Button>
      </Card>
    </div>
  );
};

export default InformeViandas;