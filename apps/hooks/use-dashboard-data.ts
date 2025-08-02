import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { fetchTransactions } from "@store/slices/transactionsSlice";
import { fetchBalance } from "@store/slices/balanceSlice";
import { AppDispatch } from "@store/store";

export const useDashboardData = () => {
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    const loadInitialData = async () => {
      try {
        // 1. Busca as transações e ESPERA a conclusão.
        await dispatch(fetchTransactions()).unwrap();
        
        // 2. SÓ DEPOIS que as transações terminaram, dispara o cálculo do saldo.
        dispatch(fetchBalance());

      } catch (error) {
        console.error("Falha ao carregar dados iniciais:", error);
      }
    };

    void loadInitialData();
  }, [dispatch]);
};