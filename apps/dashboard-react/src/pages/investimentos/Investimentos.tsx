import React, { useCallback } from "react";
import { useSelector, useDispatch, Provider } from "react-redux";
import { fetchBalance } from "../../../../store/slices/balanceSlice";
import { AppDispatch, RootState, store } from "../../../../store/store";

import { Box } from "@mui/material";

import CardBalance from "../../../../components/my-cards/card-balance/card-balance";
import CadInvestments from "../../../../components/my-cards/cad-investments/cad-investments";
import SavingsGoalWidget from "../../../../components/widgets/savings-goal-widget";
import SpendingAlertWidget from "../../../../components/widgets/spending-alert-widget";

import type { DashboardData } from "../../../../interfaces/dashboard";
import dashboardData from "../../../../mocks/dashboard-data.json";
import FinancialChart from "../../../../components/charts/financialChart";
import WidgetPreferencesButton from "../../../../components/widgets/widget-preferences-button";
import { useWidgetPreferences } from "../../../../hooks/use-widget-preferences";
import {
  fetchTransactions,
  saveTransactions,
  deleteTransactions,
  SavePayload,
} from "../../../../store/slices/transactionsSlice";
import { tw } from "twind";
import CardListExtract, {
  TxWithFiles,
} from "@my-cards/card-list-extract/card-list-extract";

//
// 1) Componente “puro” sem Provider:
//
function InvestimentosPage() {
  const data = dashboardData as DashboardData;
  const dispatch = useDispatch<AppDispatch>();

  // === saldo via Redux ===
  const { value: balanceValue } = useSelector(
    (state: RootState) => state.balance
  );

  const {
    items: transactions,
    status: transactionsStatus,
    hasMore,
    currentPage,
  } = useSelector((state: RootState) => state.transactions);

  const { preferences } = useWidgetPreferences();

  const fetchNextPage = useCallback(() => {
    if (transactionsStatus !== "loading" && hasMore) {
      void dispatch(fetchTransactions(currentPage + 1));
    }
  }, [dispatch, transactionsStatus, hasMore, currentPage]);

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
    <Box
      className={tw`w-full min-h-screen flex flex-col justify-center px-4 py-6 lg:px-12 bg-[#E4EDE3]`}
    >
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

        <Box className={tw`flex flex-col md:grid md:grid-cols-3 gap-6`}>
          {/* coluna esquerda */}
          <Box className={tw`flex flex-col gap-6 w-ful col-span-2`}>
            {/* Balance agora com valor do Redux */}
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
            <CadInvestments
              balance={{ ...data.balance, value: balanceValue }}
              investments={data.investments.map((inv) => ({
                id: String(inv.id),
                label: inv.label,
                value: inv.value,
              }))}
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

//
// 2) Wrapper que provê o Redux Store via Provider:
//
export default function Investimentos() {
  return (
    <Provider store={store}>
      <InvestimentosPage />
    </Provider>
  );
}
