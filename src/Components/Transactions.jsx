import React, { useState } from "react";
import Transaction from "./Transaction";
import {
  Box,
  Typography,
  TextField,
  styled,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";

const Container = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  flexWrap:"wrap",
  padding: "20px",
  gap: "10px",
  backgroundColor: theme.palette.background.paper, // ✅ theme-aware
  borderRadius: "12px",
  boxShadow:
    theme.palette.mode === "dark"
      ? "0 4px 12px rgba(0,0,0,0.4)"
      : "0 4px 12px rgba(0,0,0,0.1)",
  transition: "all 0.3s ease",
}));

const FilterContainer = styled(Box)`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  gap: 10px;

  @media (max-width: 700px) {
    flex-direction: column;
    align-items: stretch;
  }
`;

const Header = styled(TableHead)(({ theme }) => ({
  backgroundColor:
    theme.palette.mode === "dark" ? theme.palette.grey[90] : "transparent",
  "@media (max-width: 700px)": {
    display: "none",
  },
}));

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  fontWeight: "bold",
  textAlign: "center",
  color: theme.palette.text.primary,
}));

const Transactions = ({ transactions, setTransactions }) => {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearchChange = (e) => setSearchTerm(e.target.value);

  const filteredTransactions = transactions.filter((transaction) =>
    transaction.text.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Container>
      <Typography variant="h5" fontWeight="600">
        Transaction History
      </Typography>
      <FilterContainer>
        <TextField
          label="Search transactions"
          value={searchTerm}
          onChange={handleSearchChange}
          fullWidth
        />
      </FilterContainer>

      <TableContainer component={Paper} sx={{ background: "transparent" }}>
        <Table>
          <Header>
            <TableRow>
              <StyledTableCell>Description</StyledTableCell>
              <StyledTableCell>Amount</StyledTableCell>
              <StyledTableCell>Date</StyledTableCell>
              <StyledTableCell>Delete</StyledTableCell>
            </TableRow>
          </Header>
          <TableBody>
            {filteredTransactions.length > 0 ? (
              filteredTransactions.map((transaction) => (
                <Transaction
                  key={transaction.id}
                  transaction={transaction}
                  setTransactions={setTransactions}
                  transactions={transactions}
                />
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={4} align="center">
                  <Typography color="text.secondary">
                    No transactions found 🔍
                  </Typography>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
};

export default Transactions;
