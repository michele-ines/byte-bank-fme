import React, { useEffect, useMemo, useState, useRef } from "react";
import {
  Box,
  Button,
  IconButton,
  TextField,
  Typography,
  Chip,
  Tooltip,
  Checkbox,
  Select,
  MenuItem,
  Input,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import clsx from "clsx";

// --- MODIFICAÇÃO 1: Importa o nosso novo serviço de upload ---
// (Certifique-se de que o caminho para o arquivo está correto)
import { deleteFile, uploadFile } from "../../../dashboard-react/src/services/uploadService"; 

import {
  formatBRL,
  formatTipo,
  maskCurrency,
  parseBRL,
} from "../../../utils/currency-formatte/currency-formatte";

import "./card-list-extract.css";
import SkeletonListExtract from "apps/components/skeleton-list-extract/skeleton-list-extract";
import { ReceiptLongOutlinedIcon } from "apps/components/ui";
import InfiniteScrollSentinel from "apps/components/infinite-scroll-sentinel/infinite-scroll-sentinel";

// --- Interfaces (sem alterações) ---
interface Attachment {
  url: string;
  name: string;
}

interface Transaction {
  _id: number;
  tipo: string;
  valor: number | string;
  createdAt: string;
  updatedAt: string;
  anexos?: Attachment[];
}

interface TxWithFiles extends Transaction {
  novosAnexos?: File[];
}

interface CardListExtractProps {
  transactions: Transaction[];
  fetchPage: () => void;
  isPageLoading: boolean;
  onSave?: (transactions: Transaction[]) => Promise<void> | void;
  onDelete: (transactionIds: number[]) => Promise<void>;
  hasMore?: boolean;
}

const formatDateBR = (dateString: string): string => {
  const date = new Date(dateString);
  return date.toLocaleDateString("pt-BR");
};

const CardListExtract: React.FC<CardListExtractProps> = ({
  transactions,
  fetchPage,
  isPageLoading,
  onSave,
  onDelete,
  hasMore = false,
}) => {
  // --- Estado e Hooks (sem alterações) ---
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

  // --- Funções e Lógica (com a modificação no handleAttachFiles) ---
  useEffect(() => {
    if (transactions) {
      setEditableTransactions(
        transactions.map((tx) => ({
          ...tx,
          valor: typeof tx.valor === "string" ? parseFloat(tx.valor) : tx.valor,
          anexos: Array.isArray(tx.anexos) ? tx.anexos : [],
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
      const matchesStart =
        !startDate || txDate >= new Date(`${startDate}T00:00`);
      const matchesEnd = !endDate || txDate <= new Date(`${endDate}T23:59:59`);
      return matchesType && matchesStart && matchesEnd;
    });
  }, [editableTransactions, typeFilter, startDate, endDate]);

  const handleEditClick = () => {
    setIsEditing(true);
    setTimeout(() => firstEditRef.current?.focus());
  };

  const handleCancelClick = () => {
    setIsEditing(false);
    setEditableTransactions(transactions ?? []);
  };

  const handleDeleteClick = () => {
    setIsDeleting(true);
    setSelectedTransactions([]);
  };

  const handleCancelDeleteClick = () => {
    setIsDeleting(false);
    setSelectedTransactions([]);
  };

  const handleCheckboxChange = (id: number) =>
    setSelectedTransactions((prev) =>
      prev.includes(id) ? prev.filter((n) => n !== id) : [...prev, id]
    );

  const handleTransactionChange = (
    index: number,
    field: keyof Transaction,
    value: string
  ) => {
    setEditableTransactions((prev) =>
      prev.map((tx, i) => {
        if (i !== index) return tx;
        if (field === "valor") return { ...tx, valor: parseBRL(value) };
        return { ...tx, [field]: value };
      })
    );
  };

  // --- MODIFICAÇÃO 2: A função de anexar agora se comunica com o backend ---
  const handleAttachFiles = async (transactionId: number, files: File[]) => {
    if (files.length === 0) return;

    // Itera sobre cada arquivo que o usuário selecionou
    for (const file of files) {
      // Usa nosso serviço para enviar o arquivo para o backend
      const nomeDoArquivoSalvo = await uploadFile(file);

      // Se o upload deu certo, o backend retorna o nome do arquivo
      if (nomeDoArquivoSalvo) {
        // Atualiza o estado local `editableTransactions` para mostrar o novo anexo
        setEditableTransactions((currentTxs) =>
          currentTxs.map((tx) => {
            // Encontra a transação correta
            if (tx._id === transactionId) {
              // Cria o novo objeto de anexo
              const novoAnexo: Attachment = {
                name: nomeDoArquivoSalvo, // O nome retornado pelo backend
                url: `https://byte-bank-fme-production-aed1.up.railway.app/api/download/${nomeDoArquivoSalvo}`, // O link para download
              };
              // Adiciona o novo anexo à lista de anexos existentes
              return { ...tx, anexos: [...(tx.anexos || []), novoAnexo] };
            }
            return tx;
          })
        );
      } else {
        // Se o upload falhou, informa o usuário
        alert(`Ocorreu um erro ao enviar o arquivo: ${file.name}`);
      }
    }
  };

  const handleRemoveAttachment = async (
    transactionId: number,
    attachmentIdentifier: string, // Pode ser uma URL (antigo) ou um nome de arquivo (novo)
    isNew: boolean
  ) => {
    // Se NÃO for um anexo novo, significa que ele existe no backend.
    if (!isNew) {
      // Extrai o nome do arquivo da URL para enviar ao backend.
      const fileName = attachmentIdentifier.substring(attachmentIdentifier.lastIndexOf("/") + 1);
      
      // Chama nosso serviço para deletar o arquivo físico.
      const success = await deleteFile(fileName);
      
      // Se a exclusão no backend falhar, interrompemos a função.
      if (!success) return;
    }

    // Se a exclusão no backend deu certo (ou se era um anexo novo),
    // atualizamos o estado local do React para remover o anexo da tela.
    setEditableTransactions((currentTxs) =>
      currentTxs.map((tx) => {
        if (tx._id !== transactionId) return tx;

        // Se for um anexo novo (que só existe no frontend)
        if (isNew) {
          return {
            ...tx,
            novosAnexos: tx.novosAnexos?.filter(
              (f) => f.name !== attachmentIdentifier
            ),
          };
        } else { // Se for um anexo antigo (que veio da API)
          return {
            ...tx,
            anexos: tx.anexos?.filter((a) => a.url !== attachmentIdentifier),
          };
        }
      })
    );
  };

  const handleSaveOrDeleteClick = async () => {
    if (isEditing) {
      if (onSave) {
        const transactionsToSave = editableTransactions.map((tx) => ({
          ...tx,
          valor: typeof tx.valor === "string" ? parseBRL(tx.valor as string) : tx.valor,
        }));
        setStatusMsg("Salvando transações...");
        await onSave(transactionsToSave);
        setStatusMsg("Transações salvas!");
      }
      setIsEditing(false);
      setTimeout(() => setStatusMsg(""), 4000);
      return;
    }

    if (isDeleting) {
      if (!selectedTransactions.length) return;
      setIsDeletingInProgress(true);
      setStatusMsg("Excluindo transações…");
      try {
        await onDelete(selectedTransactions);
        setStatusMsg("Transações excluídas!");
      } finally {
        setIsDeletingInProgress(false);
        setIsDeleting(false);
        setSelectedTransactions([]);
        setTimeout(() => setStatusMsg(""), 4000);
      }
    }
  };

  const handleStartDateChange = (v: string) => {
    setStartDate(v);
    setDateError(!isValidDate(v));
  };
  const handleEndDateChange = (v: string) => {
    setEndDate(v);
    setDateError(!isValidDate(v));
  };

  const loadingFirstPage = isPageLoading && editableTransactions.length === 0;
  const hasTransactions = !loadingFirstPage && editableTransactions.length > 0;

  // --- JSX (sem alterações) ---
  return (
    <Box
      className="cardExtrato cardExtrato w-full min-h-[512px]"
      role="region"
      aria-labelledby="extrato-heading"
    >
      <Box className="extratoHeader">
        <h3 id="extrato-heading" className="extratoTitle">Extrato</h3>
        {hasTransactions && !isEditing && !isDeleting && (
          <Box className="extratoActions">
            <IconButton aria-label="editar" className="actionBtn" onClick={handleEditClick}>
              <EditIcon fontSize="small" />
            </IconButton>
            <IconButton aria-label="excluir" className="actionBtn" onClick={handleDeleteClick}>
              <DeleteIcon fontSize="small" />
            </IconButton>
          </Box>
        )}
      </Box>

      {hasTransactions && (
        <Box
          className="flex flex-col md:flex-row gap-4 pb-2"
          sx={{ borderBottom: "1px solid var(--byte-color-green-50)", flexWrap: "wrap" }}
        >
          <Select
            size="small"
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value as "all" | "entrada" | "saida")}
            sx={{ flex: 1, minWidth: { xs: "calc(50% - 4px)", md: 120 } }}
          >
            <MenuItem value="all">Todos</MenuItem>
            <MenuItem value="entrada">Entrada</MenuItem>
            <MenuItem value="saida">Saída</MenuItem>
          </Select>
          <TextField
            label="De" type="date" size="small" value={startDate}
            onChange={(e) => handleStartDateChange(e.target.value)}
            error={dateError} helperText={dateError ? "Data inválida" : ""}
            InputLabelProps={{ shrink: true }}
            sx={{ flex: 1, minWidth: { xs: "calc(50% - 4px)", md: 120 } }}
          />
          <TextField
            label="Até" type="date" size="small" value={endDate}
            onChange={(e) => handleEndDateChange(e.target.value)}
            error={dateError} helperText={dateError ? "Data inválida" : ""}
            InputLabelProps={{ shrink: true }}
            sx={{ flex: 1, minWidth: { xs: "calc(50% - 4px)", md: 120 } }}
          />
        </Box>
      )}

      {loadingFirstPage ? (
        <Box aria-busy="true" aria-label="Carregando">
          <SkeletonListExtract rows={5} />
        </Box>
      ) : dateError || !filteredTransactions.length ? (
        <Box className="flex flex-col items-center justify-center text-center gap-4 py-10">
          {dateError ? (
            <><Typography variant="h6" color="error">Data inválida</Typography><Typography variant="body2" color="text.secondary">Verifique o formato da data inserida.</Typography></>
          ) : (
            <><ReceiptLongOutlinedIcon sx={{ fontSize: 56, color: "text.secondary" }} /><Typography variant="h6">Nenhuma transação encontrada</Typography><Typography variant="body2" color="text.secondary">Ajuste os filtros ou adicione uma nova transação para começar.</Typography></>
          )}
        </Box>
      ) : (
        <>
          <ul role="list" aria-busy={isPageLoading} className="space-y-4">
            {filteredTransactions.map((tx, idx) => {
              const hasExistingAttachment =
                (tx.anexos?.length ?? 0) > 0 || (tx.novosAnexos?.length ?? 0) > 0;
              return (
                <li key={tx._id ?? `tx-${idx}`}>
                  <Box className="extratoItem" style={{ gap: isEditing ? 0 : undefined }}>
                    <Box className="txRow">
                      {isEditing ? (
                        <Input
                          disableUnderline className="txType" fullWidth
                          value={formatTipo(tx.tipo)}
                          onChange={(e) => handleTransactionChange(idx, "tipo", e.target.value)}
                          inputProps={{ style: { textAlign: "left" } }}
                          inputRef={idx === 0 ? firstEditRef : undefined}
                        />
                      ) : (
                        <span className="txType">{formatTipo(tx.tipo)}</span>
                      )}
                      <span className="txDate">{formatDateBR(tx.createdAt)}</span>
                    </Box>
                    {isEditing ? (
                      <Box className="flex items-center gap-2 w-full">
                        <Input
                          disableUnderline
                          className={clsx("txValue txValueEditable")}
                          sx={{ flex: 1 }}
                          value={formatBRL(
                            typeof tx.valor === "number" ? tx.valor : parseBRL(tx.valor)
                          )}
                          onChange={(e) =>
                            handleTransactionChange(idx, "valor", maskCurrency(e.target.value))
                          }
                          inputProps={{ inputMode: "decimal", title: "Até 999.999,99" }}
                        />
                        <input
                          hidden multiple accept="image/*,application/pdf"
                          id={`edit-anexos-${tx._id}`} type="file"
                          aria-label="Selecionar arquivos para anexar"
                          disabled={hasExistingAttachment}
                          onChange={(e) => {
                            const files = e.target.files;
                            if (files) {
                              handleAttachFiles(tx._id, Array.from(files));
                            }
                          }}
                        />
                        <label htmlFor={`edit-anexos-${tx._id}`}>
                          <Tooltip
                            title={
                              hasExistingAttachment
                                ? "Remova o anexo atual para adicionar um novo"
                                : "Anexar arquivos"
                            }
                          >
                            <span>
                              <IconButton
                                component="span" size="small" color="primary"
                                aria-label="Anexar arquivos"
                                disabled={hasExistingAttachment}
                              >
                                <AttachFileIcon fontSize="inherit" aria-hidden="true" />
                              </IconButton>
                            </span>
                          </Tooltip>
                        </label>
                      </Box>
                    ) : (
                      <Box className="flex items-center">
                        {isDeleting && (
                          <Checkbox
                            aria-label={`Selecionar transação ${formatBRL(
                              Math.abs(typeof tx.valor === "number" ? tx.valor : parseBRL(tx.valor))
                            )}`}
                            checked={selectedTransactions.includes(tx._id)}
                            onChange={() => handleCheckboxChange(tx._id)}
                            size="small"
                            className="mr-2"
                            sx={{
                              color: "var(--byte-color-dash)",
                              "&.Mui-checked": { color: "var(--byte-color-dash)" },
                            }}
                          />
                        )}
                        <span className="txValue">
                          {typeof tx.valor === "number" && tx.valor < 0 && "-"}
                          {formatBRL(
                            typeof tx.valor === "number" ? tx.valor : parseBRL(tx.valor)
                          )}
                        </span>
                        {tx.anexos?.length ? (
                          <Tooltip title={`${tx.anexos.length} anexo(s)`}>
                            <AttachFileIcon
                              sx={{ fontSize: 16, ml: 0.5, color: "var(--byte-color-dash)" }}
                              aria-hidden="true"
                            />
                          </Tooltip>
                        ) : null}
                      </Box>
                    )}
                  </Box>
                  {(tx.anexos?.length || tx.novosAnexos?.length) ? (
                    <Box className="flex flex-wrap gap-2 mt-2 ml-2">
                      {tx.anexos?.map((a: Attachment) => (
                        <Chip
                          key={a.url}
                          label={a.name}
                          size="small"
                          icon={<AttachFileIcon sx={{ fontSize: 14 }} />}
                          component={!isEditing ? "a" : "div"}
                          href={!isEditing ? a.url : undefined}
                          target={!isEditing ? "_blank" : undefined}
                          clickable={!isEditing}
                          onDelete={
                            isEditing
                              ? () => {
                                void handleRemoveAttachment(tx._id, a.url, false);
                              }
                              : undefined
                          }
                          sx={{
                            backgroundColor: "var(--byte-color-green-50)",
                            ":hover": { bgcolor: "var(--byte-color-green-100)" },
                          }}
                        />
                      ))}
                      {isEditing &&
                        tx.novosAnexos?.map((f, i) => (
                          <Chip
                            key={i}
                            label={f.name}
                            size="small"
                            color="info"
                            variant="outlined"
                            icon={<AttachFileIcon sx={{ fontSize: 14 }} />}
                            onDelete={() => {
                              void handleRemoveAttachment(tx._id, f.name, true);
                            }}
                          />
                        ))}
                    </Box>
                  ) : null}
                </li>
              );
            })}
          </ul>
          <Box aria-busy={isPageLoading}>
            <InfiniteScrollSentinel
              onVisible={() => {
                void fetchPage();
              }}
              disabled={!hasMore || isPageLoading}
              isLoading={isPageLoading}
            />
          </Box>
          {isPageLoading && editableTransactions.length > 0 && (
            <SkeletonListExtract rows={5} />
          )}
        </>
      )}

      {(isEditing || isDeleting) && (
        <Box className="flex gap-2 justify-between mt-4">
          <Button
            onClick={() => {
              void handleSaveOrDeleteClick();
            }}
            className={clsx(
              "botaoSalvar",
              isDeleting && (isDeletingInProgress || !selectedTransactions.length) && "opacity-50 cursor-not-allowed"
            )}
            disabled={isDeleting && (isDeletingInProgress || !selectedTransactions.length)}
          >
            {isEditing ? "Salvar" : isDeletingInProgress ? "Excluindo..." : "Excluir"}
          </Button>
          <Button
            onClick={isEditing ? handleCancelClick : handleCancelDeleteClick}
            className="botaoCancelar"
            disabled={isDeleting && isDeletingInProgress}
          >
            Cancelar
          </Button>
        </Box>
      )}

      <Box role="status" aria-live="polite" sx={{ position: "absolute", left: -9999 }}>
        {statusMsg}
      </Box>
    </Box>
  );
};

export default CardListExtract;