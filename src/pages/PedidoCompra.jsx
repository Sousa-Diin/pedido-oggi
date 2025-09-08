import React from "react";

const PedidoCompra = ({produtos, setProdutos}) => {

  const myAlert = (msg) => {
    alert(msg);
    return "";
  }

  produtos = localStorage.getItem("Pedido") ? JSON.parse(localStorage.getItem("Pedido")) : produtos;
  const handleChange = (index, value) => {
    const novosProdutos = [...produtos];
    novosProdutos[index].quantidade = value >= 0 && value <= novosProdutos[index].Maximo +(novosProdutos[index].Maximo / 2) ? value : 
      myAlert("🚨Atenção : \n\nQuantidade inferior ou superior ao permitido.");
    setProdutos(novosProdutos);
    
    localStorage.setItem("Pedido", JSON.stringify(novosProdutos));
  };


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
            <tr key={produto.codigo || index} className="bg-[rgb(150,53,132,.5)] hover:bg-[#963584] text-[#eae8e1] font-bold flex justify-between p-1">
              <td className="w-30" >{produto.linha}</td>
              <td className="w-60 flex justify-start">{produto.sabor}</td>
              <td className="">
                <input className="w-20 bg-[#fff] p-1 text-center text-[#e59e07] rounded-md"
                  type="number"
                  value={produto.quantidade}
                  onChange={(e) => handleChange(index, e.target.value)}
                  min={0}
                  //max={(produto.Maximo +(produto.Maximo / 2))}// possibilita uma quantidade maior que o máximo
                  required
                  autoFocus="true"
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
