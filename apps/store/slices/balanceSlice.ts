import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { BalanceState, Transaction } from "../../interfaces/dashboard";

// 1. Importamos o RootState para que o thunk saiba como é a "forma" do nosso estado geral
import { RootState } from "../store"; 

// =================================================================
// A ÚNICA MUDANÇA REAL ACONTECE DENTRO DO SEU THUNK
// =================================================================
export const fetchBalance = createAsyncThunk<
  number,
  void,
  { state: RootState; rejectValue: string } // Adicionamos o 'state' aqui
>("balance/fetchBalance", async (_, { getState, rejectWithValue }) => {
  try {
    // 2. Em vez de 'fetch', usamos 'getState()' para pegar o estado atual do Redux
    const state = getState();
    const transactions = state.transactions.items; // Pega a lista de transações
    
    // 3. A lógica de cálculo que você queria
    const total = transactions
      .filter(tx => tx.tipo === 'deposito' || tx.tipo === 'cambio')
      .reduce((sum, tx) => {
        const value = typeof tx.valor === 'string' ? parseFloat(tx.valor) : tx.valor;
        return sum + (isNaN(value) ? 0 : value);
      }, 0);
      
    return total; // 4. Retorna o valor calculado

  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Erro inesperado ao calcular o saldo";
    return rejectWithValue(message);
  }
});

// O resto do seu slice continua EXATAMENTE IGUAL.
const initialState: BalanceState = {
  value: 0,
  status: "idle",
  error: null,
};

const balanceSlice = createSlice({
  name: "balance",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchBalance.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchBalance.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.value = action.payload; // O payload agora é o total calculado
      })
      .addCase(fetchBalance.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload ?? "Erro desconhecido";
      });
  },
});

export default balanceSlice.reducer;