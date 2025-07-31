import React, { useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { AppDispatch, RootState } from "../../../../store/store";
import {
  createNewTransaction,
  fetchTransactions,
  saveTransactions,
  deleteTransactions,
  SavePayload,
} from "../../../../store/slices/transactionsSlice";
import StoreProvider from "../../../../store/StoreProvider"; // <-- MUDANÇA AQUI: Importe o Provider

// ... (todos os seus outros imports continuam aqui, sem alteração) ...
import CardBalance from "../../../../components/my-cards/card-balance/card-balance";
import CardNewTransaction from "../../../../components/my-cards/card-new-transaction/card-new-transaction";
import SavingsGoalWidget from "../../../../components/widgets/savings-goal-widget";
import SpendingAlertWidget from "../../../../components/widgets/spending-alert-widget";
import FinancialChart from "../../../../components/charts/financialChart";
import WidgetPreferencesButton from "../../../../components/widgets/widget-preferences-button";
import { useWidgetPreferences } from "../../../../hooks/use-widget-preferences";
import { useDashboardData } from "../../../../hooks/use-dashboard-data";
import {
  DashboardData,
  NewTransactionData,
  TxWithFiles,
} from "../../../../interfaces/dashboard";
import dashboardData from "../../../../mocks/dashboard-data.json";
import { Box } from "@mui/material";
import { fetchBalance } from "@store/slices/balanceSlice";
import CardListExtract from "@my-cards/card-list-extract/card-list-extract";
import { tw } from "twind";

// =================================================================================
// PASSO 1: Renomeie seu componente de "Dashboard" para "DashboardPage".
// O conteúdo dele fica IGUAL.
// =================================================================================

function DashboardPage() {
  const data: DashboardData = dashboardData;
  const dispatch = useDispatch<AppDispatch>();

  useDashboardData();

  const {
    items: transactions,
    status: transactionsStatus,
    creationStatus,
    hasMore,
    currentPage,
  } = useSelector((state: RootState) => state.transactions);

  const { value: balanceValue } = useSelector(
    (state: RootState) => state.balance
  );

  /* ---------------- prefs de widgets ----------------- */
  const { preferences } = useWidgetPreferences();
  /* --------------------------------------------------- */

  const fetchNextPage = useCallback(() => {
    if (transactionsStatus !== "loading" && hasMore) {
      void dispatch(fetchTransactions(currentPage + 1));
    }
  }, [dispatch, transactionsStatus, hasMore, currentPage]);

  const onSubmit = async (data: NewTransactionData) => {
    try {
      await dispatch(createNewTransaction(data)).unwrap();
    } catch (error) {
      console.error("Falha ao criar a transação:", error);
    }
  };

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

  const handleAtualizaSaldo = useCallback(() => {
    void dispatch(fetchBalance());
  }, [dispatch]);

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
            <CardNewTransaction
              onSubmit={onSubmit}
              isLoading={creationStatus === "loading"}
            />
          </Box>

          {/* coluna direita – extrato com scroll */}
          <Box className={tw`w-full overflow-y-auto max-h-[800px]`}>
            <CardListExtract
              transactions={transactions}
              fetchPage={fetchNextPage}
              hasMore={hasMore}
              isPageLoading={transactionsStatus === "loading"}
              onSave={(txs) => {
                void handleSaveTransactions(txs);
              }}
              onDelete={handleDeleteTransactions}
              atualizaSaldo={handleAtualizaSaldo}
            />
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
// =================================================================================
// PASSO 2: Crie um novo componente "wrapper" com o nome original (Dashboard).
// Ele é o único que será exportado.
// =================================================================================
export default function Dashboard() {
  // <-- MUDANÇA AQUI: Componente wrapper
  return (
    <StoreProvider>
      <DashboardPage />
    </StoreProvider>
  );
}
