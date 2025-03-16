const Button = ({ title, onClick, color }) => {
  return (
    <button 
      className={`w-80  bg-[${color}] p-1 text-white rounded-md`}
      onClick={onClick}
    >
      {title}
    </button>
  );
}

export default Button;