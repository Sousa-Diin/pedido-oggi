import React, { useState } from "react";
import * as XLSX from "xlsx";

const ExcelUploader = ({ onUpload }) => {
  const [fileName, setFileName] = useState("");

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (!file) return;
    setFileName(file.name);

    const reader = new FileReader();
    reader.onload = (e) => {
      const data = new Uint8Array(e.target.result);
      const workbook = XLSX.read(data, { type: "array" });
      const sheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[sheetName];
      const jsonData = XLSX.utils.sheet_to_json(worksheet);
      onUpload(jsonData);
    };
    reader.readAsArrayBuffer(file);
  };

  return (
    <div>
      <input className=" cursor-pointer rounded-md p-1 bg-[#fff]" type="file" accept=".xlsx, .xls" onChange={handleFileUpload} />
      {fileName && <p>Arquivo carregado: {fileName}</p>}
    </div>
  );
};

export default ExcelUploader;
