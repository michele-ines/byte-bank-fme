import React, { useCallback } from "react";
import { Provider, useDispatch, useSelector } from "react-redux";
import { fetchBalance } from "../../../../store/slices/balanceSlice";
import CardBalance from "../../../../components/my-cards/card-balance/card-balance";
import CardsOtherService from "../../../../components/my-cards/card-other-services/card-other-services";
import SavingsGoalWidget from "../../../../components/widgets/savings-goal-widget";
import SpendingAlertWidget from "../../../../components/widgets/spending-alert-widget";
import { Box } from "@mui/material";

import {
  fetchTransactions,
  saveTransactions,
  deleteTransactions,
  SavePayload,
} from "../../../../store/slices/transactionsSlice";
import type { DashboardData } from "../../../../interfaces/dashboard";
import dashboardData from "../../../../mocks/dashboard-data.json";
import FinancialChart from "../../../../components/charts/financialChart";
import WidgetPreferencesButton from "../../../../components/widgets/widget-preferences-button";
import { useWidgetPreferences } from "../../../../hooks/use-widget-preferences";
import { AppDispatch, RootState, store } from "../../../../store/store";
import { tw } from "twind";
import CardListExtract, {
  TxWithFiles,
} from "@my-cards/card-list-extract/card-list-extract";

function OutrosServicosContent() {
  const data = dashboardData as DashboardData;
  const dispatch = useDispatch<AppDispatch>();

  // === saldo via Redux ===
  const { value: balanceValue } = useSelector(
    (state: RootState) => state.balance
  );

  /* paginação */
  const {
    items: transactions,
    status: transactionsStatus,
    hasMore,
    currentPage,
  } = useSelector((state: RootState) => state.transactions);

  /* prefs dos widgets */
  const { preferences } = useWidgetPreferences();

  /* callbacks do extrato */
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

export default function OutrosServicos() {
  return (
    <Provider store={store}>
      <OutrosServicosContent />
    </Provider>
  );
}
