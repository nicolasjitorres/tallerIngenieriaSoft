import { useState } from "react";

import { Typography, Input, Button } from "@material-tailwind/react";
import { EyeSlashIcon, EyeIcon } from "@heroicons/react/24/solid";

export function LoginForm() {
  const [passwordShown, setPasswordShown] = useState(false);
  const togglePasswordVisiblity = () => setPasswordShown((cur) => !cur);

  return (
    <section className="grid text-center h-screen items-center p-8">
      <div>
        <Typography variant="h3" color="blue-gray" className="mb-2">
          Iniciar Sesión
        </Typography>
        <Typography className="mb-16 text-gray-600 font-normal text-[18px]">
          ¡Bienvenido de nuevo! Ingresa tu usuario y contraseña para acceder
        </Typography>
        <form action="#" className="mx-auto max-w-[24rem] text-left">
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