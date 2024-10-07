import { useState } from "react";
import { Typography, Input, Button, Alert } from "@material-tailwind/react";
import { EyeSlashIcon, EyeIcon } from "@heroicons/react/24/solid";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export function LoginForm() {
  const [passwordShown, setPasswordShown] = useState(false);
  const togglePasswordVisiblity = () => setPasswordShown((cur) => !cur);
  const [username, setUsername] = useState(null);
  const [pass, setPass] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate(); // Para redirigir a la vista "/"

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://localhost:8080/auth/login", {
        username: username,
        password: pass,
      });

      const datos = response.data;

      if (datos.token) {
        const usuario = {
          "nombre": datos.nombre,
          "dni": datos.dni,
          "rol": datos.rol
        };
        localStorage.setItem("token", datos.token);
        localStorage.setItem("user", JSON.stringify(usuario));
        console.log("Token almacenado:", datos);
        const user = JSON.parse(localStorage.getItem("user"));
        console.log(user);
        navigate("/");
      } else {
        setErrorMessage(
          "El nombre de usuario y/o contraseña es incorrecto. Por favor intenta de nuevo."
        );
      }
    } catch (error) {
      setErrorMessage(
        "El nombre de usuario y/o contraseña es incorrecto. Por favor intenta de nuevo."
      );
      console.error("Error en el inicio de sesión:", error);
    }
  };

  return (
    <section className="flex flex-wrap justify-center mb-20">
      <div className="bg-white p-10 rounded-md max-w-2xl">
        <Typography variant="h3" color="blue-gray" className="mb-2">
          Iniciar Sesión
        </Typography>
        <Typography className="mb-16 text-gray-600 font-normal text-[18px]">
          ¡Bienvenido de nuevo! Ingresa tu usuario y contraseña para acceder
        </Typography>
        <form action="#" className="mx-auto text-left">
          <div className="mb-6">
            <label htmlFor="email">
              <Typography
                variant="small"
                className="mb-2 block font-medium text-gray-900"
              >
                Usuario
              </Typography>
            </label>
            <Input
              id="email"
              color="gray"
              size="lg"
              type="email"
              name="email"
              placeholder="Ejemplo123"
              className="w-full placeholder:opacity-100 focus:border-t-black border-t-blue-gray-200"
              labelProps={{
                className: "hidden",
              }}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="mb-6">
            <label htmlFor="password">
              <Typography
                variant="small"
                className="mb-2 block font-medium text-gray-900"
              >
                Contraseña
              </Typography>
            </label>
            <Input
              size="lg"
              placeholder="********"
              labelProps={{
                className: "hidden",
              }}
              className="w-full placeholder:opacity-100 focus:border-t-black border-t-blue-gray-200"
              type={passwordShown ? "text" : "password"}
              icon={
                <i className="cursor-pointer" onClick={togglePasswordVisiblity}>
                  {passwordShown ? (
                    <EyeIcon className="h-5 w-5" />
                  ) : (
                    <EyeSlashIcon className="h-5 w-5" />
                  )}
                </i>
              }
              onChange={(e) => setPass(e.target.value)}
            />
          </div>

          {errorMessage && (
            <Alert color="red" className="mb-6">
              {errorMessage}
            </Alert>
          )}

          <Button
            onClick={(e) => handleLogin(e)}
            color="red"
            size="lg"
            className="mt-6"
            fullWidth
          >
            Ingresar
          </Button>
          <div className="!mt-4 flex justify-end">
            <Typography
              as="a"
              href="#"
              color="blue-gray"
              variant="small"
              className="font-medium"
            >
              Olvidé mi contraseña
            </Typography>
          </div>

          <Typography
            variant="small"
            color="gray"
            className="!mt-4 text-center font-normal"
          >
            ¿Aún no estás registrado?{" "}
            <a href="/register" className="font-medium text-gray-900">
              Registrarte
            </a>
          </Typography>
        </form>
      </div>
    </section>
  );
}

export default LoginForm;