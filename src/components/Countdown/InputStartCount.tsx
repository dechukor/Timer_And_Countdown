import { TimerStatus } from "../../types";
import { useLayoutEffect } from "react";
import { TextField, Box, Slider } from "@mui/material";

type InputStartCount = {
  timerStatus: TimerStatus;
  counter: number;
  setCounter: (counter: number) => void;
  setStartCount: (counter: number) => void;
};

export const InputStartCount = ({
  timerStatus,
  counter,
  setCounter,
  setStartCount,
}: InputStartCount) => {
  const changeCounter = (counter: number) => {
    setCounter(counter);
    setStartCount(counter);
  };

  const updateRangeSlider = (value: number) => {
    changeCounter(value);
  };

  const changeInputSeconds = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (+event.target.value > 59) {
      event.target.value = "59";
    }
    changeCounter(Math.floor(counter / 60) * 60 + Number(event.target.value));
  };

  const changeInputMinutes = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (+event.target.value > 720) {
      event.target.value = "720";
    }
    changeCounter(Number(event.target.value) * 60 + (counter % 60));
  };

  useLayoutEffect(() => {
    if (timerStatus === "stop") {
      changeCounter(0);
    }
  }, []);

  return (
    <>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          gap: "0.5rem",
        }}
      >
        <TextField
          sx={{ width: "8rem" }}
          inputProps={{
            style: {
              textAlign: "center",
              fontSize: "3rem",
              fontFamily:
                "Inter, system-ui, Avenir, Helvetica, Arial, sans-serif",
              fontWeight: "700",
            },
            min: "0",
            max: "720",
          }}
          label="Minutes"
          type="number"
          value={Math.floor(counter / 60)}
          onChange={changeInputMinutes}
        ></TextField>
        <Box
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            fontSize: "3rem",
          }}
        >
          :
        </Box>
        <TextField
          sx={{ width: "8rem" }}
          InputProps={{
            inputProps: {
              style: {
                textAlign: "center",
                fontSize: "3rem",
                fontFamily:
                  "Inter, system-ui, Avenir, Helvetica, Arial, sans-serif",
                fontWeight: "700",
              },
              min: "0",
              max: "59",
            },
          }}
          label="Seconds"
          type="number"
          value={counter % 60}
          onChange={changeInputSeconds}
        ></TextField>
      </Box>
      <Slider
        value={counter}
        min={0}
        max={3600}
        step={15}
        onChange={(_, value) => updateRangeSlider(value as number)}
      ></Slider>
    </>
  );
};
