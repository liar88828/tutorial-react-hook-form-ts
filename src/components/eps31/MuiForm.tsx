import { TextField, Button, Stack } from '@mui/material'
import { useForm } from 'react-hook-form'
import { DevTool } from '@hookform/devtools'
import Box from '@mui/material/Box';
type FormValues = {
    email: string
    password: string
}

const FormValues = {
    email: '',
    password: '',
}
const MuiForm = () => {
    const { register,
        formState: { errors },
        handleSubmit,
        control
    } = useForm<FormValues>({
        defaultValues: FormValues
    })
    // const { errors } = formState
    const onSubmit = (data: FormValues) => {
        console.log(data)
    }

    return (
        <div>
            <h1>Login</h1>
            <Box
                onSubmit={handleSubmit(onSubmit)}
                noValidate
                autoComplete="off"
                component="form"
                sx={{
                    '& .MuiTextField-root': { m: 1, width: '25ch' },
                }}
            >
                <Stack spacing={2} width={400}>
                    <TextField
                        variant="filled"
                        color="success"
                        focused
                        label='Email'
                        type='email'
                        {...register('email',
                            { required: 'Email is required' }
                        )}
                        error={!!errors.email}
                        helperText={errors.email?.message}
                    />

                    <TextField
                        label='Password'
                        type='password'
                        {...register('password',
                            { required: 'Password is required' }
                        )}
                        error={!!errors.password}
                        helperText={errors.password?.message}

                    />

                    <TextField label="Outlined secondary" color="secondary" focused />

                    <TextField label="Filled success" variant="filled" color="success" focused />

                    <Button
                        type='submit'
                        variant='contained'
                        color='primary'>
                        Login
                    </Button>
                </Stack>
            </Box>
            <DevTool control={control} />
        </div>
    )
}

export default MuiForm