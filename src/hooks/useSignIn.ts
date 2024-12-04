import {
  useQueryClient,
  useMutation,
  UseMutateFunction,
} from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';

interface User {
  id: string;
  email: string;
  token: string;
}

class ResponseError extends Error {
  response: Response;

  constructor(message: string, response: Response) {
    super(message);
    this.response = response;
  }
}

async function signIn(email: string, password: string): Promise<User> {
  const response = await fetch('http://localhost:3000/api/auth/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, password }),
  });

  if (!response.ok) {
    throw new ResponseError('Failed on sign in request', response);
  }

  const data = await response.json();
  localStorage.setItem('token', data.token); // Store token in local storage
  return data;
}

type IUseSignIn = UseMutateFunction<
  User,
  unknown,
  {
    email: string;
    password: string;
  },
  unknown
>;

export function useSignIn(): IUseSignIn {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const signInMutation = useMutation({
    mutationFn: ({ email, password }: { email: string; password: string }) =>
      signIn(email, password),
    onSuccess: (data) => {
      // Invalidate queries or perform other actions on success
      queryClient.invalidateQueries(['user']);
      navigate('/invoices'); // Navigate to the invoices page
    },
    onError: (error) => {
      console.error('Sign-in error:', error);
    },
  });

  return signInMutation.mutate;
}
