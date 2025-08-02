import React from "react";
import { Box, Typography, styled } from "@mui/material";
import { AccountBalanceWalletRounded } from "@mui/icons-material";

const Container = styled(Box)(({ theme }) => ({
  padding: "20px",
  borderRadius: "16px",
  background:
    theme.palette.mode === "dark"
      ? "rgba(30,41,59,0.6)"
      : "rgba(255,255,255,0.7)",
  backdropFilter: "blur(12px)",
  boxShadow:
    theme.palette.mode === "dark"
      ? "0 8px 24px rgba(0,0,0,0.4)"
      : "0 8px 24px rgba(0,0,0,0.12)",
  textAlign: "center",
  transition: "all 0.3s ease",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  "@media (max-width:700px)": {
    padding: "14px",
    borderRadius: "12px",
  },
}));

const Amount = styled(Typography)(({ isPositive }) => ({
  fontSize: "28px",
  fontWeight: "700",
  marginTop: "8px",
  background: isPositive
    ? "linear-gradient(90deg, #22c55e, #4ade80)"
    : "linear-gradient(90deg, #ef4444, #f87171)",
  WebkitBackgroundClip: "text",
  WebkitTextFillColor: "transparent",
  "@media (max-width:700px)": {
    fontSize: "22px",
  },
}));

const Balance = ({ transactions }) => {
  const amounts = transactions.map((transaction) => transaction.amount);
  const total = amounts.reduce((acc, item) => acc + item, 0).toFixed(2);
  const isPositive = total >= 0;

  return (
    <Container>
      <AccountBalanceWalletRounded
        sx={{
          fontSize: { xs: 30, sm: 40 },
          color: isPositive ? "#22c55e" : "#ef4444",
        }}
      />
      <Typography
        variant="subtitle1"
        color="text.secondary"
        sx={{ fontWeight: "600" }}
      >
        Current Balance
      </Typography>
      <Amount isPositive={isPositive}>₹{total}</Amount>
    </Container>
  );
};

export default Balance;
