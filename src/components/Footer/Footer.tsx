import { Button, Box } from "@mui/material";
import { PlayArrow, Stop, Pause } from "@mui/icons-material";
import { TimerStatus } from "../../types";

type FooterProps = {
  timerStatus: TimerStatus;
  setTimerStatus: (status: TimerStatus) => void;
};

export const Footer = ({ timerStatus, setTimerStatus }: FooterProps) => {
  const handleClickStop = () => {
    if (timerStatus === "pause") return setTimerStatus("stop");
    return setTimerStatus("pause");
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
            ? () => setTimerStatus("pause")
            : () => setTimerStatus("start")
        }
      >
        {timerStatus === "start" ? <Pause /> : <PlayArrow />}
      </Button>

      <Button
        sx={timerStatus === "stop" ? { display: "none" } : {}}
        variant="contained"
        color="primary"
        fullWidth
        onClick={() => handleClickStop()}
      >
        <Stop />
      </Button>
    </Box>
  );
};
