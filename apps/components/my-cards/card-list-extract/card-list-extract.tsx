import React, { useEffect, useMemo, useState, useRef } from "react";
import {
  Box,
  Button,
  DeleteIcon,
  EditIcon,
  IconButton,
  Input,
  TextField,
  MenuItem,
  Checkbox,
  Typography,
  ReceiptLongOutlinedIcon,
  CardListExtractStyles as styles,
  Select,
  Link,
} from "../../ui";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import Tooltip from "@mui/material/Tooltip";
import clsx from "clsx";
import type { Transaction, Attachment } from "../../../interfaces/dashboard";
import {
  formatBRL,
  formatTipo,
  maskCurrency,
  parseBRL,
} from "../../../utils/currency-formatte/currency-formatte";
import { formatDateBR, parseDateBR } from "../../../utils/date-formatte/date-formatte";
import SkeletonListExtract from "../../../components/skeleton-list-extract/skeleton-list-extract";
import InfiniteScrollSentinel from "../../infinite-scroll-sentinel/infinite-scroll-sentinel";
import { Chip } from "@mui/material";

export interface TxWithFiles extends Transaction {
  novosAnexos?: File[];
}

interface CardListExtractProps {
  transactions: Transaction[];
  fetchPage: () => void;
  hasMore: boolean;
  isPageLoading: boolean;
  onDelete: (transactionIds: number[]) => Promise<void>;
  atualizaSaldo: () => void;
}

const CardListExtract: React.FC<CardListExtractProps> = ({
  transactions,
  fetchPage,
  hasMore,
  isPageLoading,
  onDelete,
  atualizaSaldo,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editableTransactions, setEditableTransactions] = useState<TxWithFiles[]>([]);
  const [isDeleting, setIsDeleting] = useState(false);
  const [selectedTransactions, setSelectedTransactions] = useState<number[]>([]);
  const [isDeletingInProgress, setIsDeletingInProgress] = useState(false);
  const firstEditRef = useRef<HTMLInputElement>(null);
  const [statusMsg, setStatusMsg] = useState("");
  const [typeFilter, setTypeFilter] = useState<"all" | "entrada" | "saida">("all");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [dateError, setDateError] = useState(false);

  useEffect(() => {
    if (transactions) {
      setEditableTransactions(
        transactions.map((tx) => ({
          ...tx,
          valor: typeof tx.valor === "string" ? parseFloat(tx.valor) : tx.valor,
        }))
      );
    }
  }, [transactions]);

  const isValidDate = (v: string) => v === "" || !Number.isNaN(Date.parse(v));

  const filteredTransactions = useMemo(() => {
    const tiposEntrada = ["cambio", "deposito"];
    const tiposSaida = ["transferencia"];
    return editableTransactions.filter((tx) => {
      const matchesType =
        typeFilter === "all" ||
        (typeFilter === "entrada" && tiposEntrada.includes(tx.tipo)) ||
        (typeFilter === "saida" && tiposSaida.includes(tx.tipo));
      const txDate = new Date(tx.createdAt);
      const matchesStart = !startDate || txDate >= new Date(`${startDate}T00:00`);
      const matchesEnd = !endDate || txDate <= new Date(`${endDate}T23:59:59`);
      return matchesType && matchesStart && matchesEnd;
    });
  }, [editableTransactions, typeFilter, startDate, endDate]);

  // ... rest of handlers and rendering logic remain unchanged

  return (
    <Box className={`${styles.cardExtrato} cardExtrato w-full min-h-[512px]`} role="region" aria-labelledby="extrato-heading">
      {/* JSX content as before */}
    </Box>
  );
};

export default CardListExtract;
