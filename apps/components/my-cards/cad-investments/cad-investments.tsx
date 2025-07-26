// src/components/CadInvestments.tsx

import React from "react";
import { Box, CadInvestmentsStyles as styles, PieChart } from "../../ui";
// Se estiver em TS, mantenha a interface. Caso contrário, ignore esta linha:
// import { CadInvestmentsProps } from "interfaces/dashboard";

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
      className={`${styles.cardTransacao} cardTransacao w-full gap-10`}
    >
      {/* BLOCO: Título / Total / Caixas */}
      <section className="flex flex-col gap-6 w-full">
        <h3 id="investimentos-title" className={styles.investmentTitle}>
          Investimentos
        </h3>
        <p className={styles.totalLabel}>
          Total:&nbsp;
          {balance.value.toLocaleString("pt-BR", {
            style: "currency",
            currency: "BRL",
          })}
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
                className={`${styles.investmentBox} ${styles.investmentBoxType}`}
              >
                <span className={styles.investmentBoxTitle}>{label}</span>
                <span className={styles.investmentBoxValue}>{formatted}</span>
              </Box>
            );
          })}
        </div>
      </section>

      {/* BLOCO: Estatísticas */}
      <section
        role="group"
        aria-labelledby="estatisticas-title"
        className="flex flex-col gap-6 w-full"
      >
        <h4 id="estatisticas-title" className={styles.statsTitle}>
          Estatísticas
        </h4>
        <Box
          role="img"
          aria-label="Gráfico de pizza de investimentos"
          className={`${styles.investmentBox} ${styles.investmentBoxStats} w-full md:max-w-[610px]`}
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
