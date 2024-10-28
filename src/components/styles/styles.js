import { BorderColor, Height } from "@mui/icons-material";

export const selecetStyle = {
  marginTop: "1vw",
  width: "100%",
  borderRadius: ".5vw !important",
  lineHeight: "1.4375vw",
  transition: "all 1s linear",
  borderRadius: "10px",
  "& .MuiSelect-outlined": {
    padding: ".1vw",
    borderRadius: ".5vw !important",
    color: "#fff",
    outline: "none",
    textAlign: "start",
    display: "flex",
    alignItems: "center",

    minHeight: "1em !important",
    padding: "8px",
  },
  "& .MuiOutlinedInput-notchedOutline": {
    padding: ".7vw",
    borderRadius: ".5vw !important",
    outline: "none",
    border: "1px solid #fff",
    transition: "all 1s linear",
  },
  "& .MuiSelect-select": {
    transition: "all 1s linear",
  },
  "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
    border: "1px solid #fff",
  },
  "&:hover .MuiOutlinedInput-notchedOutline": {
    border: "1px solid #fff",
  },
  "&  .Mui-disabled + .MuiOutlinedInput-notchedOutline": { border: "1px solid rgba(0, 0, 0, 0.5) !important" },

  "& svg": {
    color: "#fff",
  },
  "& .Mui-error": {
    border: "#d42929 .15vw solid",
    color: "#d42929",
  },

};
export const TextFieldStyle = {
  width: "100%",
  margin: "1.5vw 0 1vw 0",
  transition: "all 1s linear",
  borderRadius: "10px",
  "& svg": {
    color: "#fff ",
  },
  "& .MuiInputBase-fullWidth .MuiFormControl-root": {
    width: "100% !important",
  },
  "& .MuiOutlinedInput-notchedOutline": {
    border: "1px solid #fff",
    transition: "all 1s linear",
  },
  "& .MuiInputBase-input": {
    transition: "all 1s linear",
    borderRadius: "10px"
  },
  "& .MuiOutlinedInput-root.Mui-focused": {
    "& > fieldset": {
      border: "1px solid #fff",
    },
  },
  "& .MuiInputLabel-root.Mui-focused": {
    color: "#fff ",
    top: "0",
  },
  "& .MuiInputLabel-root": {
    // top: "-6.5px",
    color: "#fff ",
  },
  "& input": {
    padding: "10px", lineHeight: "1.4375vw",
  },
  "& .MuiInputBase-root-MuiOutlinedInput-root": {
    lineHeight: "1.4375vw",
    color: "#fff",
  },
  "& .MuiOutlinedInput-root": { color: "#fff", borderRadius: ".5vw" },
  "& .MuiInputAdornment-positionEnd p": { color: "#fff" },

  "& .MuiOutlinedInput-root:active": { color: "#fff" },
  "&  .Mui-disabled:hover .MuiOutlinedInput-notchedOutline": { color: "rgba(0, 0, 0, 0.5)", border: "1px solid rgba(0, 0, 0, 0.5)", },
  "&  .Mui-disabled": { color: "rgba(0, 0, 0, 0.5)" },
  "&  .Mui-disabled .MuiInputAdornment-positionEnd p": { color: "rgba(0, 0, 0, 0.5)" },



  "& .MuiOutlinedInput-root:hover": {
    color: "#fff",
    "& > fieldset": {
      border: "1px solid #fff",
    },

  },
};
export const checkboxStyle = {
  color: "#fff",
  '&.Mui-checked': {
    color: "#fff",
  },
  '&.Mui-disabled': {
    color: "rgba(0, 0, 0, 0.38) ",
  },
}
export const ButtonStyle = {
  border: "1px solid #fff", minWidth: "6vw",
  color: "#fff", width: "auto", borderRadius: ".5vw",
  "&:hover": { border: "1px solid #fff" },
  "&.Mui-disabled": { border: "1px solid #464444" },
}
export const AutocompleteStyle = {
  "& .MuiFormLabel-root": { color: "#fff", transform: "translate(11px, 11px) scale(1)" },
  "& .MuiOutlinedInput-notchedOutline": { borderColor: "#fff", borderRadius: ".5vw !important", },
  "& .MuiInputBase-root": { padding: "4px 39px 4px 9px" },
  "&.Mui-focused .MuiFormLabel-root": { padding: "0", transform: "translate(14px, -11px) scale(0.75)" },
  "&.Mui-focused .MuiOutlinedInput-notchedOutline": { borderColor: "#fff" },
  "& .MuiAutocomplete-endAdornment .MuiButtonBase-root .MuiSvgIcon-root": { color: "#fff" },
  "& .MuiInputLabel-root.Mui-focused": {
    color: "#fff ",
    top: "0",
  }, "& .MuiInputLabel-shrink": {
    transform: "translate(14px, -11px) scale(0.75)"
  },
  "& .MuiOutlinedInput-root.Mui-focused": {
    "& > fieldset": {
      borderColor: "#fff"
    },
  },
  "& .MuiFormControl-root:hover .MuiOutlinedInput-notchedOutline": {
    borderColor: "#fff"
  }, "& .MuiChip-root": {
    backgroundColor: "#457675", height: "30px", color: "#fff", fontSize: "18px"
  }, "& .MuiInputBase-input": {
    color: "#fff"
  },

}

