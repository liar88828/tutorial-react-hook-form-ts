import { useForm } from 'react-hook-form'
import '../../style/YoutubeForm.css'

export const YoutubeForm = () => {
    const form = useForm()
    const { register } = form
    // const { name, ref, onChange, onBlur } = register('username')

    return (
        <div>
            <form >
                <label htmlFor="username"> Username</label>
                <input type="text"
                    id='username'
                    {...register('username')}
                // name={name}
                // ref={ref}
                // onChange={onChange}
                // onBlur={onBlur}
                />

                <label htmlFor="email">Email</label>
                <input type="text" id='email'
                    {...register('email')}
                // name="email" 
                />

                <label htmlFor="channel">Channel</label>
                <input type="text" id='channel'
                    {...register('channel')}
                //  name="channel"
                />
                <button>Submit</button>
            </form>


        </div>
    )
}
