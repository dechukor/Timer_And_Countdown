import { Button, Box } from "@mui/material";
import { PlayArrow, Stop, Pause } from "@mui/icons-material";
import { TimerStatus } from "../../types";

type FooterProps = {
  timerStatus: TimerStatus;
  changeTimerStatus: (status: TimerStatus) => void;
};

export const Footer = ({ timerStatus, changeTimerStatus }: FooterProps) => {
  const checkStatusPause = () => {
    if (timerStatus === "pause") return changeTimerStatus("stop");
    return changeTimerStatus("pause");
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        gap: "0.5rem",
      }}
    >
      <Button
        variant="contained"
        color="primary"
        fullWidth
        onClick={
          timerStatus === "start"
            ? () => changeTimerStatus("pause")
            : () => changeTimerStatus("start")
        }
      >
        {timerStatus === "start" ? <Pause /> : <PlayArrow />}
      </Button>

      <Button
        sx={timerStatus === "stop" ? { display: "none" } : {}}
        variant="contained"
        color="primary"
        fullWidth
        onClick={() => checkStatusPause()}
      >
        <Stop />
      </Button>
    </Box>
  );
};
