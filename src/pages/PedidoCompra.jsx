import React, { useState } from "react";
import ExcelUploader from "../components/ExcelUploader";
import saveAs from "file-saver";
import * as XLSX from "xlsx";
import Button from "../components/button/Button";

const PedidoCompra = () => {
  let date = new Date();
  
  //alert(`Relatorio_Pedidos_${date.getDate()}-${date.getMonth()+1}-${date.getFullYear()}.xlsx`);
  const [produtos, setProdutos] = useState([]);

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
  };

  return (
    <div className="flex flex-col p-1 w-dvw ">
      <div className="mt-12"></div>
      <h2 className="text-center">Balanço - Estoque</h2>
      <div className="flex gap-2.5">
        <h2 className="text-[#e52c66] font-bold">Carregar Produtos via Excel</h2>
        <ExcelUploader onUpload={handleUpload} />
      </div>
      <table className=" flex mb-2 flex-col gap-3 h-61 overflow-y-auto ">
        <thead className="p-1 w-full flex justify-between">
          <tr className="flex flex-row" >
            <th className="w-96 flex">Linha</th>
            <th className="w-96 flex">Sabor</th>
            <th className="flex">Quantidade</th>
          </tr>
        </thead>
        <tbody className="flex flex-col gap-1">
          {produtos.map((produto, index) => (
            <tr key={produto.codigo || index}>
              <td className="w-96" >{produto.linha}</td>
              <td className="w-96">{produto.sabor}</td>
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
      <footer className="flex flex-col gap-0.5 w-full items-center justify-around">
      <Button onClick={gerarRelatorio} title={'Gerar Relatório'} color={'#37a2c2'}/>
      <span>© Wildes Sousa</span>
      </footer>
      
    </div>
  );
};

export default PedidoCompra;
