import { useFieldArray, useForm } from 'react-hook-form'
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
    phNumbers: {
        number: string
    }[]
    age: number
    dob: Date
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
            },
            phoneNumber: ['+64', '+64'],
            phNumbers: [
                { number: '' }
            ],
            age: 0,
            dob: new Date(),
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
    const { register, control, handleSubmit, formState, getValues, setValue
        //watch,
    } = form
    const { fields, append, remove } = useFieldArray({
        name: 'phNumbers',
        control
    })

    const {
        errors,
        touchedFields,
        dirtyFields,
        isDirty
    } = formState

    console.log({
        touchedFields,
        dirtyFields,
        isDirty
    })

    const onSubmit = (data: FromValues) => console.log('Form Submitted', data)

    // specific value
    // const watchUsername = watch(['username','age'])

    // all value
    // const watchForm = watch()

    // useEffect(() => {
    //     const subscription = watch(value => console.log(value))

    //     return () => subscription.unsubscribe()
    // }, [watch])

    const handleGetValues = () => {
        console.log(
            'get Values',
            // getValues('social'),// specific
            getValues(['social', 'username']),// specific by array
            //getValues()       // all values
        );
    }
    const handleSetValues = () => {
        setValue('username', '', {
            shouldValidate: true,
            shouldDirty: true,
            shouldTouch: true
        })
    }

    renderCount++;

    return (
        <div>
            <h1>Youtube ({renderCount / 2})</h1>
            {/* <h2>Watch value of : {watchUsername}</h2> */}

            {/* <h2>Watch value of : {JSON.stringify(watchForm)}</h2> */}
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
                    />
                    <p className='error'> {errors.channel?.message} </p>
                </div>

                <div className="form-control">
                    <label htmlFor="age">Age</label>
                    <input
                        type="number"
                        id='age'
                        {...register('age', {
                            valueAsNumber: true,
                            required: {
                                value: true,
                                message: 'Age Must Number'
                            }
                        })}
                    />
                    <p className='error'> {errors.age?.message} </p>
                </div>

                <div className="form-control">
                    <label htmlFor="dob">Date</label>
                    <input
                        type="date"
                        id='dob'
                        {...register('dob', {
                            valueAsDate: true,
                            required: {
                                value: true,
                                message: 'Date Must be required'
                            }
                        })}
                    />
                    <p className='error'> {errors.dob?.message} </p>
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

                <div >
                    <label htmlFor="phPhone">List of phone number</label>
                    <div>{fields.map((field, index) => (
                        <div
                            className='form-control'
                            key={field.id}>

                            <input
                                id='phPhone'
                                type="text"
                                {...register(`phNumbers.${index}.number` as const)} />

                            {index > 0 && (
                                <button
                                    type='button'
                                    // remove by index
                                    onClick={() => remove(index)}>
                                    Remove
                                </button>)}

                        </div>))}

                        <button
                            type='button'
                            onClick={() => append({
                                number: ''
                            })}>
                            Add Number
                        </button>

                    </div>
                </div>
                <button>Submit</button>

                <button
                    type='button'
                    onClick={handleGetValues}>
                    Get Value
                </button>

                <button
                    type='button'
                    onClick={handleSetValues}>
                    Set Value
                </button>

            </form >

            <DevTool control={control} />
        </div >
    )
}
