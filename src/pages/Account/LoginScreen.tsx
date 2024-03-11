import { FieldValues, useForm } from "react-hook-form";

const LoginScreen = () => {
    const { register, handleSubmit } = useForm();

    const submitForm = (data: FieldValues) => {
        console.log(data.email);
    };

    return (
        <form onSubmit={handleSubmit(submitForm)}>
            <div className="form-group">
                <label htmlFor="email">Email</label>
                <input
                    type="email"
                    className="form-input"
                    {...register("email")}
                    required
                />
            </div>
            <div className="form-group">
                <label htmlFor="password">Password</label>
                <input
                    type="password"
                    className="form-input"
                    {...register("password")}
                    required
                />
            </div>
            <button type="submit" className="button">
                Login
            </button>
        </form>
    );
};
export default LoginScreen;
