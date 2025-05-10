import Image from 'next/image';

const LogoWhite = () => {
  return (
    <div>
      <Image src={'/mainLogoWhite.svg'} alt="logo" width={134} height={24} priority className="object-cover" />
    </div>
  );
};

export default LogoWhite;
