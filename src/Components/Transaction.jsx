import React from "react";
import {
  TableRow,
  TableCell,
  IconButton,
  styled,
  Typography,
  useTheme,
  Tooltip,
  Box,
  Divider,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EventIcon from "@mui/icons-material/Event";
import { CategoryRounded } from "@mui/icons-material";

const Container = styled(TableRow)(({ theme }) => ({
  transition: "all 0.3s ease",
  "&:hover": {
    backgroundColor:
      theme.palette.mode === "dark"
        ? theme.palette.action.hover
        : theme.palette.grey[100],
  },
  "@media (max-width:700px)": {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    marginBottom: "30px",
    borderRadius: "20px",
    padding: "26px",
    background:
      theme.palette.mode === "dark"
        ? "rgba(30,41,59,0.7)"
        : "rgba(255,255,255,0.8)",
    backdropFilter: "blur(10px)",
    boxShadow:
      theme.palette.mode === "dark"
        ? "0 6px 16px rgba(0,0,0,0.5)"
        : "0 6px 16px rgba(0,0,0,0.15)",
  },
}));

const AmountText = styled(Typography)(({ type }) => ({
  fontWeight: "600",
  fontSize: "1.1rem",
  color: type === "income" ? "#22c55e" : "#ef4444",
}));

const MobileRow = styled(Box)(({ theme }) => ({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  width: "100%",
  marginTop: "10px",
}));

const Transaction = ({ transaction, setTransactions, transactions }) => {
  const theme = useTheme();

  const deleteTransaction = (id) => {
    setTransactions(transactions.filter((t) => t.id !== id));
  };

  const transactionDate = new Date(transaction.date).toLocaleDateString(
    "en-IN",
    {
      day: "2-digit",
      month: "short",
      year: "numeric",
    }
  );

  return (
    <Container>
      {/* Desktop Table View */}
      <TableCell
        sx={{
          display: { xs: "none", md: "table-cell" },
        }}
      >
        <Typography fontWeight="600">{transaction.text}</Typography>
      </TableCell>

      <TableCell
        sx={{
          display: { xs: "none", md: "table-cell" },
        }}
      >
        <AmountText type={transaction.amount > 0 ? "income" : "expense"}>
          {transaction.amount > 0 ? "💸 " : "📉 "}₹
          {Math.abs(transaction.amount).toLocaleString("en-IN")}
        </AmountText>
      </TableCell>

      <TableCell
        sx={{
          display: { xs: "none", md: "table-cell" },
        }}
      >
        <Typography
          display="flex"
          alignItems="center"
          gap="4px"
          color="text.secondary"
        >
          <EventIcon fontSize="small" /> {transactionDate}
        </Typography>
      </TableCell>

      <TableCell
        align="center"
        sx={{
          display: { xs: "none", md: "table-cell" },
        }}
      >
        <Tooltip title="Delete Transaction">
          <IconButton
            onClick={() => deleteTransaction(transaction.id)}
            sx={{
              color: theme.palette.error.main,
              "&:hover": {
                bgcolor: theme.palette.error.light,
                color: "#fff",
              },
            }}
          >
            <DeleteIcon />
          </IconButton>
        </Tooltip>
      </TableCell>

      {/* Mobile Card View */}
      <Box
        sx={{
          display: { xs: "flex", md: "none" },
          flexDirection: "column",
          width: "100%",
        }}
      >
        <Box display="flex" alignItems="center" gap="10px">
          <CategoryRounded
            sx={{ fontSize: 22, color: theme.palette.primary.main }}
          />
          <Typography fontWeight="600" flexGrow={1}>
            {transaction.text}
          </Typography>
          <Tooltip title="Delete Transaction">
            <IconButton
              onClick={() => deleteTransaction(transaction.id)}
              sx={{
                color: theme.palette.error.main,
                "&:hover": {
                  bgcolor: theme.palette.error.light,
                  color: "#fff",
                },
              }}
            >
              <DeleteIcon fontSize="small" />
            </IconButton>
          </Tooltip>
        </Box>

        <Divider sx={{ my: 1 }} />

        <MobileRow>
          <AmountText type={transaction.amount > 0 ? "income" : "expense"}>
            {transaction.amount > 0 ? "💸 Income" : "📉 Expense"}: ₹
            {Math.abs(transaction.amount).toLocaleString("en-IN")}
          </AmountText>
          <Typography
            display="flex"
            alignItems="center"
            gap="4px"
            color="text.secondary"
            fontSize="0.9rem"
          >
            <EventIcon fontSize="small" /> {transactionDate}
          </Typography>
        </MobileRow>
      </Box>
    </Container>
  );
};

export default Transaction;
