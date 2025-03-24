import ExcelUploader from "../ExcelUploader";
const Insertion = ({handleUpload}) => {
  return (
    <div className="flex gap-2 ">
      <p className=" text-[#e52c66] ">Carregar Produtos via Excel</p>
      <ExcelUploader onUpload={handleUpload} />
    </div>
  );
}

export default Insertion;