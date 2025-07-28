// src/components/my-cards/card-balance/CardBalance.tsx

import React, { useState, KeyboardEvent } from "react";
import {
  Box,
  CardBalanceStyles as styles,
  VisibilityIcon,
  VisibilityOffIcon,
} from "../../ui";
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
    <Box className={`${styles.cardSaldo} min-h-[402px]`}>
      {/* Saudação e data */}
      <Box>
        <h1 className={styles.nameTitle}>
          Olá, {user.name.split(" ")[0]} 😊
        </h1>
        <p className={styles.dateText}>{getCurrentDate()}</p>
      </Box>

      {/* Seção de saldo */}
      <Box className={styles.balanceSection}>
        <div className={styles.saldoHeader}>
          <p className={styles.saldoTitle}>
            Saldo&nbsp;
            <span
              tabIndex={0}
              role="button"
              aria-pressed={showBalance}
              aria-label={showBalance ? "Ocultar saldo" : "Mostrar saldo"}
              onClick={handleToggleBalance}
              onKeyDown={handleKeyToggle}
              className={styles.eyeIcon}
            >
              {showBalance ? (
                <VisibilityIcon fontSize="small" />
              ) : (
                <VisibilityOffIcon fontSize="small" />
              )}
            </span>
          </p>
          <hr className={styles.hrOrange} />
        </div>

        <p className={styles.contaCorrenteTitle}>{balance.account}</p>
        <p className={styles.valorSaldoText}>
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
