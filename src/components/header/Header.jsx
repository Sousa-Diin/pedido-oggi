import Logo from '../../assets/oggi-logo.png'

const Header = () => {
return(
  <header className='fixed w-dvw top-0 flex align-middle lg:justify-items-start p-1 lg:h-15 md:h-10 text-[#eae8e1]  bg-[#963584]'>
    <div className='flex md:w-1/3'><img className="w-8 h-8 " src={Logo} alt="logo-empresa" /></div>
    <div className='pl-5'><h4 className='flex font-bold text-center '>OGGI SORVERTES TRÊS PONTAS</h4></div>
  </header>
);

}

export default Header;