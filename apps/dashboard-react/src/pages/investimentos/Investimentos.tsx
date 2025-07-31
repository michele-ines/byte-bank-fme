import React, { useEffect, useCallback } from "react";
import { useSelector, useDispatch, Provider } from "react-redux";
import { fetchBalance } from "../../../../store/slices/balanceSlice";
import { AppDispatch, RootState, store } from "../../../../store/store";

import { Box } from "@mui/material";

import CardBalance from "../../../../components/my-cards/card-balance/card-balance";
import CadInvestments from "../../../../components/my-cards/cad-investments/cad-investments";
import SavingsGoalWidget from "../../../../components/widgets/savings-goal-widget";
import SpendingAlertWidget from "../../../../components/widgets/spending-alert-widget";

import type {
  DashboardData,
  Transaction,
} from "../../../../interfaces/dashboard";
import dashboardData from "../../../../mocks/dashboard-data.json";
import { handleRequest } from "../../../../utils/error-handlers/error-handle";
import { usePaginatedTransactions } from "../../../../hooks/use-paginated-transactions";
import FinancialChart from "../../../../components/charts/financialChart";
import WidgetPreferencesButton from "../../../../components/widgets/widget-preferences-button";
import { useWidgetPreferences } from "../../../../hooks/use-widget-preferences";
import { tw } from "twind";

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

  const handleAtualizaSaldo = useCallback(async () => {
    await dispatch(fetchBalance());
  }, [dispatch]);

  useEffect(() => {
    void handleAtualizaSaldo();
  }, [handleAtualizaSaldo]);

  const {
    transactions,
    fetchPage,
    refresh,
    hasMore,
    isLoading: isPageLoading,
  } = usePaginatedTransactions();

  const { preferences } = useWidgetPreferences();

  const handleSaveTransactions = async (txs: Transaction[]) => {
    await handleRequest(async () => {
      await Promise.all(
        txs.map(async (tx) =>
          fetch(`/api/transacao/${tx._id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ tipo: tx.tipo, valor: tx.valor }),
          })
        )
      );
      await refresh();
      await handleAtualizaSaldo();
    });
  };

  const handleDeleteTransactions = async (ids: number[]) => {
    await handleRequest(async () => {
      await Promise.all(
        ids.map(async (id) =>
          fetch(`/api/transacao/${id}`, { method: "DELETE" })
        )
      );
      await refresh();
      await handleAtualizaSaldo();
    });
  };

  return (
    // <Box className="w-full min-h-screen px-4 py-6 lg:px-12 bg-[var(--byte-bg-dashboard)]">
    //   <Box className="font-sans max-w-screen-xl mx-auto">
    //     {/* botão de personalização */}
    //     <Box className="flex justify-end mb-4">
    //       <WidgetPreferencesButton />
    //     </Box>

    //     <Box className="flex flex-col lg:flex-row gap-y-6 lg:gap-x-6 lg:ml-8">
    //       {/* coluna esquerda */}
    //       <Box className="flex flex-col gap-6 w-full lg:w-[calc(55.666%-12px)]">
    //         {/* Balance agora com valor do Redux */}
    //         <CardBalance
    //           user={data.user}
    //           balance={{ ...data.balance, value: balanceValue }}
    //         />

    //         <FinancialChart />

    //         {preferences.spendingAlert && (
    //           <SpendingAlertWidget limit={2000} transactions={transactions} />
    //         )}
    //         {preferences.savingsGoal && (
    //           <SavingsGoalWidget goal={3000} transactions={transactions} />
    //         )}

    //         {/* Mapeando id:number → id:string */}
    //         <CadInvestments
    //           balance={{ ...data.balance, value: balanceValue }}
    //           investments={data.investments.map((inv) => ({
    //             id: String(inv.id),
    //             label: inv.label,
    //             value: inv.value,
    //           }))}
    //         />
    //       </Box>

    //       {/* coluna direita – extrato */}
    //       <Box className="max-w-full flex flex-col">
    //         <div className="flex-1 overflow-y-auto max-h-[800px]">
    //           {/* seu CardListExtract aqui */}
    //         </div>
    //       </Box>
    //     </Box>
    //   </Box>
    // </Box>
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
          <Box className={tw`flex flex-col`}>
            <div className={tw`flex-1 overflow-y-auto max-h-[800px]`}>
              {/* <CardListExtract
                transactions={transactions}
                fetchPage={() => {
                  void fetchPage();
                }}
                hasMore={hasMore}
                isPageLoading={isPageLoading}
                onSave={(txs) => {
                  void handleSaveTransactions(txs);
                }}
                onDelete={handleDeleteTransactions}
                atualizaSaldo={() => {
                  void handleAtualizaSaldo();
                }}
              /> */}
            </div>
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
