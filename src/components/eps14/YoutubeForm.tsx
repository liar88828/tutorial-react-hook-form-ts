import { useForm } from 'react-hook-form'
import '../../style/YoutubeForm.css'
import { DevTool } from '@hookform/devtools'

let renderCount = 0

type FromValues = {
    username: string
    email: string
    channel: string
    social: {
        twitter: string
        facebook: string
    }
    phoneNumber: string[]
}

export const YoutubeForm = () => {
    const form = useForm<FromValues>({
        defaultValues: {
            username: 'Jane Barnes',
            email: 'gat@bi.kw',
            channel: 'http://hewoseeno.py/dog',
            social: {
                twitter: 'tonight',
                facebook: 'climate ',
            }, phoneNumber: ['+64', '+64']
        }
        // defaultValues: async () => {
        //     const response = await fetch('https://jsonplaceholder.typicode.com/users/1')
        //     const data = await response.json()
        //     return {
        //         username: data.username,
        //         email: data.email,
        //         channel: data.website
        //     }
        // }
    })
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


                <div className="form-control">
                    <label htmlFor="twitter">Twitter</label>
                    <input type="text" id='twitter' {...register('social.twitter',)} />
                </div>

                <div className="form-control">
                    <label htmlFor="facebook">Facebook</label>
                    <input type="text" id='facebook' {...register('social.facebook',)} />
                </div>


                <div className="form-control">
                    <label htmlFor="phoneNumber0">Phone Number 1</label>
                    <input
                        type="text"
                        id='phoneNumber0'
                        {...register('phoneNumber.0',)} />
                </div>

                <div className="form-control">
                    <label htmlFor="phoneNumber1">Phone Number 2</label>
                    <input
                        type="text"
                        id='phoneNumber1'
                        {...register('phoneNumber.1',)} />
                </div>


                <button>Submit</button>
            </form>
            <DevTool control={control} />
        </div>
    )
}
