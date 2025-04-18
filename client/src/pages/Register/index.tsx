import { useForm } from 'react-hook-form'
import {yupResolver} from '@hookform/resolvers/yup'
import { Box, Button, TextField, Typography } from "@mui/material";
import { RegisterForm } from "../../types/auth";
import { registerSchema } from "../../utils/validationSchemas";
import { useAppDispatch, useAppSelector } from "../../hooks/hooks";
import { registerUser } from '../../features/auth/authSlice';
export const Register = () => {
  const dispatch = useAppDispatch();
  const {loading, error} = useAppSelector((state)=>state.auth)


  const {
    register,
    handleSubmit,
    formState:{errors},
  } = useForm<RegisterForm>({
    resolver:yupResolver(registerSchema)
  });

  const onSubmit = (data:RegisterForm) =>{
    console.log("asdsfadf__asdf",data)
    dispatch(registerUser(data))
  }

  return (
    <Box maxWidth={400} mx="auto" mt={8} justifyContent="center">
      <Typography textAlign="center" color="primary" variant="h4" mb={2}>Register</Typography>
      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <TextField fullWidth label="Name" margin="normal" {...register("name")} error = {!!errors.name}helperText={errors.name?.message} />

        <TextField fullWidth label="Email" margin="normal" {...register("email")} error={!!errors.email} helperText={errors.email?.message}/>

        <TextField fullWidth label="Password" type="password" margin="normal" {...register("password")} error={!!errors.password} helperText={errors.password?.message}/>

        {error && <Typography color='error' mt={1}>{error}</Typography>}
        <Button type="submit" variant="contained" fullWidth sx={{mt:2}} disabled={loading} >{loading ?"Registering":"Register"}</Button>
      </form>
    </Box>
  );
};