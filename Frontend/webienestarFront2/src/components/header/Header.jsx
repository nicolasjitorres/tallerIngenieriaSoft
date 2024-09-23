import { Button } from '@mui/material';
import { useState } from 'react';
import { MdMenu, MdMenuOpen } from 'react-icons/md';
import { Link } from 'react-router-dom';
import logo from '../../assets/logo.png'
import Sidebar from './Sidebar';

const DrawerComponent = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDrawer = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <header className="border-gray-200 bg-[#c61a09] h-[70px]">
        <div className="max-w-screen-xl flex flex-wrap items-center 
        justify-between mx-auto p-4">

          <div className="">
            <Link to={'/'} className="flex items-center space-x-3 rtl:space-x-reverse">
              <img src={logo} alt="WEBIENESTAR logo" className="h-8" />
              <span className="self-center text-2xl font-semibold 
              whitespace-nowrap text-white">
                WEBIENESTAR
              </span>
            </Link>
          </div>
          <Button className="!inline-flex !items-center !p-0 !w-5 !h-10 
            !justify-center !text-sm !rounded-full !md:hidden 
            !hover:bg-[#a61a09] !focus:outline-none"
            onClick={toggleDrawer}
          >
            {!isOpen ? (
              <MdMenuOpen className="text-white !text-[40px]" />
            ) : (
              <MdMenu className="text-white !text-[40px]" />
            )}


          </Button>

          <div className="flex items-center pl-4 ">
            <img
              className="w-10 h-10 p-1 rounded-full ring-gray-300 dark:ring-gray-500"
              src="https://www.w3schools.com/howto/img_avatar.png"
              alt="Bordered avatar"
            />
          </div>

        </div>
      </header>

      <Sidebar isOpen={isOpen} />
    </>
  );
};

export default DrawerComponent;
