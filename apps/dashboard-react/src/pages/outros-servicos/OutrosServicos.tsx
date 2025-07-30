import React, { useEffect, useCallback } from 'react';
import { Provider, useDispatch, useSelector } from 'react-redux';
import { fetchBalance } from '../../../../store/slices/balanceSlice';
import CardBalance from '../../../../components/my-cards/card-balance/card-balance';
import CardsOtherService from '../../../../components/my-cards/card-other-services/card-other-services';
// import CardListExtract from '../../../../components/my-cards/card-list-extract/card-list-extract';
import SavingsGoalWidget from '../../../../components/widgets/savings-goal-widget';
import SpendingAlertWidget from '../../../../components/widgets/spending-alert-widget';

import type { DashboardData, Transaction } from '../../../../interfaces/dashboard';
import dashboardData from '../../../../mocks/dashboard-data.json';
import { handleRequest } from '../../../../utils/error-handlers/error-handle';
import { usePaginatedTransactions } from '../../../../hooks/use-paginated-transactions';
import FinancialChart from '../../../../components/charts/financialChart';
import WidgetPreferencesButton from '../../../../components/widgets/widget-preferences-button';
import { useWidgetPreferences } from '../../../../hooks/use-widget-preferences';
import { AppDispatch, RootState, store } from '../../../../store/store';

function OutrosServicosContent() {
  const data = dashboardData as DashboardData;
  const dispatch = useDispatch<AppDispatch>();

  // === saldo via Redux ===
  const { value: balanceValue } = useSelector((state: RootState) => state.balance);

  const handleAtualizaSaldo = useCallback(async () => {
    await dispatch(fetchBalance());
  }, [dispatch]);

  useEffect(() => {
    void handleAtualizaSaldo();
  }, [handleAtualizaSaldo]);

  /* paginação */
  const { transactions, fetchPage, refresh, hasMore, isLoading: isPageLoading } =
    usePaginatedTransactions();

  /* prefs dos widgets */
  const { preferences } = useWidgetPreferences();

  /* callbacks do extrato */
  const handleSaveTransactions = async (txs: Transaction[]) => {
    await handleRequest(async () => {
      await Promise.all(
        txs.map(async (tx) =>
          fetch(`/api/transacao/${tx._id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
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
      await Promise.all(ids.map((id) => fetch(`/api/transacao/${id}`, { method: 'DELETE' })));
      await refresh();
      await handleAtualizaSaldo();
    });
  };

  return (
    <div className="w-full min-h-screen px-4 py-6 lg:px-12" style={{ backgroundColor: '#E4EDE3' }}>
      <div className="font-sans max-w-screen-xl mx-auto">
        {/* botão de preferências */}
        <div className="flex justify-end mb-4">
          <WidgetPreferencesButton />
        </div>

        <div className="flex flex-col lg:flex-row gap-y-6 lg:gap-x-6 lg:ml-8">
          {/* coluna esquerda */}
          <div className="flex flex-col gap-6 w-full lg:w-[calc(55.666%-12px)]">
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
          </div>

          {/* coluna direita – extrato */}
          <div className="max-w-full flex flex-col">
            <div className="flex-1 overflow-y-auto max-h-[800px]">
              {/* <CardListExtract
                transactions={transactions}
                fetchPage={() => void fetchPage()}
                hasMore={hasMore}
                isPageLoading={isPageLoading}
                onDelete={handleDeleteTransactions}
                atualizaSaldo={() => void handleAtualizaSaldo()}
              /> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function OutrosServicos() {
  return (
    <Provider store={store}>
      <OutrosServicosContent />
    </Provider>
  );
}
