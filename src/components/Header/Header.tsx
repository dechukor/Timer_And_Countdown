import { AppMode, TimerStatus } from "../../types.ts";
import { useState } from "react";
import React from "react";
import { SwitchTheme } from "../SwitchTheme/SwitchTheme";
import { Box, Button } from "@mui/material";
import TimerIcon from "@mui/icons-material/Timer";
import TimelapseIcon from "@mui/icons-material/Timelapse";
import { NavLink } from "react-router-dom";

type HeaderProps = {
  setTimerStatus: (status: TimerStatus) => void;
};

export const Header = React.memo(({ setTimerStatus }: HeaderProps) => {
  console.log("Render header");

  const [appMode, setAppMode] = useState<AppMode>("timer");

  const handleClickMode = (mode: AppMode) => {
    setAppMode(mode);
    setTimerStatus("stop");
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "flex-start",
          gap: "0.5rem",
        }}
      >
        <Button
          component={NavLink}
          to="timer"
          variant={appMode === "timer" ? "contained" : "text"}
          startIcon={<TimerIcon />}
          onClick={() => handleClickMode("timer")}
        >
          Timer
        </Button>
        <Button
          component={NavLink}
          to="countdown"
          variant={appMode === "countdown" ? "contained" : "text"}
          startIcon={<TimelapseIcon />}
          onClick={() => handleClickMode("countdown")}
        >
          Countdown
        </Button>
      </Box>
      <SwitchTheme />
    </Box>
  );
});
