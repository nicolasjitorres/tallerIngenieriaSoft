import { useState } from "react";

import { Typography, Input, Button } from "@material-tailwind/react";
import { EyeSlashIcon, EyeIcon } from "@heroicons/react/24/solid";

export function RegisterForm() {
  const [passwordShown, setPasswordShown] = useState(false);
  const togglePasswordVisiblity = () => setPasswordShown((cur) => !cur);

  return (
    <section className="flex flex-wrap justify-center mb-20 ">
      <div className="bg-white p-10 rounded-md max-w-2xl">
        <Typography variant="h3" color="blue-gray" className="mb-2">
          Registro de estudiante
        </Typography>
        <Typography className="mb-16 text-gray-600 font-normal text-[18px]">
          ¡Hola! Mediante este formulario, te podrás registrar a WEBIENESTAR.
          Aquí podrás gestionar tu Beca Comedor y realizar reservas de viandas.
          Por favor ingresa tus datos.
        </Typography>
        <form action="#" className="mx-auto text-left">
          <div className="mb-6">
            <label htmlFor="email">
              <Typography
                variant="small"
                className="mb-2 block font-medium text-gray-900"
              >
                Nombre completo
              </Typography>
            </label>
            <Input
              id="email"
              color="gray"
              size="lg"
              type="email"
              name="email"
              placeholder="Juan Perez"
              className="w-full placeholder:opacity-100 focus:border-t-black border-t-blue-gray-200"
              labelProps={{
                className: "hidden",
              }}
            />
          </div>

          <div className="mb-6">
            <label htmlFor="email">
              <Typography
                variant="small"
                className="mb-2 block font-medium text-gray-900"
              >
                DNI
              </Typography>
            </label>
            <Input
              id="email"
              color="gray"
              size="lg"
              type="email"
              name="email"
              placeholder="12345678"
              className="w-full placeholder:opacity-100 focus:border-t-black border-t-blue-gray-200"
              labelProps={{
                className: "hidden",
              }}
            />
          </div>

          <div className="mb-6">
            <label htmlFor="email">
              <Typography
                variant="small"
                className="mb-2 block font-medium text-gray-900"
              >
                Genero
              </Typography>
            </label>
            <Input
              id="email"
              color="gray"
              size="lg"
              type="email"
              name="email"
              placeholder="MASCULINO"
              className="w-full placeholder:opacity-100 focus:border-t-black border-t-blue-gray-200"
              labelProps={{
                className: "hidden",
              }}
            />
          </div>

          <div className="mb-6">
            <label htmlFor="email">
              <Typography
                variant="small"
                className="mb-2 block font-medium text-gray-900"
              >
                Localidad
              </Typography>
            </label>
            <Input
              id="email"
              color="gray"
              size="lg"
              type="email"
              name="email"
              placeholder="Capital"
              className="w-full placeholder:opacity-100 focus:border-t-black border-t-blue-gray-200"
              labelProps={{
                className: "hidden",
              }}
            />
          </div>

          <div className="mb-6">
            <label htmlFor="email">
              <Typography
                variant="small"
                className="mb-2 block font-medium text-gray-900"
              >
                Direccion
              </Typography>
            </label>
            <Input
              id="email"
              color="gray"
              size="lg"
              type="email"
              name="email"
              placeholder="Calle falsa 123"
              className="w-full placeholder:opacity-100 focus:border-t-black border-t-blue-gray-200"
              labelProps={{
                className: "hidden",
              }}
            />
          </div>

          <div className="mb-6">
            <label htmlFor="email">
              <Typography
                variant="small"
                className="mb-2 block font-medium text-gray-900"
              >
                E-mail
              </Typography>
            </label>
            <Input
              id="email"
              color="gray"
              size="lg"
              type="email"
              name="email"
              placeholder="Ejemplo@gmail.com"
              className="w-full placeholder:opacity-100 focus:border-t-black border-t-blue-gray-200"
              labelProps={{
                className: "hidden",
              }}
            />
          </div>

          <div className="mb-6">
            <label htmlFor="email">
              <Typography
                variant="small"
                className="mb-2 block font-medium text-gray-900"
              >
                Celular
              </Typography>
            </label>
            <Input
              id="email"
              color="gray"
              size="lg"
              type="email"
              name="email"
              placeholder="3851234567"
              className="w-full placeholder:opacity-100 focus:border-t-black border-t-blue-gray-200"
              labelProps={{
                className: "hidden",
              }}
            />
          </div>

          <div className="mb-6">
            <label htmlFor="email">
              <Typography
                variant="small"
                className="mb-2 block font-medium text-gray-900"
              >
                Facultad
              </Typography>
            </label>
            <Input
              id="email"
              color="gray"
              size="lg"
              type="email"
              name="email"
              placeholder="FCEyT"
              className="w-full placeholder:opacity-100 focus:border-t-black border-t-blue-gray-200"
              labelProps={{
                className: "hidden",
              }}
            />
          </div>

          <div className="mb-6">
            <label htmlFor="email">
              <Typography
                variant="small"
                className="mb-2 block font-medium text-gray-900"
              >
                Carrera
              </Typography>
            </label>
            <Input
              id="email"
              color="gray"
              size="lg"
              type="email"
              name="email"
              placeholder="LSI"
              className="w-full placeholder:opacity-100 focus:border-t-black border-t-blue-gray-200"
              labelProps={{
                className: "hidden",
              }}
            />
          </div>

          <div className="mb-6">
            <label htmlFor="email">
              <Typography
                variant="small"
                className="mb-2 block font-medium text-gray-900"
              >
                Legajo
              </Typography>
            </label>
            <Input
              id="email"
              color="gray"
              size="lg"
              type="email"
              name="email"
              placeholder="111/2024"
              className="w-full placeholder:opacity-100 focus:border-t-black border-t-blue-gray-200"
              labelProps={{
                className: "hidden",
              }}
            />
          </div>

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
            />
          </div>

          <Button color="red" size="lg" className="mt-6" fullWidth>
            Ingresar
          </Button>

          <Typography
            variant="small"
            color="gray"
            className="!mt-4 text-center font-normal"
          >
            ¿Ya tienes una cuenta?{" "}
            <a href="/login" className="font-medium text-gray-900">
              Iniciar sesión
            </a>
          </Typography>
        </form>
      </div>
    </section>
  );
}

export default RegisterForm;
