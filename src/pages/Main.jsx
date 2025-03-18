import React, { useState } from "react";
import Header from '../components/header/Header'
import Title from '../components/title/Title'
import Insertion from '../components/insertion/Isertion'
import PedidoCompra from '../pages/PedidoCompra'
import saveAs from "file-saver";
import * as XLSX from "xlsx";
import Button from "../components/button/Button";

const Main = () =>{
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

  let date = new Date();

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
  
  return(
    <main className="w-dvw h-dvh lg:h-96 gap-2 flex-col items-center bg-[#eae8e1]">
      <Header/>
      <Title title={'Balanço - Estoque'}/>
      <Insertion handleUpload={handleUpload}/>
      <PedidoCompra produtos={produtos} setProdutos={setProdutos}/>
      <Button onClick={gerarRelatorio} title={'Gerar Relatório'} />
      <span className="bottom-0">Wildes Sousa</span>
    </main>
  );
}

export default Main;