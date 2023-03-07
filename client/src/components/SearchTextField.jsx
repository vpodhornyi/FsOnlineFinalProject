import TextField from "@mui/material/TextField";
import {styled} from "@mui/material/styles";

const styles = ({theme}) => ({
  "& .MuiOutlinedInput-root": {
    backgroundColor: theme.palette.input.background,
    borderColor: theme.palette.input.background,
    borderRadius: 30,
    height: 42,
    color: theme.palette.text.main,
    "&.MuiInputAdornment-root": {
      "& svg path": {
        color: "red",
        fill: '#eff3f4',
        marginRight: 10,
      },
    },
    "&:hover": {
      "& fieldset": {borderColor: "transparent"},
    },
    "& fieldset": {
      borderColor: "transparent",
      borderWidth: 1,
    },
    "&.Mui-focused": {
      backgroundColor: theme.palette.input.focused,
      "& fieldset": {borderWidth: 1, borderColor: theme.palette.primary.main},
      "& svg path": {
        fill: theme.palette.primary.main,
      },
    },
  },
});

export default styled(TextField)(styles);