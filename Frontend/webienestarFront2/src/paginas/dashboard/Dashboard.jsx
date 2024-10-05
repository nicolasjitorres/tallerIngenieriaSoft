import { Carousel, Typography } from "@material-tailwind/react";
import imagen1 from "../../assets/plato-1.jpg";
import imagen2 from "../../assets/plato-2.jpg";
import imagen3 from "../../assets/plato-3.jpg";
import logoHeader from "../../assets/logo-header.jpg";

const Dashboard = () => {
  return (
    <div className="flex flex-wrap justify-center w-full">
      <img src={logoHeader} alt="Logo header" className="h-full w-full bg-cover" />
      <Typography variant="h3" color="blue-gray" className="w-full m-5 text-center">¡Te damos la bienvenida de nuevo!</Typography>
      <Carousel className=" max-w-4xl">
        <img src={imagen2} alt="image 2" className="h-full w-full bg-cover" />
        <img src={imagen3} alt="image 3" className="h-full w-full bg-cover" />
        <img src={imagen1} alt="image 1" className="h-full w-full bg-cover" />
      </Carousel>
      <Typography variant="h5" color="gray" className="w-full m-5 mt-10 mb-10 text-center">Nuestro menú se actualiza cada día, ¡Esperamos que lo disfrutes!</Typography>
    </div>
  );
};

export default Dashboard;
