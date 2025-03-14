import React, { useState } from "react";
import ExcelUploader from "../components/ExcelUploader";
import saveAs from "file-saver";
import * as XLSX from "xlsx";

const PedidoCompra = () => {
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

  const handleChange = (index, value) => {
    const novosProdutos = [...produtos];
    novosProdutos[index].quantidade = value;
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
    saveAs(blob, "Relatorio_Pedidos.xlsx");
  };

  return (
    <div className="container">
      <h2>Balanço - Estoque</h2>
      <div>
        <h2>Carregar Produtos via Excel</h2>
        <ExcelUploader onUpload={handleUpload} />
      </div>
      <table>
        <thead>
          <tr>
            <th>Linha</th>
            <th>Sabor</th>
            <th>Quantidade</th>
          </tr>
        </thead>
        <tbody>
          {produtos.map((produto, index) => (
            <tr key={produto.codigo || index}>
              <td>{produto.linha}</td>
              <td>{produto.sabor}</td>
              <td>
                <input
                  type="number"
                  value={produto.quantidade}
                  onChange={(e) => handleChange(index, e.target.value)}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <button onClick={gerarRelatorio}>Gerar Relatório</button>
    </div>
  );
};

export default PedidoCompra;


///////////////////////////////////////////////
/* import React, { useState } from "react";
import ExcelUploader from "../components/ExcelUploader";
import saveAs from "file-saver";
import * as XLSX from "xlsx";

const PedidoCompra = () => {
  const [produtos, setProdutos] = useState([
    { linhas: "Clássicos", codigo: "96", sabor: "Brigadeiro", quantidade: "", volume: "1X33" },
    { linhas: "Sensa", codigo: "544", sabor: "Chocolate Branco", quantidade: "", volume: "1X20" },
  ]);

  const [_produtos, _setProducts] = useState([]);

  const handleUpload = (data) => {
    _setProducts(data);
  };


  const handleChange = (index, value) => {
    const novosProdutos = [...produtos];
    novosProdutos[index].quantidade = value;
    setProdutos(novosProdutos);
  };

  const calcularPedido = () => {
    return produtos.map((produto) => ({
      ...produto,
      pedido: produto.quantidade ? Math.ceil(produto.quantidade / produto.volume) : 0,
    }));
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
    saveAs(blob, "Relatorio_Pedidos.xlsx");
  };

  return (
    <div className="container">
      <h2>Balanço - Estoque</h2>
      <div>
        <h2>Carregar Produtos via Excel</h2>
        <ExcelUploader onUpload={handleUpload} />
      
      </div>
      <table>
        <thead>
          <tr>
            <th>Linha</th>
            <th>Sabor</th>
            <th>Quantidade</th>
          </tr>
        </thead>
        <tbody>
          
          {_produtos.map((produto, index) => (

            <tr key={produto.codigo}>
              <td>{JSON.stringify(produto).linha}</td>
              <td>{JSON.stringify(produto).sabor}</td>
              <td>
                <input
                  type="number"
                  value={produto.quantidade}
                  onChange={(e) => handleChange(index, e.target.value)}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <button onClick={gerarRelatorio}>Gerar Relatório</button>
     
    </div>
  );
};

export default PedidoCompra;
 */