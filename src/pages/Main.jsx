import React, { useState } from "react";
import Header from '../components/header/Header';
import Title from '../components/title/Title';
import Insertion from '../components/insertion/Isertion'; // (Corrigi a grafia aqui: 'Isertion' estava errado)
import PedidoCompra from '../pages/PedidoCompra';
import saveAs from "file-saver";
import * as XLSX from "xlsx";
import Button from "../components/button/Button";

const Main = () => {
  const [produtos, setProdutos] = useState([]);

  const handleUpload = (data) => {
    const produtosComQuantidade = data.map((produto) => ({
      codigo: produto.Codigo || produto.codigo || "",
      linha: produto.Linha || produto.linha || "Sem linha",
      sabor: produto.Sabor || produto.sabor || "Sem sabor",
      volume: produto.Volume || produto.volume || "Sem volume",
      Maximo: produto.Maximo || produto.maximo || "Sem volume máximo",
    }));

    setProdutos(produtosComQuantidade);
    localStorage.setItem("Pedido", JSON.stringify(produtosComQuantidade));
  };

  const calcularPedido = (produtos) => {
    return produtos.map((produto) => ({
      ...produto,
      pedido: Math.max(0, Math.ceil(produto.Maximo - produto.quantidade)), // Corrigido para ser Maximo - quantidade
    }));
  };

  const gerarRelatorio = () => {
    try {
      const pedidoLocalStorage = JSON.parse(localStorage.getItem("Pedido"));
      if (!pedidoLocalStorage || pedidoLocalStorage.length === 0) {
        throw new Error("🛑 Atenção.\n\n📁 Carregue o arquivo para começar!");
      }

      if (!pedidoLocalStorage[0].hasOwnProperty('quantidade')) {
        throw new Error("⚠ ATENÇÃO ⚠\n\nCampo 'quantidade' não encontrado nos produtos.");
      }

      const pedidos = calcularPedido(pedidoLocalStorage);

      const dadosPedido = pedidos.map(({ codigo, linha, sabor, volume, pedido }) => ({
        Codigo: codigo,
        Linha: linha,
        Sabor: sabor,
        Volume: volume,
        Pedido: pedido,
      }));

      const dadosEstoque = pedidoLocalStorage.map(({ codigo, linha, sabor, volume, quantidade }) => ({
        Codigo: codigo,
        Linha: linha,
        Sabor: sabor,
        Volume: volume,
        quantidade: Number(quantidade),
      }));

      const wsOrder = XLSX.utils.json_to_sheet(dadosPedido);
      const wsStock = XLSX.utils.json_to_sheet(dadosEstoque);

      const wb = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, wsOrder, "Pedido de Compra");
      XLSX.utils.book_append_sheet(wb, wsStock, "Estoque Atual");

      const excelBuffer = XLSX.write(wb, { bookType: "xlsx", type: "array" });
      const blob = new Blob([excelBuffer], { type: "application/octet-stream" });

      const date = new Date();
      const filename = `Relatorio_Pedidos_${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}.xlsx`;

      saveAs(blob, filename);

      localStorage.removeItem("Pedido");
      alert("✅ Pedido gerado com sucesso!");
      window.location.reload();
    } catch (error) {
      alert(error.message || error);
    }
  };

  return (
    <main style={{ width: '100%', height: "100vh" }} className="flex flex-col gap-2">
      <Header />
      <Title title="Balanço - Estoque" />
      <Insertion handleUpload={handleUpload} />
      <PedidoCompra produtos={produtos} setProdutos={setProdutos} />

      <footer className="flex flex-col items-center justify-between p-4">
        <Button onClick={gerarRelatorio} title="Gerar Relatório" />
        <pre style={{ fontSize: ".7rem" }}>Desenvolvido por © Soluttec</pre>
      </footer>
    </main>
  );
};

export default Main;
