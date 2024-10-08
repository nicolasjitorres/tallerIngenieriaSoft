import { Carousel, Typography } from "@material-tailwind/react";
import imagen1 from "../../assets/plato-1.jpg";
import imagen2 from "../../assets/plato-2.jpg";
import imagen3 from "../../assets/plato-3.jpg";
import logoHeader from "../../assets/logo-header.jpg";
import secretario from "../../assets/fondo-otto.jpg"
import comedor from "../../assets/fondo-comedor.jpg"
import control from "../../assets/fondo-control.jpg"

const Dashboard = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const userRole = user?.rol || "No definido"; // Obtener el rol del localStorage
  
  return (
    <div className="flex flex-wrap justify-center w-full">
      {userRole === "ESTUDIANTE" ? (
        <>
        <div className="flex flex-wrap justify-center w-full"></div>
          <img src={logoHeader} alt="Logo header" className="h-100px w-100px" />
          <Typography variant="h3" color="blue-gray" className="w-full m-5 text-center">
            ¡Te damos la bienvenida de nuevo!
          </Typography>
          <Carousel className="max-w-4xl">
            <img src={imagen2} alt="image 2" className="h-full w-full bg-cover" />
            <img src={imagen3} alt="image 3" className="h-full w-full bg-cover" />
            <img src={imagen1} alt="image 1" className="h-full w-full bg-cover" />
          </Carousel>
          <Typography variant="h5" color="gray" className="w-full m-5 mt-10 mb-10 text-center">
            Nuestro menú se actualiza cada día, ¡Esperamos que lo disfrutes!
          </Typography>
        </>
      ) : userRole === "EMPLEADO_CONTROL" ? (
        <>
          <img src={logoHeader} alt="Logo header" className="h-full w-full bg-cover" />
          <Typography variant="h3" color="blue-gray" className="w-full m-5 text-center">
            ¡Bienvenido, empleado de control!
          </Typography>
          <img src={control} alt="Control" className="h-full w-full bg-cover m-5" />
          <Typography variant="h5" color="gray" className="w-full m-5 mt-10 mb-10 text-center">
            Gracias por tu trabajo asegurando el futuro de los estudiantes.
          </Typography>
        </>
      ) : userRole === "EMPLEADO_COMEDOR" ? (
        <>
          <img src={logoHeader} alt="Logo header" className="h-full w-full bg-cover" />
          <Typography variant="h3" color="blue-gray" className="w-full m-5 text-center">
            ¡Bienvenido, empleado de comedor!
          </Typography>
          <img src={comedor} alt="Comedor" className="h-full w-full bg-cover m-5" />
          <Typography variant="h5" color="gray" className="w-full m-5 mt-10 mb-10 text-center">
            Gracias por tu esfuerzo en la cocina, ¡nuestros estudiantes te lo agradecen!
          </Typography>
        </>
      ) : userRole === "SECRETARIO" ? (
        <>
          <img src={logoHeader} alt="Logo header" className="h-full w-full bg-cover" />
          <Typography variant="h3" color="blue-gray" className="w-full m-5 text-center">
            ¡Bienvenido, secretario!
          </Typography>
          <img src={secretario} alt="Secretario" className="h-full w-full bg-cover m-5" />
          <Typography variant="h5" color="gray" className="w-full m-5 mt-10 mb-10 text-center">
            Tu organización es fundamental para el buen funcionamiento de la institución.
          </Typography>
        </>
      ) : (
        <>
          <Typography variant="h3" color="blue-gray" className="w-full m-5 text-center">
            ¡Bienvenido!
          </Typography>
          <Typography variant="h5" color="gray" className="w-full m-5 mt-10 mb-10 text-center">
            Estamos encantados de tenerte de vuelta.
          </Typography>
        </>
      )}
    </div>
  );
};

export default Dashboard;