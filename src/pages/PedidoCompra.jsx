/* import React, { useEffect } from "react";

const PedidoCompra = ({ produtos, setProdutos }) => {
  // Carrega dados do localStorage uma única vez ao montar
  useEffect(() => {
    const pedidoSalvo = localStorage.getItem("Pedido");
    if (pedidoSalvo) {
      try {
        setProdutos(JSON.parse(pedidoSalvo));
      } catch (e) {
        console.error("Erro ao ler localStorage:", e);
        localStorage.removeItem("Pedido");
      }
    }
  }, [setProdutos]);

  const myAlert = (msg) => {
    alert(msg);
    return "";
  };

  const handleChange = (index, value) => {
    const novosProdutos = [...produtos];
    const produto = novosProdutos[index];
    const maxPermitido = produto.Maximo + produto.Maximo / 2;

    if (value >= 0 && value <= maxPermitido) {
      produto.quantidade = Number(value);
      setProdutos(novosProdutos);
      localStorage.setItem("Pedido", JSON.stringify(novosProdutos));
    } else {
      myAlert("🚨 Atenção:\n\nQuantidade inferior ou superior ao permitido.");
    }
  };

  return (
    <div className="w-dvw h-105 overflow-y-auto">
      <table className="flex flex-col p-1 h-105">
        <thead>
          <tr className="flex justify-between p-2">
            <th>Linha</th>
            <th>Sabor</th>
            <th>Quantidade</th>
          </tr>
        </thead>
        <tbody className="flex flex-col gap-1">
          {produtos.map((produto, index) => (
            <tr
              key={produto.codigo || index}
              className="bg-[rgb(150,53,132,.5)] hover:bg-[#963584] text-[#eae8e1] font-bold flex justify-between p-1"
            >
              <td className="w-30">{produto.linha}</td>
              <td className="w-60 flex justify-start">{produto.sabor}</td>
              <td>
                <input
                  className="w-20 bg-[#fff] p-1 text-center text-[#e59e07] rounded-md"
                  type="number"
                  value={produto.quantidade}
                  onChange={(e) => handleChange(index, e.target.value)}
                  min={0}
                  inputMode="numeric"
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PedidoCompra; */

import React, { useEffect, useCallback } from "react";

const PedidoCompra = ({ produtos, setProdutos }) => {
  // 🔹 Carrega dados salvos apenas uma vez
  useEffect(() => {
    try {
      const pedidoSalvo = localStorage.getItem("Pedido");
      if (pedidoSalvo) {
        setProdutos(JSON.parse(pedidoSalvo));
      }
    } catch (err) {
      console.error("Erro ao carregar pedido:", err);
      localStorage.removeItem("Pedido");
    }
  }, [setProdutos]);

  // 🔹 Atualiza quantidade com validação e persistência
  const handleChange = useCallback(
    (index, value) => {
      const novos = [...produtos];
      const produto = novos[index];
      const max = produto.Maximo + produto.Maximo / 2;
      const qtd = Number(value);

      if (qtd < 0 || qtd > max) {
        window.alert("🚨 Atenção: Quantidade fora do limite permitido.");
        return;
      }

      produto.quantidade = qtd;
      setProdutos(novos);
      localStorage.setItem("Pedido", JSON.stringify(novos));
    },
    [produtos, setProdutos]
  );

  // 🔹 UI mais moderna e mobile-friendly
  return (
    <div className="min-h-screen bg-[#faf9f6] flex justify-center items-start p-4">
      <div className="w-full max-w-2xl bg-white rounded-2xl shadow-md overflow-hidden">
        <header className="bg-[#963584] text-white text-center p-3 font-semibold text-lg tracking-wide">
          Pedido de Compra
        </header>

        <div className="overflow-y-auto max-h-[75vh]">
          <table className="w-full border-collapse text-sm md:text-base">
            <thead className="bg-[#f3f3f3] text-[#444] sticky top-0">
              <tr>
                <th className="p-2 text-left w-1/4">Linha</th>
                <th className="p-2 text-left w-2/4">Sabor</th>
                <th className="p-2 text-center w-1/4">Qtd</th>
              </tr>
            </thead>
            <tbody>
              {produtos.map((p, i) => (
                <tr
                  key={p.codigo || i}
                  className="odd:bg-[#fef7fc] even:bg-[#faf2f8] hover:bg-[#f0d9eb] transition-colors"
                >
                  <td className="p-2 font-medium text-[#555]">{p.linha}</td>
                  <td className="p-2 text-[#333]">{p.sabor}</td>
                  <td className="p-2 text-center">
                    <input
                      type="number"
                      className="w-20 text-center border border-[#96358455] rounded-md focus:ring-2 focus:ring-[#963584] focus:outline-none p-1 text-[#963584] font-semibold"
                      min="0"
                      value={p.quantidade}
                      onChange={(e) => handleChange(i, e.target.value)}
                      inputMode="numeric"
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <footer className="p-3 text-sm text-gray-500 text-center">
          Dados salvos automaticamente 📦
        </footer>
      </div>
    </div>
  );
};

export default PedidoCompra;

