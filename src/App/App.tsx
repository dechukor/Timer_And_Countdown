import "./App.css";
import { TimerStatus } from "../types.ts";
import { useState } from "react";
import { Box } from "@mui/material";
import { Timer, Header, Countdown, Footer } from "../components/index.ts";
import { HashRouter, Routes, Route, Navigate } from "react-router-dom";
import { ThemeProvider } from "@mui/material/styles";
import { ThemeContext } from "../context.ts";
import { themeLight, themeDark } from "./theme.ts";

export const App = () => {
  const [timerStatus, setTimerStatus] = useState<TimerStatus>("stop");
  const [isDarkTheme, setIsDarkTheme] = useState(false);

  return (
    <>
      <ThemeContext.Provider value={{ isDarkTheme, setIsDarkTheme }}>
        <ThemeProvider theme={isDarkTheme ? themeDark : themeLight}>
          <HashRouter>
            <Box
              className={isDarkTheme ? "dark" : "light"}
              sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                width: "400px",
                minHeight: "400px",
                borderRadius: "1rem",
                padding: "2rem",
              }}
            >
              <Header setTimerStatus={setTimerStatus} />
              <Routes>
                <Route path="/">
                  <Route index element={<Navigate to="timer" />} />
                  <Route
                    path="timer"
                    element={<Timer timerStatus={timerStatus} />}
                  />
                  <Route
                    path="countdown"
                    element={
                      <Countdown
                        timerStatus={timerStatus}
                        setTimerStatus={setTimerStatus}
                      />
                    }
                  />
                </Route>
              </Routes>
              <Footer
                timerStatus={timerStatus}
                setTimerStatus={setTimerStatus}
              />
            </Box>
          </HashRouter>
        </ThemeProvider>
      </ThemeContext.Provider>
    </>
  );
};
