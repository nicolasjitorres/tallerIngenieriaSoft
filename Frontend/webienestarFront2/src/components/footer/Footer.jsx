import { Typography } from "@material-tailwind/react";

function Footer() {
  return (
    <footer className="bg-red-700 gap-y-6 gap-x-12 flex w-full flex-row flex-wrap items-center justify-center border-t border-blue-gray-50 py-6 px-6 text-center md:justify-between">
      <Typography color="white" className="font-normal">
        &copy; 2024 WEBienestar
      </Typography>
      <ul className="flex flex-wrap items-center justify-center gap-y-2 gap-x-8">
        <li>
          <Typography
            as="a"
            href="https://github.com/dgeraldinediaz"
            color="white"
            className="font-normal transition-colors hover:text-gray-400 focus:text-gray-400"
          >
            Diaz Geraldine
          </Typography>
        </li>
        <li>
          <Typography
            as="a"
            href="https://github.com/lucianafigue"
            color="white"
            className="font-normal transition-colors hover:text-gray-400 focus:text-gray-400"
          >
            Figueroa Luciana
          </Typography>
        </li>
        <li>
          <Typography
            as="a"
            href="#"
            color="white"
            className="font-normal transition-colors hover:text-gray-400 focus:text-gray-400"
          >
            Serrano Nicolás
          </Typography>
        </li>
        <li>
          <Typography
            as="a"
            href="https://github.com/nicolasjitorres"
            color="white"
            className="font-normal transition-colors hover:text-gray-400 focus:text-gray-400"
          >
            Torres Nicolás
          </Typography>
        </li>
      </ul>
    </footer>
  );
}

export default Footer;
