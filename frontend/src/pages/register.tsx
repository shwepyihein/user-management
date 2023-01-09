import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { classNames } from "../utils";
import { doSignUp } from "../api/user/user";
import { useMutation } from "react-query";

interface userRegister {
  user_Id: string;
  password: string;
  confirm_password: string;
}

const schema = yup
  .object({
    user_Id: yup.string().required("User is Required"),
    password: yup
      .string()
      .required("No password provided.")
      .min(8, "Password is too short - should be 8 chars minimum.")
      .matches(/[a-zA-Z]/, "Password can only contain Latin letters."),
    confirm_password: yup
      .string()
      .test("passwords-match", "Passwords must match", function (value) {
        console.log(value);
        return this.parent.password === value;
      }),
  })
  .required();

export default function RegisterPage() {
  const navigate = useNavigate();

  const { mutate: registerUser } = useMutation(
    (userData: userRegister) =>
      doSignUp({
        user_Id: userData.user_Id,
        password: userData.password,
      }),
    {
      onSuccess: (res) => {
        localStorage.setItem("access_token", res.data.token);

        navigate("/dashboard");
      },
      onError: (error: any) => {
        //
      },
    }
  );

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      user_Id: "",
      password: "",
      confirm_password: "",
    },
    resolver: yupResolver(schema),
  });

  const onSubmit = (submitData: userRegister) => {
    registerUser(submitData);
  };

  return (
    <>
      <div className="flex flex-row-reverse min-h-screen">
        <div className="flex flex-1 flex-col justify-center py-12 px-4 sm:px-6 lg:flex-none lg:px-20 xl:px-24">
          <div className="mx-auto w-full max-w-sm lg:w-96">
            <div className="flex items-center gap-3">
              <img
                className="h-12 w-auto"
                src="
                https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
                alt="Your Company"
              />
              <h2 className="mr-2 text-3xl font-bold tracking-tight text-gray-900">
                Register
              </h2>
            </div>

            <div className="mt-8">
              <div className="mt-6">
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                  <div>
                    <label
                      htmlFor="email"
                      className={classNames(
                        errors.user_Id?.message
                          ? "text-red-500"
                          : "text-gray-700",
                        "block text-sm font-medium "
                      )}
                    >
                      User ID
                    </label>
                    <div className="mt-1">
                      <input
                        {...register("user_Id")}
                        id="user_Id"
                        name="user_Id"
                        type="user_Id"
                        autoComplete="user_Id"
                        required
                        className={classNames(
                          errors.user_Id?.message
                            ? "border-red-400 placeholder-red-400 focus:border-red-500 focus:ring-red-500"
                            : " border-gray-300 placeholder-gray-400 focus:border-indigo-500 focus:ring-indigo-500",
                          "block w-full appearance-none rounded-md border px-3 py-2  shadow-sm  focus:outline-none  sm:text-sm"
                        )}
                      />
                      <p className="ml-2 text-red-500 text-sm">
                        {errors.user_Id?.message}
                      </p>
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label
                      htmlFor="password"
                      className={classNames(
                        errors.password?.message
                          ? "text-red-500"
                          : "text-gray-700",
                        "block text-sm font-medium "
                      )}
                    >
                      Password
                    </label>
                    <div className="mt-1">
                      <input
                        {...register("password")}
                        id="password"
                        name="password"
                        type="password"
                        autoComplete="current-password"
                        required
                        className={classNames(
                          errors.password?.message
                            ? "border-red-400 placeholder-red-400 focus:border-red-500 focus:ring-red-500"
                            : " border-gray-300 placeholder-gray-400 focus:border-indigo-500 focus:ring-indigo-500",
                          "block w-full appearance-none rounded-md border px-3 py-2  shadow-sm  focus:outline-none  sm:text-sm"
                        )}
                      />
                      <p className="ml-2 text-red-500 text-sm">
                        {errors.password?.message}
                      </p>
                    </div>
                  </div>
                  <div className="space-y-1">
                    <label
                      htmlFor="password"
                      className={classNames(
                        errors.confirm_password?.message
                          ? "text-red-500"
                          : "text-gray-700",
                        "block text-sm font-medium "
                      )}
                    >
                      Confirm Password
                    </label>
                    <div className="mt-1">
                      <input
                        {...register("confirm_password")}
                        id="password"
                        name="confirm_password"
                        type="password"
                        required
                        className={classNames(
                          errors.confirm_password?.message
                            ? "border-red-400 placeholder-red-400 focus:border-red-500 focus:ring-red-500"
                            : " border-gray-300 placeholder-gray-400 focus:border-indigo-500 focus:ring-indigo-500",
                          "block w-full appearance-none rounded-md border px-3 py-2  shadow-sm  focus:outline-none  sm:text-sm"
                        )}
                      />
                    </div>
                    <p className="ml-2 text-red-500 text-sm">
                      {errors.confirm_password?.message}
                    </p>
                  </div>

                  <div className="flex items-center justify-end">
                    <div className="text-sm">
                      <Link
                        to="/"
                        className="font-medium text-indigo-600 hover:text-indigo-500"
                      >
                        Sign in
                      </Link>
                    </div>
                  </div>

                  <div>
                    <button
                      type="submit"
                      className="flex w-full justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                    >
                      Register
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
        <div className="relative hidden w-0 flex-1 lg:block">
          <img
            className="absolute inset-0 h-full w-full object-cover"
            src="https://images.unsplash.com/photo-1505904267569-f02eaeb45a4c?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1908&q=80"
            alt=""
          />
        </div>
      </div>
    </>
  );
}
