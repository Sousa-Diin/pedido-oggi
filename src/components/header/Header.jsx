import Logo from '../../assets/oggi-logo.png'

const Header = () => {
return(
  <header className='fixed md:w-dvw top-0 flex align-  md:h-10  lg:items-center  p-1 lg:h-15 text-[#eae8e1]  bg-[#963584]'>
    <div className='flex md:w-1/3'><img className="w-8 h-8 " src={Logo} alt="logo-empresa" /></div>
    <div className='pl-10'><h4 className='flex font-bold text-center '>OGGI SORVERTES TRÊS PONTAS</h4></div>
  </header>
);

}

export default Header;