import "./App.css";
import { TimerStatus, AppMode } from "../types.ts";
import { useState } from "react";
import { Box } from "@mui/material";
import { Timer, Header, Countdown, Footer } from "../components/index.ts";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Normalize } from "styled-normalize";

export const App = () => {
  const [timerStatus, setTimerStatus] = useState<TimerStatus>("stop");
  const [appMode, setAppMode] = useState<AppMode>("timer");

  const changeTimerStatus = (status: TimerStatus) => {
    setTimerStatus(status);
  };

  const changeAppMode = (mode: AppMode) => {
    setAppMode(mode);
    setTimerStatus("stop");
  };

  return (
    <>
      <Normalize />
      <BrowserRouter>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            width: "400px",
            minHeight: "400px",
            padding: "2rem",
            // backgroundColor: "#F6F8FA",
            // borderRadius: "1rem",
          }}
        >
          <Header appMode={appMode} changeAppMode={changeAppMode} />
          <Routes>
            <Route path="/" element={<Timer timerStatus={timerStatus} />} />
            <Route
              path="/countdown"
              element={
                <Countdown
                  timerStatus={timerStatus}
                  changeTimerStatus={changeTimerStatus}
                />
              }
            />
          </Routes>
          <Footer
            timerStatus={timerStatus}
            changeTimerStatus={changeTimerStatus}
          />
        </Box>
      </BrowserRouter>
    </>
  );
};
