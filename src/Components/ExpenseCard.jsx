import React from "react";
import { Box, Card, CardContent, Typography, styled } from "@mui/material";
import { TrendingUpRounded, TrendingDownRounded } from "@mui/icons-material";

const Container = styled(Box)(({ theme }) => ({
  display: "flex",
  gap: "16px",
  marginTop: "16px",
  width: "100%",
  "@media (max-width:700px)": {
    flexDirection: "column",
    gap: "12px",
  },
}));

const StyledCard = styled(Card)(({ theme }) => ({
  flex: 1,
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
  transition: "all 0.3s ease",
}));

const StyledCardContent = styled(CardContent)({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  padding: "16px",
  gap: "8px",
});

const Amount = styled(Typography)(({ color }) => ({
  fontSize: "24px",
  fontWeight: "700",
  background: color,
  WebkitBackgroundClip: "text",
  WebkitTextFillColor: "transparent",
  "@media (max-width:700px)": {
    fontSize: "20px",
  },
}));

const ExpenseCard = ({ transactions }) => {
  const amounts = transactions.map((t) => t.amount);

  const income = amounts
    .filter((amt) => amt > 0)
    .reduce((acc, amt) => acc + amt, 0)
    .toFixed(2);

  const expense = (
    amounts.filter((amt) => amt < 0).reduce((acc, amt) => acc + amt, 0) * -1
  ).toFixed(2);

  return (
    <Container className="booxx">
      <StyledCard>
        <StyledCardContent>
          <TrendingUpRounded sx={{ fontSize: { xs: 28, sm: 36 }, color: "#22c55e" }} />
          <Typography variant="subtitle1" color="text.secondary" fontWeight="600">
            Income
          </Typography>
          <Amount color="linear-gradient(90deg, #22c55e, #4ade80)">
            ₹{income}
          </Amount>
        </StyledCardContent>
      </StyledCard>

      <StyledCard>
        <StyledCardContent>
          <TrendingDownRounded sx={{ fontSize: { xs: 28, sm: 36 }, color: "#ef4444" }} />
          <Typography variant="subtitle1" color="text.secondary" fontWeight="600">
            Expense
          </Typography>
          <Amount color="linear-gradient(90deg, #ef4444, #f87171)">
            ₹{expense}
          </Amount>
        </StyledCardContent>
      </StyledCard>
    </Container>
  );
};

export default ExpenseCard;
