const Button = ({ title, onClick }) => {
  return (
    <button 
      className='w-80  bg-[#37a2c2] p-1 text-white rounded-md'
      onClick={onClick}
    >
      {title}
    </button>
  );
}

export default Button;