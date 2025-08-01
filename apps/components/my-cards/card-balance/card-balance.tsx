// src/components/my-cards/card-balance/CardBalance.tsx

import React, { useState, KeyboardEvent } from "react";
import { Box, VisibilityIcon, VisibilityOffIcon } from "../../ui";
import "./card-balance.css"; // Importando o módulo SCSS
import { tw } from "twind";

// Se você ainda usa TS, pode manter essa importação e o caminho correto:
// import { CardBalanceProps } from "interfaces/dashboard";
// Ou então defina localmente:
type CardBalanceProps = {
  user: { name: string };
  balance: { account: string; value: number | null };
};

import { formatBRL } from "../../../utils/currency-formatte/currency-formatte";

const CardBalance: React.FC<CardBalanceProps> = ({ user, balance }) => {
  const [showBalance, setShowBalance] = useState<boolean>(true);

  const handleToggleBalance = () => setShowBalance((prev) => !prev);

  const handleKeyToggle = (e: KeyboardEvent<HTMLSpanElement>) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      handleToggleBalance();
    }
  };

  const getCurrentDate = (): string => {
    const options: Intl.DateTimeFormatOptions = { weekday: "long" };
    const today = new Date();
    const weekday = today
      .toLocaleDateString("pt-BR", options)
      .replace(/^\w/, (c) => c.toUpperCase());
    const formattedDate = today.toLocaleDateString("pt-BR");
    return `${weekday}, ${formattedDate}`;
  };

  return (
    <Box className={tw`cardSaldo`}>
      {/* Saudação e data */}
      <Box>
        <h1 className={tw`nameTitle`}>Olá, {user.name.split(" ")[0]} 😊</h1>
        <p className={tw`dateText`}>{getCurrentDate()}</p>
      </Box>

      {/* Seção de saldo */}
      <Box className={tw`balanceSection`}>
        <div className={tw`saldoHeader`}>
          <p className={tw`saldoTitle`}>
            Saldo&nbsp;
            <span
              tabIndex={0}
              role="button"
              aria-pressed={showBalance}
              aria-label={showBalance ? "Ocultar saldo" : "Mostrar saldo"}
              onClick={handleToggleBalance}
              onKeyDown={handleKeyToggle}
              className={tw`eyeIcon`}
            >
              {showBalance ? (
                <VisibilityIcon fontSize="small" />
              ) : (
                <VisibilityOffIcon fontSize="small" />
              )}
            </span>
          </p>
          <hr className={tw`hrOrange`} />
        </div>

        <p className={tw`contaCorrenteTitle`}>{balance.account}</p>
        <p className={tw`valorSaldoText`}>
          {showBalance
            ? typeof balance.value === "number"
              ? formatBRL(balance.value)
              : "Carregando..."
            : "••••••"}
        </p>
      </Box>
    </Box>
  );
};

export default CardBalance;
