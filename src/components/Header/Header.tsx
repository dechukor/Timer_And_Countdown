import { AppMode } from "../../types.ts";
import { SwitchTheme } from "../SwitchTheme/SwitchTheme";
import { Box, Button } from "@mui/material";
import TimerIcon from "@mui/icons-material/Timer";
import TimelapseIcon from "@mui/icons-material/Timelapse";
import { NavLink } from "react-router-dom";
import style from "./header.module.css";

type HeaderProps = {
  appMode: AppMode;
  changeAppMode: (mode: AppMode) => void;
};

export const Header = ({ appMode, changeAppMode }: HeaderProps) => {
  console.log("Render header");

  return (
    <Box
      className={style.containerBox}
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
          to="/"
          variant={appMode === "timer" ? "contained" : "text"}
          startIcon={<TimerIcon />}
          onClick={() => changeAppMode("timer")}
        >
          Timer
        </Button>
        <Button
          component={NavLink}
          to="/countdown"
          variant={appMode === "countdown" ? "contained" : "text"}
          startIcon={<TimelapseIcon />}
          onClick={() => changeAppMode("countdown")}
        >
          Countdown
        </Button>
      </Box>
      <SwitchTheme />
    </Box>
  );
};
