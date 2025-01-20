import { TimerStatus } from "../../types";
import { useLayoutEffect } from "react";
import { TextField, Box, Slider } from "@mui/material";

type InputStartCount = {
  timerStatus: TimerStatus;
  counter: number;
  changeCounter: (count: number) => void;
};

export const InputStartCount = ({
  timerStatus,
  counter,
  changeCounter,
}: InputStartCount) => {
  const styleTextField = {
    width: "8rem",
  };

  const updateRangeSlider = (value: number) => {
    changeCounter(value);
    // changeCounter(counter);
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
          sx={styleTextField}
          InputProps={{
            inputProps: {
              style: {
                textAlign: "center",
                fontSize: "3rem",
              },
              min: "0",
              max: "720",
            },
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
          sx={styleTextField}
          InputProps={{
            inputProps: {
              style: {
                textAlign: "center",
                fontSize: "3rem",
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
