// import { ThemeProvider } from "@emotion/react";
import { CssBaseline,ThemeProvider } from "@mui/material";
import { useSelector } from "react-redux";
import { useMemo } from "react";
import { createTheme } from "@mui/material/styles";
import { themeSettings } from "themes";
import { BrowserRouter, Navigate, Routes ,Route} from "react-router-dom";
import Layout from "views/Layout";
import Dashboard from "views/Dashboard";
import Products from "views/Products";
import Customers from "views/Customers";
import Transactions from "views/Transactions";
import Geography from "views/Geography";
import Overview from "views/Overview";
import Daily from "views/Daily";
import Monthly from "views/Monthly";
import Breakdown from "views/Breakdown";
import Admin from "views/Admin";
import Performance from "views/Performance";

function App() {
  const mode = useSelector((state) => state.main.mode)
  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode])
  return (
    <div className="App">
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Routes>
            <Route element={<Layout />}>
              <Route path="/" element={<Navigate to="/dashboard" replace/>} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/products" element={<Products />} />
              <Route path="/customers" element={<Customers/>} />
              <Route path="/transactions" element={<Transactions />} />
              <Route path="/geography" element={<Geography />} />
              <Route path="/overview" element={<Overview />} />
              <Route path="/daily" element={<Daily />} />
              <Route path="/monthly" element={<Monthly/>}/>
              <Route path="/breakdown" element={<Breakdown />} />
              <Route path="/admin" element={<Admin/>}/>
              <Route path="/performance" element={<Performance/>}/>
            </Route>
          </Routes>
        </ThemeProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
