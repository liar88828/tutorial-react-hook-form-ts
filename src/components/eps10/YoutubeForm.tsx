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
    const { register, control, handleSubmit, formState } = form
    // const { name, ref, onChange, onBlur } = register('username')

    const { errors } = formState

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
                <div className="form-control">
                    <label htmlFor="username"> Username</label>
                    <input type="text"
                        id='username'
                        {...register('username', {
                            required: {
                                value: true,
                                message: 'Username Required',
                            },

                        })}
                    // name={name}
                    // ref={ref}
                    // onChange={onChange}
                    // onBlur={onBlur}
                    />
                    <p className='error'> {errors.username?.message} </p>
                </div>

                <div className="form-control">
                    <label htmlFor="email">Email</label>
                    <input type="text" id='email'
                        {...register('email', {
                            pattern: {
                                value: /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
                                message: 'Invalid email format',
                            },
                            // validate: (fieldValue) => {
                            //     console.log(fieldValue)
                            //     return fieldValue !== "admin@example.com" ||
                            //         'Enter a different email address'
                            // }
                            validate: {
                                notAdmin: (fieldValue) => {
                                    return fieldValue !== "admin@example.com" ||
                                        'Enter a different email address'
                                },
                                notBlackList: (fieldValue) => {
                                    return !fieldValue.endsWith("badDomain.com") || 'This domain is not supported'
                                }
                            }
                        })} />
                    <p className='error'> {errors.email?.message} </p>
                </div>

                <div className="form-control">
                    <label htmlFor="channel">Channel</label>
                    <input type="text" id='channel'
                        {...register('channel', {
                            required: {
                                value: true,
                                message: 'Channel is require'
                            }
                        })}
                    //  name="channel"
                    />
                    <p className='error'> {errors.channel?.message} </p>
                </div>

                <button>Submit</button>
            </form>
            <DevTool control={control} />
        </div>
    )
}
