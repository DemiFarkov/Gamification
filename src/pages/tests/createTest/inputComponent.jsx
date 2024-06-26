import { alpha, styled } from "@mui/material/styles";
import React, { useState } from "react";
import {
  Unstable_NumberInput as BaseNumberInput,
  numberInputClasses,
} from "@mui/base/Unstable_NumberInput";

const CustomNumberInput = React.forwardRef(function CustomNumberInput(
  props,
  ref
) {
  return (
    <BaseNumberInput
      required
      slots={{
        root: StyledInputRoot,
        input: StyledInputElement,
        incrementButton: StyledButton,
        decrementButton: StyledButton,
      }}
      slotProps={{
        incrementButton: {
          children: "▴",
        },
        decrementButton: {
          children: "▾",
        },
      }}
      {...props}
      ref={ref}
    />
  );
});

export default function NumberInputIntroduction(
  id,
  changecollectionQue,
  changeMinPointsForTest,
) {
  return (
    <CustomNumberInput
      min={1}
      id={id}
      required
      className="divEnterPoints"
      onChange={(event) => {
        changeMinPointsForTest(), changecollectionQue();
      }}
      aria-label="Demo number input"
      placeholder="Баллы за ответ"
    />
  );
}

const grey = {
  50: "#F3F6F9",
  100: "#E5EAF2",
  200: "#DAE2ED",
  300: "#C7D0DD",
  400: "#B0B8C4",
  500: "#9DA8B7",
  600: "#6B7A90",
  700: "#434D5B",
  800: "#303740",
  900: "#1C2025",
};

export const StyledInputRoot = styled("div")(
  ({ theme }) => `
    width:90%;
    margin: 1vw auto 0 auto;
    font-family: 'IBM Plex Sans', sans-serif;
    font-weight: 400;
    border-radius: 3vw;
    color: ${theme.palette.mode === "dark" ? grey[300] : grey[900]};
    box-shadow: 0px 2px 4px ${
      theme.palette.mode === "dark" ? "rgba(0,0,0, 0.5)" : "rgba(0,0,0, 0.05)"
    };
    display: grid;
    grid-template-columns: 1fr 19px;
    grid-template-rows: 1fr 1fr;
    overflow: hidden;
    column-gap: 8px;
    padding: 0.7vw 1vw 0.7vw 2vw;
    
    background: #D9D9D9;
  
   
  `
);

export const StyledInputElement = styled("input")(
  ({ theme }) => `
    font-size: 1.2vw;
    font-family: inherit;
    font-weight: 400;
    line-height: 1.5;
    grid-column: 1/2;
    grid-row: 1/3;
    color: #000;
    background: inherit;
    outline: 0;
    ::-webkit-input-placeholder { color: #999; }
  ::-moz-placeholder {color: #999; }
  :-ms-input-placeholder { color: #999; } 
  :-o-input-placeholder { color: #999; }
}
  `
);

export const StyledButton = styled("button")(
  ({ theme }) => `
    // display: none !important;
    flex-flow: row nowrap;
    justify-content: center;
    align-items: center;
    appearance: none;
    padding: 0;
    width: 1.3vw;
    height: .88vw;
    font-family: system-ui, sans-serif;
    font-size: 0.875rem;
    line-height: 1;
    box-sizing: border-box;
    background: ${theme.palette.mode === "dark" ? grey[900] : "#fff"};
    border: 0;
    color: ${theme.palette.mode === "dark" ? grey[300] : grey[900]};
    transition-property: all;
    transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
    transition-duration: 120ms;
    display: flex;
    align-items: center;
  
    &:hover {
      cursor: pointer;
    }
  
    &.${numberInputClasses.incrementButton} {
      grid-column: 2/3;position: relative;
      grid-row: 1/2;
      bottom: 0;
      border-top-left-radius: 4px;
      border-top-right-radius: 4px;
      border-bottom-left-radius: 0px;
      border-bottom-right-radius: 0px;
      border-bottom: 0;
      background: ${theme.palette.mode === "dark" ? grey[900] : grey[50]};
    }
  
    &.${numberInputClasses.decrementButton} {
      grid-column: 2/3;
      grid-row: 2/3;        
      border-top-left-radius: 0px;
      border-top-right-radius: 0px;
      border-bottom-left-radius: 4px;
      border-bottom-right-radius: 4px;
      
      background: ${theme.palette.mode === "dark" ? grey[900] : grey[50]};
    }
  
    &:hover {
      cursor: pointer;
      color: #FFF;
      background: ${theme.palette.mode === "dark" ? grey[200] : grey[500]};
      border-color: ${theme.palette.mode === "dark" ? grey[200] : grey[500]};
    }
  
    & .arrow {
      transform: translateY(-1px);
    }
  
    & .arrow {
      transform: translateY(-1px);
    }
  `
);
