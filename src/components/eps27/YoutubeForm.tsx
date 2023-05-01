import { FieldErrors, useFieldArray, useForm } from 'react-hook-form'
import '../../style/YoutubeForm.css'
import { DevTool } from '@hookform/devtools'
import { useEffect } from 'react';

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

const defaultValues = {
    username: '',
    email: '',
    channel: '',
    social: {
        twitter: '',
        facebook: '',
    },
    phoneNumber: ['+64', '+64'],
    phNumbers: [
        { number: '' }
    ],
    age: 0,
    dob: new Date(),
}
export const YoutubeForm = () => {
    const form = useForm<FromValues>({
        defaultValues: defaultValues,
        // mode: 'onSubmit',// default 
        mode: 'onBlur',// must be click 
        mode: 'onTouched', // must write
        // mode: 'onChange', // must write but low performed
        // mode: 'all', //but low performed

    })

    const { register, control, handleSubmit, formState, getValues, setValue, watch,
        reset
    } = form

    const { fields, append, remove } = useFieldArray({
        name: 'phNumbers',
        control
    })

    const {
        errors,
        // touchedFields,
        // dirtyFields,
        isDirty,
        isValid,
        isSubmitting,
        isSubmitted,
        isSubmitSuccessful,
        submitCount,
    } = formState

    console.log({
        //     touchedFields,
        //     dirtyFields,
        isDirty,
        isValid,
        isSubmitSuccessful, // if validation error
        isSubmitting,   // after Submit
        isSubmitted,     //before submit
        submitCount
    })


    useEffect(() => {
        if (isSubmitSuccessful) {
            reset()
        }
    }, [isSubmitSuccessful, reset])

    const onSubmit = (data: FromValues) => console.log('Form Submitted', data)

    const onError = (error: FieldErrors<FromValues>) => {
        console.log('Field Error',
            error)
    }

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
            <form
                onSubmit={
                    handleSubmit(
                        onSubmit,
                        onError
                    )
                }
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

                            validate: {
                                notAdmin: (fieldValue) => {
                                    return fieldValue !== "admin@example.com" ||
                                        'Enter a different email address'
                                },
                                notBlackList: (fieldValue) => {
                                    return !fieldValue.endsWith("badDomain.com") || 'This domain is not supported'
                                },
                                emailAvailable: async (fieldValue) => {
                                    const response = await
                                        fetch(`https://jsonplaceholder.typicode.com/users?email=${fieldValue}`)
                                    const data = await response.json()
                                    return data.length == 0 || 'Email is Ready exists'
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

                {/* twitter */}
                <div className="form-control">
                    <label htmlFor="twitter">Twitter</label>
                    <input
                        type="text"
                        id='twitter'
                        {...register('social.twitter',
                            {
                                // disabled: true 
                                disabled: watch('channel') === ''
                            }
                        )} />
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

                <div>
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

                <button
                    disabled={
                        !isDirty || isSubmitting || isSubmitSuccessful
                    }
                >Submit</button>

                <button
                    type='button'
                    onClick={() => reset()}>
                    Reset
                </button>

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
