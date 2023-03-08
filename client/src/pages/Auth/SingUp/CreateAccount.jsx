import * as React from "react";
import { useDispatch, useSelector } from "react-redux";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { Container, ButtonWrapper } from "../components";
import { Stack, Typography } from "@mui/material";
import { CustomFabButton } from "../../../components";
import { styled } from "@mui/material/styles";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createNewUser } from "../../../redux/auth/action";
import { PATH } from "../../../utils/constants";
import { useFormik } from "formik";
import * as yup from "yup";
const validationSchema = yup.object({
  email: yup
    .string("Enter your email")
    .email("Enter a valid email")
    .required("Email is required"),
  birthDate: yup
    .date()
    .transform(function (value, originalValue) {
      if (this.isType(value)) {
        return value;
      }
      const result = parse(originalValue, "dd.MM.yyyy", new Date());
      return result;
    })
    .typeError("please enter a valid date")
    .required()
    .min("1945-11-13", "Date is too early")
    .max(new Date().toLocaleString(), "please enter a valid date"),
});
const SingUpSecondStep = () => {
  const dispatch = useDispatch();
  const {
    name: savedName,
    email: savedEmail,
    birthDate: savedBirthDate,
    password: savePassword,
  } = useSelector((state) => state.auth.newUser);
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      name: savedName,
      email: savedEmail,
      password: savePassword,
      birthDate: savedBirthDate,
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      await dispatch(createNewUser(values));
      navigate(`${PATH.EXPLORE}`);
    },
  });
  return (
    <Container sx={{ justifyContent: "space-between", height: "100%" }}>
      <form>
        <Typography className="StepTitle" variant="h1">
          Create your account
        </Typography>
        <Stack spacing={5}>
          <TextField
            id="name"
            name="name"
            value={formik.values.name}
            onChange={formik.handleChange}
            sx={{ width: "100%" }}
            label="Name"
            variant="outlined"
          />
          <TextField
            value={formik.values.email}
            onChange={formik.handleChange}
            error={formik.touched.email && Boolean(formik.errors.email)}
            helperText={formik.touched.email && formik.errors.email}
            sx={{ width: "100%" }}
            id="email"
            name="email"
            label="Email"
            variant="outlined"
          />
          <TextField
            label="Password"
            type="password"
            id="password"
            name="password"
            value={formik.values.password}
            onChange={formik.handleChange}
            sx={{ width: "100%" }}
            InputLabelProps={{
              shrink: true,
            }}
          />
          <TextField
            value={formik.values.birthDate}
            onChange={formik.handleChange}
            error={formik.touched.birthDate && Boolean(formik.errors.birthDate)}
            helperText={formik.touched.birthDate && formik.errors.birthDate}
            label="Birthday"
            type="date"
            id="birth-date"
            name="birthDate"
            sx={{ width: "100%" }}
            InputLabelProps={{
              shrink: true,
            }}
          />
        </Stack>
      </form>
      <Box>
        <Typography sx={{ fontSize: "0.8rem", mb: 2 }}>
          By signing up, you agree to the Terms of Service and Privacy Policy,
          including Cookie Use. Others will be able to find you by email or
          phone number when provided · Privacy Options
        </Typography>
        <ButtonWrapperStyled>
          <CustomFabButton
            className="NextStepBtn"
            disabled={false}
            type="submit"
            onClick={formik.handleSubmit}
            name="Sing up"
          />
        </ButtonWrapperStyled>
      </Box>
    </Container>
  );
};

const ButtonWrapperStyled = styled(ButtonWrapper)(({ theme }) => ({
  marginBottom: 20,

  "& .MuiFab-root": {
    height: "3rem",
    backgroundColor: `${theme.palette.primary.main} !important`,

    "&:hover": {
      backgroundColor: "rgb(26, 140, 216) !important",
    },
  },
}));

export default SingUpSecondStep;
