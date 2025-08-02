import React, { useCallback, useMemo } from "react";
import { useSelector, useDispatch, Provider } from "react-redux";

import { store, type AppDispatch, type RootState } from "@store/store";
import {
  createNewTransaction,
  fetchTransactions,
  saveTransactions,
  deleteTransactions,
  type SavePayload,
} from "@store/slices/transactionsSlice";

import { useWidgetPreferences } from "@hooks/use-widget-preferences";
import { useDashboardData } from "@hooks/use-dashboard-data";

import {
  type DashboardData,
  type NewTransactionData,
  type TxWithFiles,
  type Transaction,
  type Attachment,
  type TransactionType,
} from "@interfaces/dashboard";

import { Box } from "@mui/material";

import CardBalance from "../../../../components/my-cards/card-balance/card-balance";
import CadInvestments from "../../../../components/my-cards/cad-investments/cad-investments";
import SavingsGoalWidget from "../../../../components/widgets/savings-goal-widget";
import SpendingAlertWidget from "../../../../components/widgets/spending-alert-widget";

import dashboardData from "../../../../mocks/dashboard-data.json";
import FinancialChart from "../../../../components/charts/financialChart";
import WidgetPreferencesButton from "../../../../components/widgets/widget-preferences-button";
import { tw } from "twind";
import CardListExtract from "@my-cards/card-list-extract/card-list-extract";
import { ProtectedRoute } from "../../ProtectedRoute";

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

type TransactionLike = Omit<Transaction, "valor"> & {
  valor: number | string;
  anexos?: Attachment[];
};

type TransactionNum = Omit<Transaction, "valor"> & { valor: number };

const normalizeToTransaction = (txs: TransactionLike[]): TransactionNum[] =>
  txs.map((tx) => ({
    ...tx,
    valor: toNumber(tx.valor),
  }));

// ✅ Corrigido: Garantir todos os campos obrigatórios para o tipo TxWithFiles
const normalizeToTxWithFiles = (
  txs: Partial<TxWithFiles>[]
): TxWithFiles[] => {
  return txs.map((tx) => {
    if (tx._id === undefined) throw new Error("Transação sem _id");
    if (tx.valor === undefined) throw new Error("Transação sem valor");
    if (tx.tipo === undefined) throw new Error("Transação sem tipo");

    return {
      _id: tx._id,
      valor: tx.valor,
      tipo: tx.tipo,
      createdAt: tx.createdAt ?? new Date().toISOString(),
      updatedAt: tx.updatedAt ?? new Date().toISOString(),
      anexos: tx.anexos ?? [],
      novosAnexos: tx.novosAnexos ?? [],
    };
  });
};

function InvestimentosPage() {
  const data: DashboardData = dashboardData as DashboardData;
  const dispatch = useDispatch<AppDispatch>();

  useDashboardData();

  const {
    items: transactionsRaw,
    status: transactionsStatus,
  } = useSelector((state: RootState) => state.transactions);

  const { value: balanceValue } = useSelector(
    (state: RootState) => state.balance
  );

  const { preferences } = useWidgetPreferences();

  const transactions: TransactionNum[] = useMemo(
    () =>
      normalizeToTransaction(transactionsRaw as unknown as TransactionLike[]),
    [transactionsRaw]
  );

  const fetchNextPage = useCallback(() => {
    if (transactionsStatus !== "loading") {
      void dispatch(fetchTransactions());
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
        <Box
          sx={{
            display: "flex",
            justifyContent: "flex-end",
          }}
        >
          <WidgetPreferencesButton />
        </Box>

        <Box className={tw`grid grid-cols-3 gap-6`}>
          <Box className={tw`flex flex-col gap-6 w-ful col-span-2`}>
            <CardBalance balance={{ ...data.balance, value: balanceValue }} />
            <FinancialChart />
            {preferences.spendingAlert && (
              <SpendingAlertWidget limit={2000} transactions={transactions} />
            )}
            {preferences.savingsGoal && (
              <SavingsGoalWidget goal={3000} transactions={transactions} />
            )}
            <CadInvestments
              balance={{ ...data.balance, value: balanceValue }}
              investments={data.investments.map((inv) => ({
                id: String(inv.id),
                label: inv.label,
                value: inv.value,
              }))}
            />
          </Box>

          <Box className={tw`w-full overflow-y-auto max-h-[800px]`}>
            <CardListExtract
              transactions={transactions}
              fetchPage={fetchNextPage}
              isPageLoading={transactionsStatus === "loading"}
              onSave={(txs) => {
                console.log("Antes da normalização:", txs);
                const normalized = normalizeToTxWithFiles(
                  txs as Partial<TxWithFiles>[]
                );
                console.log("Depois da normalização:", normalized);
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

export default function Investimentos() {
  return (
      <ProtectedRoute>
        <InvestimentosPage />
      </ProtectedRoute>
  );
}
