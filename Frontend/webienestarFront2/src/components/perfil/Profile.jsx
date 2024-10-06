import {
  Avatar,
  Button,
  Card,
  CardBody,
  Typography,
} from "@material-tailwind/react";

import { useNavigate } from "react-router-dom"; // Necesario para la redirección

function Profile() {
  const user = JSON.parse(localStorage.getItem("user"));
  const userNombre = user?.nombre || "No definido";
  const userDni = user?.dni || 0;
  const userEmail = user?.email || "No definido"; 
  const navigate = useNavigate(); // Hook para redirigir al usuario

  const handleDarseDeBaja = () => {
    // Mostrar la alerta
    alert("Le avisaremos al administrador sobre su petición de baja.");

    // Eliminar el usuario de localStorage
    localStorage.removeItem("user");

    // Redirigir al usuario a la página de login o inicio
    navigate("/login");
  };

  return (
    <section className="container mx-auto px-8 py-10 flex flex-wrap justify-center">
      <Card shadow={false} className="border border-gray-300 rounded-2xl">
        <CardBody>
          <div className="flex lg:gap-0 gap-6 flex-wrap justify-between items-center">
            <div className="flex items-center gap-3">
              <Avatar
                src="https://cdn-icons-png.flaticon.com/512/149/149071.png"
                alt="avatar"
                variant="rounded"
              />
              <div>
                <Typography color="blue-gray" variant="h6">
                  {userNombre}
                </Typography>
                <Typography
                  variant="small"
                  className="font-normal text-gray-600"
                >
                  {"DNI: " + userDni}
                </Typography>
                <Typography
                  variant="small"
                  className="font-normal text-gray-600"
                >
                  {"EMAIL: " + userEmail}
                </Typography>
              </div>
            </div>
            <div className="flex flex-wrap items-center justify-center gap-2">
              <Button
                variant="outlined"
                className="border-gray-300 bg-blue-300 flex items-center gap-2"
              >
                Editar perfil
              </Button>
              <Button
                variant="outlined"
                className="border-gray-300 bg-red-300 flex items-center gap-2"
                onClick={handleDarseDeBaja} // Llama a la función al hacer clic
              >
                Darse de baja
              </Button>
              <Button
                variant="outlined"
                className="border-gray-300 bg-gray-400 flex items-center gap-2"
                color="gray"
              >
                Cerrar sesión
              </Button>
            </div>
          </div>
          <Typography
            variant="small"
            className="font-normal text-gray-600 mt-6"
          ></Typography>
        </CardBody>
      </Card>
    </section>
  );
}

export default Profile;
