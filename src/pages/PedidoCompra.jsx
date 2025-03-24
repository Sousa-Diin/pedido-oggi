import React, { useState } from "react";
import ExcelUploader from "../components/ExcelUploader";
import saveAs from "file-saver";
import * as XLSX from "xlsx";
import Button from "../components/button/Button";

const PedidoCompra = ({produtos, setProdutos}) => {
  let date = new Date();
  
  //alert(`Relatorio_Pedidos_${date.getDate()}-${date.getMonth()+1}-${date.getFullYear()}.xlsx`);
 /*  const [produtos, setProdutos] = useState([]); */

  const handleUpload = (data) => {
    console.log("Dados importados do Excel:", data); // DEBUG
  
  const produtosComQuantidade = data.map((produto) => ({
    codigo: produto.Codigo || produto.codigo || "",
    linha: produto.Linha || produto.linha || "Sem linha", // Verifica possíveis nomes
    sabor: produto.Sabor || produto.sabor || "Sem sabor",
    volume: produto.Volume || produto.volume || "Sem volume",
    Maximo: produto.Maximo || produto.maximo || "Sem volume maximo",
  }));

  console.log("Dados formatados:", produtosComQuantidade); // DEBUG

  setProdutos(produtosComQuantidade);
  };

  const myAlert = (msg) => {
    alert(msg);
    return "";
  }

  const handleChange = (index, value) => {
    const novosProdutos = [...produtos];
    novosProdutos[index].quantidade = value >= 0 && value <= novosProdutos[index].Maximo ? value : myAlert("🚨Quantidade inferior ou superior ao permitido.");
    setProdutos(novosProdutos);
  };

  const calcularPedido = () => {
    return produtos.map((produto) => ({
      ...produto,
      pedido: Math.abs(Math.ceil(produto.quantidade - produto.Maximo)),
    }))
  };
/* 
  const gerarRelatorio = () => {
    const pedidos = calcularPedido();
    const dados = pedidos.map(({ codigo, linha, sabor, volume, pedido }) => ({
      Codigo: codigo,
      Linha: linha,
      Sabor: sabor,
      Volume: volume,
      Pedido: pedido,
    }));
    const ws = XLSX.utils.json_to_sheet(dados);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Pedidos");
    const excelBuffer = XLSX.write(wb, { bookType: "xlsx", type: "array" });
    const blob = new Blob([excelBuffer], { type: "application/octet-stream" });
    saveAs(blob, `Relatorio_Pedidos_${date.getDate()}-${date.getMonth()+1}-${date.getFullYear()}.xlsx`);
  }; */

  return (
     <div className="w-dvw h-105  overflow-y-auto">
      
      <table className=" flex flex-col p-1 h-105">
        <thead >
          <tr className="flex justify-between p-2 " >
            <th className="">Linha</th>
            <th className="">Sabor</th>
            <th className="">Quantidade</th>
          </tr>
        </thead>
        <tbody className="flex flex-col gap-1">
          {produtos.map((produto, index) => (
            <tr key={produto.codigo || index} className="flex justify-between p-1">
              <td className="" >{produto.linha}</td>
              <td className="">{produto.sabor}</td>
              <td className="">
                <input className="w-20 bg-[#fff] p-1 text-center text-[#e59e07] rounded-md"
                  type="number"
                  value={produto.quantidade}
                  onChange={(e) => handleChange(index, e.target.value)}
                  min={0}
                  max={produto.Maximo}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>      
      </div>
  );
};

export default PedidoCompra;
