import LogoWhite from '../logo/LogoWhite';

const Footer = () => {
  return (
    <div className="flex flex-col md:flex-row gap-4 justify-center items-center bg-[#2563EBDB]/86 w-full h-[100px] ">
      <LogoWhite />
      <span className="font-normal text-[16px] text-white">© 2025 Blog genzet. All rights reserved.</span>
    </div>
  );
};

export default Footer;
