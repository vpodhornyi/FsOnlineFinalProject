import { styled } from "@mui/material/styles";
import { Box, Button, List, ListItem } from "@mui/material";

export const TwitterContainer = styled(Box)({

  fontFamily: "Arial",
  paddingTop: 5,
  paddingBottom: 10,
  paddingLeft: 16,
  paddingRight: 16,
  borderBottom: "1px solid #eff3f4",
  display: "flex",
});

export const AvatarContainer = styled(Box)({
  flexBasis: 48,
  marginRight: 12,
  cursor: 'pointer',
});

export const Form = styled(Box)({
  display: "flex",
  flexDirection: "column",
  width: "95%",
});

export const TweetInput = styled(Box)({
  borderBottom: "1px solid #eff3f4",
});

export const FormFooter = styled(Box)({
  position:"relative",
  marginTop:"10px",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
});
export const TextCount = styled(Box)({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  fontWeight:"bold",
  color:"green"
});

export const IconsList = styled(List)({
  display: "inline-flex",
});

export const Icon = styled(ListItem)({
  width: 20,
  height: 20,
  color: "rgb(29, 155, 240)",
  marginRight: 10,
});

export const ReplyText = styled(Box)({
  paddingBottom: 15,
  display: "flex",
  alignItems: "center",
  color: "rgb(29, 155, 240)",
  fontSize: 14,
  fontWeight: 700,
  marginTop: 15,
});

export const TweetBtn = styled(Button)({
  color: "#fff",
  backgroundColor: "rgb(29, 155, 240)",
  padding: "0 20",
  marginLeft:"20px",
  justifySelf: "center",
  borderRadius: 30,
  height: 35,
  fontWeight: 600,
  fontSize: 14,
  cursor: "pointer",
  border: 0,
  textTransform: "inherit",
  ["@media (max-width:700px)"]: {
    position: "absolute",
    top: 5,
    right: 5,
  },
});
