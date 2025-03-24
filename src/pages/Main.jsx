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
    //console.log("Dados importados do Excel:", data); // DEBUG
    
    const produtosComQuantidade = data.map((produto) => ({
      codigo: produto.Codigo || produto.codigo || "",
      linha: produto.Linha || produto.linha || "Sem linha", // Verifica possíveis nomes
      sabor: produto.Sabor || produto.sabor || "Sem sabor",
      volume: produto.Volume || produto.volume || "Sem volume",
      Maximo: produto.Maximo || produto.maximo || "Sem volume maximo",
    }));
  
    //console.log("Dados formatados:", produtosComQuantidade); // DEBUG
  
    setProdutos(produtosComQuantidade);
    
    localStorage.setItem("Pedido", JSON.stringify(produtosComQuantidade));
  };

  let date = new Date();

  const calcularPedido = () => {
    return JSON.parse(localStorage.getItem("Pedido")).map((produto) => ({
      ...produto,
      pedido: Math.abs(Math.ceil(produto.quantidade - produto.Maximo)),
    }))
  };

  const gerarRelatorio = () => {
    try {
      const pedidoLocalStorage = JSON.parse(localStorage.getItem("Pedido"));
      if (pedidoLocalStorage){
        if(pedidoLocalStorage[0].hasOwnProperty('quantidade')){
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
          XLSX.utils.book_append_sheet(wb, ws, "Pedido de Compra");
          const excelBuffer = XLSX.write(wb, { bookType: "xlsx", type: "array" });
          const blob = new Blob([excelBuffer], { type: "application/octet-stream" });
          saveAs(blob, `Relatorio_Pedidos_${date.getDate()}-${date.getMonth()+1}-${date.getFullYear()}.xlsx`);
          localStorage.removeItem("Pedido");
          alert("Pedido gerado com sucesso!"); 
          window.location.reload();
        }
        else { 
          let count = pedidoLocalStorage[0].hasOwnProperty('quantidade');
          console.log(`Qauntidade de items: ${pedidoLocalStorage.length}` );
          console.log(`Tem atributo - [quantidade]: ${count}` );
          console.log(`Quantidade: ${pedidoLocalStorage[0].quantidade}` );
          throw("⚠ ATENÇÃO ⚠\n\nCampo quantidade vazia.");
        }
        
      }
      else{
        throw("🛑 Atenção.\n\n📁 Carregue o arquivo para começar!");
      }
      
    } catch (error) {
      alert(error);
    }
  };
  
  return(
    <main style= {{width:'100%', height:"dvh"}} className="flex gap-2">
      <Header/>
      <Title title={'Balanço - Estoque'}/>
      <Insertion handleUpload={handleUpload}/>
      <PedidoCompra produtos={produtos} setProdutos={setProdutos}/>
      
      <footer className="flex flex-col items-center justify-between">
        <Button onClick={gerarRelatorio} title={'Gerar Relatório'} />
        <pre style={{fontSize: ".7rem"}}>Desenvolvido por © Wildes Sousa</pre>
      </footer> 
    </main>
  );
}

export default Main;