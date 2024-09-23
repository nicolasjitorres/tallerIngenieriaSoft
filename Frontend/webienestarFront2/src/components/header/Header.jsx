import { Link } from "react-router-dom";
import logo from '../../assets/logo.png';

const Header = () => {
  return (
    <>
      <header className="flex items-center w-full h-[70px]">
        <div className="container mx-auto w-full">
          <div className="flex flex-wrap items-center m-0">
            <div className="w-1/8">
              <Link to={'/'} className="flex items-center">
                <img src={logo} alt="WEBIENESTAR logo" className="w-[45px] mx-auto" />
                <span className="ml-2 text-[#c61a09] font-semibold text-[24px]">WEBIENESTAR</span>
              </Link>
            </div>
          </div>
        </div>
      </header>
    </>
  )
}

export default Header;