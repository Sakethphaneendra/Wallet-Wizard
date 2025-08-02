import React, { useState } from "react";
import {
  Box,
  Typography,
  Button,
  styled,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  InputAdornment,
  useTheme,
  Divider,
  Autocomplete,
  TextField,
} from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";
import { CurrencyRupeeRounded, CategoryRounded } from "@mui/icons-material";

const suggestions = [
  "Rent",
  "Salary",
  "WiFi",
  "Trip",
  "Travel",
  "EMI",
  "Bills",
  "Groceries",
  "Shopping",
  "Electricity",
  "Subscriptions",
];

const Container = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  padding: "24px",
  borderRadius: "20px",
  background:
    theme.palette.mode === "dark"
      ? "rgba(30,41,59,0.7)"
      : "rgba(255, 255, 255, 0.9)",
  backdropFilter: "blur(16px)",
  boxShadow:
    theme.palette.mode === "dark"
      ? "0 10px 30px rgba(0,0,0,0.5)"
      : "0 10px 30px rgba(0,0,0,0.12)",
  maxWidth: "800px",
  margin: "0 auto",
  transition: "all 0.3s ease",
  "& > *": { marginTop: "26px" },
}));

const RowContainer = styled(Box)(() => ({
  display: "flex",
  gap: "20px",
  alignItems: "center",
  "@media (max-width:600px)": {
    flexDirection: "column",
    gap: "16px",
  },
}));

const StyledButton = styled(Button)(({ theme }) => ({
  padding: "16px",
  borderRadius: "14px",
  background: "linear-gradient(90deg, #166abd, #38bdf8)",
  color: "#fff",
  fontWeight: "600",
  fontSize: "1rem",
  textTransform: "none",
  marginTop: "28px",
  "&:hover": {
    background: "linear-gradient(90deg, #1d4ed8, #3b82f6)",
  },
}));

const NewTransaction = ({ setTransactions }) => {
  const theme = useTheme();
  const [text, setText] = useState("");
  const [amount, setAmount] = useState("");
  const [selectedDate, setSelectedDate] = useState(dayjs());
  const [transactionType, setTransactionType] = useState("expense");

  const addTransaction = () => {
    if (!text || !amount || isNaN(amount)) return;

    const transaction = {
      id: Math.floor(Math.random() * 10000000),
      text,
      amount:
        transactionType === "expense"
          ? -Math.abs(Number(amount))
          : +Math.abs(Number(amount)),
      date: selectedDate.toDate().toLocaleString(),
    };

    setTransactions((prev) => [transaction, ...prev]);
    setText("");
    setAmount("");
    setSelectedDate(dayjs());
    setTransactionType("expense");
  };

  return (
    <Container>
      <Typography
        variant="h5"
        sx={{ marginTop: "0px", fontWeight: "700", textAlign: "center" }}
      >
        ➕ Add New Transaction
      </Typography>

      <Divider sx={{ my: 1 }} />

      <Autocomplete
        freeSolo
        options={suggestions}
        value={text}
        onInputChange={(event, newValue) => setText(newValue)}
        renderInput={(params) => (
          <TextField
            {...params}
            label="Expense / Income Title"
            InputProps={{
              ...params.InputProps,
              startAdornment: (
                <InputAdornment position="start">
                  <CategoryRounded color="primary" />
                </InputAdornment>
              ),
            }}
            sx={{
              "& .MuiInputBase-root": {
                borderRadius: "12px",
                backgroundColor: theme.palette.mode === "dark" ? "#1e293b" : "#f7f7f7",
                boxShadow:
                  theme.palette.mode === "dark"
                    ? "0 4px 12px rgba(0,0,0,0.5)"
                    : "0 4px 12px rgba(0,0,0,0.08)",
              },
            }}
          />
        )}
      />

      <TextField
        label="Amount (₹)"
        type="number"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        fullWidth
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <CurrencyRupeeRounded color="success" />
            </InputAdornment>
          ),
        }}
        sx={{
          "& .MuiInputBase-root": {
            borderRadius: "12px",
            backgroundColor: theme.palette.mode === "dark" ? "#1e293b" : "#f7f7f7",
            boxShadow:
              theme.palette.mode === "dark"
                ? "0 4px 12px rgba(0,0,0,0.5)"
                : "0 4px 12px rgba(0,0,0,0.08)",
          },
        }}
      />

      <RowContainer>
        <FormControl fullWidth>
          <InputLabel>Type</InputLabel>
          <Select
            value={transactionType}
            onChange={(e) => setTransactionType(e.target.value)}
            sx={{ borderRadius: "12px" }}
          >
            <MenuItem value="income">Income</MenuItem>
            <MenuItem value="expense">Expense</MenuItem>
          </Select>
        </FormControl>

        <FormControl fullWidth>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              label="Select Date"
              value={selectedDate}
              onChange={(newDate) => setSelectedDate(newDate)}
              maxDate={dayjs()}
              slotProps={{
                textField: {
                  fullWidth: true,
                  sx: {
                    "& .MuiInputBase-root": {
                      borderRadius: "12px",
                      backgroundColor:
                        theme.palette.mode === "dark" ? "#1e293b" : "#f7f7f7",
                      boxShadow:
                        theme.palette.mode === "dark"
                          ? "0 4px 12px rgba(0,0,0,0.5)"
                          : "0 4px 12px rgba(0,0,0,0.08)",
                    },
                  },
                },
              }}
            />
          </LocalizationProvider>
        </FormControl>
      </RowContainer>

      <StyledButton onClick={addTransaction}>Add Transaction</StyledButton>
    </Container>
  );
};

export default NewTransaction;
