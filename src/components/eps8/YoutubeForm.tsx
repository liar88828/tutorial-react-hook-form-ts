import { useForm } from 'react-hook-form'
import '../../style/YoutubeForm.css'
import { DevTool } from '@hookform/devtools'

let renderCount = 0

type FromValues = {
    username: string
    email: string
    channel: string
}

export const YoutubeForm = () => {
    const form = useForm<FromValues>()
    const { register, control, handleSubmit } = form
    // const { name, ref, onChange, onBlur } = register('username')

    const onSubmit = (data: FromValues) => {
        console.log('Form Submitted', data)
    }

    renderCount++;
    return (
        <div>
            <h1>Youtube ({renderCount / 2})</h1>
            <form
                onSubmit={handleSubmit(onSubmit)}
                noValidate
            >

                <label htmlFor="username"> Username</label>
                <input type="text"
                    id='username'
                    {...register('username', {
                        required: {
                            value: true,
                            message: 'Username Required',
                        }
                    })}
                // name={name}
                // ref={ref}
                // onChange={onChange}
                // onBlur={onBlur}
                />

                <label htmlFor="email">Email</label>
                <input type="text" id='email'
                    {...register('email', {
                        pattern: {
                            value: /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
                            message: 'Invalid email format'
                        }
                    })}
                // name="email" 
                />

                <label htmlFor="channel">Channel</label>
                <input type="text" id='channel'
                    {...register('channel')}
                //  name="channel"
                />
                <button>Submit</button>
            </form>
            <DevTool control={control} />
        </div>
    )
}
