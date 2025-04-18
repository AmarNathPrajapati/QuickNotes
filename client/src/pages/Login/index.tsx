import { useForm } from 'react-hook-form'
import {yupResolver} from '@hookform/resolvers/yup'
import { Box, Button, TextField, Typography } from "@mui/material";
import { LoginForm} from "../../types/auth";
import { loginSchema } from "../../utils/validationSchemas";
import { useAppDispatch, useAppSelector } from "../../hooks/hooks";
import { loginUser } from '../../features/auth/authSlice';
export const Login = () => {
  const dispatch = useAppDispatch();
  const {loading, error} = useAppSelector((state)=>state.auth)

  const {
    register,
    handleSubmit,
    formState:{errors},
  } = useForm<LoginForm>({
    resolver:yupResolver(loginSchema)
  });

  const onSubmit = (data:LoginForm) =>{
    console.log("asdsfadf__asdf",data)
    dispatch(loginUser(data))
  }

  return (
    <Box maxWidth={400} mx="auto" mt={8} justifyContent="center">
      <Typography textAlign="center" color="primary" variant="h4" mb={2}>Login</Typography>
      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <TextField fullWidth label="Email" margin="normal" {...register("email")} error={!!errors.email} helperText={errors.email?.message}/>

        <TextField fullWidth label="Password" type="password" margin="normal" {...register("password")} error={!!errors.password} helperText={errors.password?.message}/>

        {error && <Typography color='error' mt={1}>{error}</Typography>}
        <Button type="submit" variant="contained" fullWidth sx={{mt:2}} disabled={loading} >{loading ?"Logging":"Login"}</Button>
      </form>
    </Box>
  );
};