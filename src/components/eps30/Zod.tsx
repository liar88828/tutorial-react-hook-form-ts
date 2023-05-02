import { FieldErrors, useFieldArray, useForm } from 'react-hook-form'
import '../../style/YoutubeForm.css'
import { DevTool } from '@hookform/devtools'
import { useEffect } from 'react';
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

const schema = z.object({
    username: z.string().nonempty('Username is required'),
    email: z.string()
        .nonempty('Email is required')
        .email('Email format is not valid'),
    channel: z.string().nonempty('Channel is required'),
})


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
export const Zod = () => {
    const form = useForm<FromValues>({
        defaultValues: defaultValues,
        resolver: zodResolver(schema),
        mode: 'onTouched', // must write
    })

    const { register, control, handleSubmit, formState, getValues, setValue, watch,
        reset, trigger
    } = form

    const { fields, append, remove } = useFieldArray({
        name: 'phNumbers',
        control
    })

    const {
        errors,
        isDirty,
        isValid,
        isSubmitting,
        isSubmitted,
        isSubmitSuccessful,
        submitCount,
    } = formState

    console.log({
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
            getValues(['social', 'username']),// specific by array
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
                        {...register('username')}

                    />
                    <p className='error'> {errors.username?.message} </p>
                </div>

                <div className="form-control">
                    <label htmlFor="email">Email</label>
                    <input type="text" id='email'
                        {...register('email')} />
                    <p className='error'> {errors.email?.message} </p>
                </div>

                <div className="form-control">
                    <label htmlFor="channel">Channel</label>
                    <input type="text" id='channel'
                        {...register('channel')}
                    />
                    <p className='error'> {errors.channel?.message} </p>
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

                <button
                    type='button'
                    onClick={() => trigger('username')}>
                    Validate
                </button>
            </form >

            <DevTool control={control} />
        </div >
    )
}
