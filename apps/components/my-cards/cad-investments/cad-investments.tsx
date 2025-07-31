// src/components/CadInvestments.tsx

import React from "react";
import { Box, PieChart } from "../../ui";


// Se estiver em TS, mantenha a interface. Caso contrário, ignore esta linha:
// import { CadInvestmentsProps } from "interfaces/dashboard";

import "./cad-investments.css";
import { tw } from "twind";

type CadInvestmentsProps = {
  balance: { value: number };
  investments: Array<{ id: string; label: string; value: number }>;
};

const CadInvestments: React.FC<CadInvestmentsProps> = ({
  balance,
  investments,
}) => {
  // Definições do gráfico
  const chartData = [
    { value: 5, label: "Fundos de investimento" },
    { value: 10, label: "Tesouro Direto" },
    { value: 15, label: "Previdência Privada" },
    { value: 20, label: "Bolsa de Valores" },
  ];
  const chartSize = { width: 126, height: 126 };

  return (
    <Box
      role="group"
      aria-labelledby="investimentos-title"
      className={tw`cardTransacao gap-10`}
    >
      {/* BLOCO: Título / Total / Caixas */}
      <section className={tw`flex flex-col gap-6 w-full`}>
        <h3 id="investimentos-title" className={tw`investmentTitle`}>
          Investimentos
        </h3>
        <p className={tw`totalLabel`}>
          Total:&nbsp;
          {balance.value.toLocaleString("pt-BR", {
            style: "currency",
            currency: "BRL",
          })}
        </p>

        <div className={tw`flex flex-col md:flex-row gap-6`}>
          {investments.map(({ id, label, value }) => {
            const formatted = value.toLocaleString("pt-BR", {
              style: "currency",
              currency: "BRL",
            });
            return (
              <Box
                key={id}
                role="button"
                tabIndex={0}
                aria-label={`${label}, valor ${formatted}`}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    (e.currentTarget as HTMLElement).click();
                  }
                }}
                className={tw`investmentBox investmentBoxType`}
              >
                <span className={tw`investmentBoxTitle`}>{label}</span>
                <span className={tw`investmentBoxValue`}>{formatted}</span>
              </Box>
            );
          })}
        </div>
      </section>

      {/* BLOCO: Estatísticas */}
      <section
        role="group"
        aria-labelledby="estatisticas-title"
        className={tw`flex flex-col gap-6 w-full`}
      >
        <h4 id="estatisticas-title" className={tw`statsTitle text-gray-800`}>
          Estatísticas
        </h4>
        <Box
          role="img"
          aria-label="Gráfico de pizza de investimentos"
          className={tw`investmentBox styles.investmentBoxStats w-full md:max-w-[610px]`}
        >
          <PieChart
            series={[{ data: chartData, innerRadius: 40, cornerRadius: 50 }]}
            {...chartSize}
          />
        </Box>
      </section>
    </Box>
  );
};

export default CadInvestments;
