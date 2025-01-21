import "./App.css";
import { TimerStatus } from "../types.ts";
import { useState } from "react";
import { Box } from "@mui/material";
import { Timer, Header, Countdown, Footer } from "../components/index.ts";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Normalize } from "styled-normalize";

export const App = () => {
  const [timerStatus, setTimerStatus] = useState<TimerStatus>("stop");

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
          }}
        >
          <Header setTimerStatus={setTimerStatus} />
          <Routes>
            <Route path="/" element={<Timer timerStatus={timerStatus} />} />
            <Route
              path="/countdown"
              element={
                <Countdown
                  timerStatus={timerStatus}
                  setTimerStatus={setTimerStatus}
                />
              }
            />
          </Routes>
          <Footer timerStatus={timerStatus} setTimerStatus={setTimerStatus} />
        </Box>
      </BrowserRouter>
    </>
  );
};
