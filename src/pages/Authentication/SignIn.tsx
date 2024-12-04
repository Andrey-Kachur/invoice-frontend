import React, { useState } from 'react';
import { z } from 'zod';
import { useSignIn } from '../../hooks/useSignIn';

const signInSchema = z.object({
  email: z.string().email({ message: 'Invalid email address' }),
  password: z
    .string()
    .min(5, { message: 'Password must be at least 5 characters long' }),
});

type SignInFormData = z.infer<typeof signInSchema>;

const SignIn: React.FC = () => {
  const [user, setUser] = useState<SignInFormData>({
    email: '',
    password: '',
  });
  const [errors, setErrors] = useState<Partial<SignInFormData>>({});
  const [serverError, setServerError] = useState<string | null>(null);
  const signIn = useSignIn();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUser((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Validate the form data using Zod
    const result = signInSchema.safeParse(user);
    if (!result.success) {
      const fieldErrors = result.error.flatten().fieldErrors;
      setErrors(fieldErrors);
      return;
    }

    // Clear previous errors
    setErrors({});
    setServerError(null);

    // Call the signIn mutation
    signIn(user, {
      onError: (error: any) => {
        if (error.response && error.response.status === 401) {
          setServerError('Invalid email or password');
        } else {
          setServerError('An unexpected error occurred');
        }
      },
    });
  };

  return (
    <>
      <div className="flex items-center justify-center min-h-screen">
        <div className="xl:w-1/2 rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
          <div className="flex flex-wrap items-center">
            <div className="w-full border-stroke dark:border-strokedark xl:border-l-2">
              <div className="w-full p-4 sm:p-12.5 xl:p-17.5">
                <h2 className="mb-9 text-2xl font-bold text-black dark:text-white sm:text-title-xl2">
                  Sign In to InvoicesApp
                </h2>

                <form onSubmit={handleSubmit}>
                  <div className="mb-4">
                    <label className="mb-2.5 block font-medium text-black dark:text-white">
                      Email
                    </label>
                    <div className="relative">
                      <input
                        type="email"
                        name="email"
                        value={user.email}
                        onChange={handleChange}
                        className="w-full rounded border border-stroke bg-white py-3 px-4 text-black dark:bg-boxdark dark:text-white"
                      />
                      {errors.email && (
                        <p className="text-red-500">{errors.email}</p>
                      )}
                    </div>
                  </div>

                  <div className="mb-4">
                    <label className="mb-2.5 block font-medium text-black dark:text-white">
                      Password
                    </label>
                    <div className="relative">
                      <input
                        type="password"
                        name="password"
                        value={user.password}
                        onChange={handleChange}
                        className="w-full rounded border border-stroke bg-white py-3 px-4 text-black dark:bg-boxdark dark:text-white"
                      />
                      {errors.password && (
                        <p className="text-red-500">{errors.password}</p>
                      )}
                    </div>
                  </div>

                  {serverError && <p className="text-red-500">{serverError}</p>}

                  <button
                    type="submit"
                    className="mt-4 w-full rounded bg-blue-500 py-3 text-white"
                  >
                    Sign In
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SignIn;
