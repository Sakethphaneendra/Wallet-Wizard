import { useState, useEffect } from "react";
import "./App.css";
import {
  Box,
  Typography,
  styled,
  createTheme,
  ThemeProvider,
  IconButton,
  useMediaQuery,
} from "@mui/material";
import { Brightness4Rounded, Brightness7Rounded } from "@mui/icons-material";

import Balance from "./Components/Balance";
import ExpenseCard from "./Components/ExpenseCard";
import NewTransaction from "./Components/NewTransaction";
import Transactions from "./Components/Transactions";

// Navbar Styling
const Navbar = styled(Box)(({ theme }) => ({
  width: "100%",
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  padding: "14px 20px",
  background: theme.palette.background.paper,
  backdropFilter: "blur(10px)",
  boxShadow: "0 6px 20px rgba(0,0,0,0.08)",
  position: "sticky",
  top: 0,
  zIndex: 1000,
  borderRadius: "0 0 16px 16px",
  transition: "all 0.3s ease",
}));

const Logo = styled(Typography)(({ theme }) => ({
  fontSize: "24px",
  fontWeight: 700,
  letterSpacing: "1px",
  textAlign: "center",
  flexGrow: 1,
  color: theme.palette.mode === "dark" ? "#38bdf8" : "#166abd",
  background: "linear-gradient(90deg, #166abd, #38bdf8)",
  WebkitBackgroundClip: "text",
  WebkitTextFillColor: "transparent",
  cursor: "pointer",
  transition: "transform 0.3s ease",
  "&:hover": { transform: "scale(1.05)" },
}));

const Component = styled(Box)(({ theme }) => ({
  background: theme.palette.background.paper,
  padding: "20px",
  borderRadius: "16px",
  display: "flex",
  flexDirection: "column",
  width: "100%",
  maxWidth: "75%",
  height:"100%",
  margin: "40px auto",
  boxShadow: "0 8px 24px rgba(0,0,0,0.1)",
  transition: "all 0.3s ease",
  "@media (min-width:1050px)": {
    flexDirection: "row",
  },
  "@media (max-width:700px)": {
    maxWidth: "95%",
    padding: "14px",
  },
  "& > div": {
    padding: "16px",
    width: "100%",
  },
}));

function App() {
  const [transactions, setTransactions] = useState(() => {
    const savedTransactions = localStorage.getItem("transactions");
    return savedTransactions
      ? JSON.parse(savedTransactions)
      : [
          { id: 1, text: "Momos", amount: -20, date: "03/01/2024, 04:36:36 pm" },
          { id: 2, text: "Salary", amount: 3000, date: "03/02/2024, 04:36:36 pm" },
          { id: 3, text: "Book", amount: -100, date: "03/02/2024, 04:36:36 pm" },
          { id: 4, text: "Bonus", amount: 1500, date: "03/06/2024, 04:36:36 pm" },
        ];
  });

  const [darkMode, setDarkMode] = useState(() => {
    const savedTheme = localStorage.getItem("darkMode");
    return savedTheme ? JSON.parse(savedTheme) : false;
  });

  useEffect(() => {
    localStorage.setItem("transactions", JSON.stringify(transactions));
  }, [transactions]);

  useEffect(() => {
    localStorage.setItem("darkMode", JSON.stringify(darkMode));
  }, [darkMode]);

  const theme = createTheme({
    palette: {
      mode: darkMode ? "dark" : "light",
      primary: { main: "#166abd" },
      background: {
        default: darkMode ? "#0f172a" : "#f9fafb",
        paper: darkMode ? "#1e293b" : "#ffffff",
      },
      text: {
        primary: darkMode ? "#f8fafc" : "#111827",
      },
    },
    typography: {
      fontFamily: "Poppins, sans-serif",
    },
  });

  const isMobile = useMediaQuery("(max-width:700px)");

  return (
    <ThemeProvider theme={theme}>
      <Box
        sx={{
          minHeight: "125vh",
          bgcolor: "background.default",
          color: "text.primary",
          transition: "all 0.3s ease",
        }}
      >
        {/* 🔥 Navbar */}
        <Navbar>
          {!isMobile && <Box width="48px" />} {/* keeps logo centered on desktop */}
          <Logo>💸 Wallet Wizard</Logo>
          <IconButton
            onClick={() => setDarkMode(!darkMode)}
            sx={{
              bgcolor: darkMode ? "#334155" : "#e2e8f0",
              color: darkMode ? "#facc15" : "#0f172a",
              "&:hover": {
                bgcolor: darkMode ? "#475569" : "#cbd5e1",
                transform: "rotate(15deg)",
              },
              transition: "all 0.3s ease",
              borderRadius: "50%",
            }}
          >
            {darkMode ? <Brightness7Rounded /> : <Brightness4Rounded />}
          </IconButton>
        </Navbar>

        {/* Main Body */}
        <Component className="mainbox">
          <Box>
            <Balance transactions={transactions} />
            <ExpenseCard transactions={transactions} />
            <NewTransaction setTransactions={setTransactions} />
          </Box>
          <Box>
            <Transactions
              transactions={transactions}
              setTransactions={setTransactions}
            />
          </Box>
        </Component>
      </Box>

      {/* Footer */}
<Box
  component="footer"
  sx={{
    textAlign: "center",
    py: 3,
    borderTop: "1px solid",
    borderColor: "divider",
    mt: "auto",
    bgcolor: "background.paper",
    boxShadow: "0 -2px 8px rgba(0,0,0,0.1)",
  }}
>
  <Typography
    variant="body2"
    sx={{
      color: "text.secondary",
      "& a": {
        color: "primary.main",
        textDecoration: "none",
        fontWeight: 600,
        "&:hover": {
          color: darkMode ? "#f472b6" : "#db2777", // pink hover
          textDecoration: "underline",
        },
      },
    }}
  >
    🚀 Design and Developed By{" "}
    <a
      href="https://www.linkedin.com/in/sakethphaneendra/"
      target="_blank"
      rel="noopener noreferrer"
    >
      @SakethPhaneendra
    </a>
  </Typography>
</Box>
    </ThemeProvider>
  );
}

export default App;
