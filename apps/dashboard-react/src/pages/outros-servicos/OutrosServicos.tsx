import React, { useCallback, useMemo } from "react";
import { Provider, useDispatch, useSelector } from "react-redux";
import { fetchBalance } from "../../../../store/slices/balanceSlice";
import CardBalance from "../../../../components/my-cards/card-balance/card-balance";
import CardsOtherService from "../../../../components/my-cards/card-other-services/card-other-services";
import SavingsGoalWidget from "../../../../components/widgets/savings-goal-widget";
import SpendingAlertWidget from "../../../../components/widgets/spending-alert-widget";
import { Box } from "@mui/material";

import {
  createNewTransaction,
  fetchTransactions,
  saveTransactions,
  deleteTransactions,
  type SavePayload,
} from "@store/slices/transactionsSlice";

import {
  type DashboardData,
  type NewTransactionData,
  type TxWithFiles,
  type Transaction,
  type Attachment,
} from "@interfaces/dashboard";
import dashboardData from "@mocks/dashboard-data.json";

import FinancialChart from "../../../../components/charts/financialChart";
import WidgetPreferencesButton from "../../../../components/widgets/widget-preferences-button";
import { useWidgetPreferences } from "../../../../hooks/use-widget-preferences";
import { AppDispatch, RootState, store } from "../../../../store/store";
import { tw } from "twind";
import CardListExtract from "@my-cards/card-list-extract/card-list-extract";

import { useDashboardData } from "@hooks/use-dashboard-data";

/* -----------------------------------------------------------
 * Helpers para garantir que 'valor' seja sempre number
 * ----------------------------------------------------------*/
const toNumber = (v: number | string): number => {
  if (typeof v === "number") return v;
  const normalized = v
    .toString()
    .trim()
    .replace(/\s+/g, "")
    .replace(/\./g, "")
    .replace(/,/, ".");
  const n = Number(normalized);
  return Number.isFinite(n) ? n : 0;
};

// Tipo auxiliar: o que pode estar vindo do estado/API
type TransactionLike = Omit<Transaction, "valor"> & {
  valor: number | string;
  anexos?: Attachment[];
};

// Tipo com 'valor' já garantido como number (o que os componentes esperam)
type TransactionNum = Omit<Transaction, "valor"> & { valor: number };

const normalizeToTransaction = (txs: TransactionLike[]): TransactionNum[] =>
  txs.map((tx) => ({
    ...tx,
    valor: toNumber(tx.valor),
  }));

const normalizeToTxWithFiles = (txs: TransactionNum[]): TxWithFiles[] =>
  txs.map((tx) => ({
    ...tx,
    // se seu TxWithFiles exige 'novosAnexos', garanta default:
    novosAnexos: (tx as unknown as { novosAnexos?: File[] }).novosAnexos ?? [],
  }));

function OutrosServicosContent() {
  const data = dashboardData as DashboardData;
  const dispatch = useDispatch<AppDispatch>();

  useDashboardData();

  const {
    items: transactionsRaw, // <- pode ter valor string | number
    status: transactionsStatus,
  } = useSelector((state: RootState) => state.transactions);

  const { value: balanceValue } = useSelector(
    (state: RootState) => state.balance
  );

  const { preferences } = useWidgetPreferences();

  // Normaliza para o tipo com 'valor: number' que os componentes esperam
  const transactions: TransactionNum[] = useMemo(
    () =>
      normalizeToTransaction(transactionsRaw as unknown as TransactionLike[]),
    [transactionsRaw]
  );

  const fetchNextPage = useCallback(() => {
    if (transactionsStatus !== "loading") {
      void dispatch(fetchTransactions()); // sua thunk não recebe args
    }
  }, [dispatch, transactionsStatus]);

  const handleSaveTransactions = async (txsToSave: TxWithFiles[]) => {
    const payload: SavePayload = { transactions: txsToSave };
    try {
      await dispatch(saveTransactions(payload)).unwrap();
    } catch (error) {
      console.error("Falha ao salvar as transações:", error);
    }
  };

  const handleDeleteTransactions = async (ids: number[]) => {
    try {
      await dispatch(deleteTransactions(ids)).unwrap();
    } catch (error) {
      console.error("Falha ao deletar as transações:", error);
    }
  };

  return (
    <Box className={tw`w-full min-h-screen px-4 py-6 lg:px-12 bg-[#E4EDE3]`}>
      <Box
        className={tw`w-full md:max-w-screen-lg flex flex-col gap-6 mx-auto`}
      >
        {/* botão de personalização */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "flex-end",
          }}
        >
          <WidgetPreferencesButton />
        </Box>

        <Box className={tw`grid grid-cols-3 gap-6`}>
          {/* coluna esquerda */}
          <Box className={tw`flex flex-col gap-6 w-ful col-span-2`}>
            {/* Balance agora vem do Redux */}
            <CardBalance
              user={data.user}
              balance={{ ...data.balance, value: balanceValue }}
            />
            <FinancialChart />
            {preferences.spendingAlert && (
              <SpendingAlertWidget limit={2000} transactions={transactions} />
            )}
            {preferences.savingsGoal && (
              <SavingsGoalWidget goal={3000} transactions={transactions} />
            )}
            <CardsOtherService />
          </Box>

          {/* coluna direita – extrato com scroll infinito */}
          <Box className={tw`w-full overflow-y-auto max-h-[800px]`}>
            <CardListExtract
              transactions={transactions}
              fetchPage={fetchNextPage}
              isPageLoading={transactionsStatus === "loading"}
              onSave={(txs) => {
                // Converter para TxWithFiles[] antes de salvar
                const normalized = normalizeToTxWithFiles(
                  txs as TransactionNum[]
                );
                void handleSaveTransactions(normalized);
              }}
              onDelete={handleDeleteTransactions}
            />
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

export default function OutrosServicos() {
  return (
    <Provider store={store}>
      <OutrosServicosContent />
    </Provider>
  );
}
