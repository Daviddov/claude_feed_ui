import { useMutation, useQuery } from '@tanstack/react-query';
import apiClient from '../client';
import { ENDPOINTS } from '../endpoints';
import { useAuthStore } from '@/stores';
import type { User } from '@/types';
import toast from 'react-hot-toast';

interface LoginCredentials {
  username: string;
  password: string;
}

interface LoginResponse {
  success: boolean;
  token: string;
  user: User;
}

export const useLogin = () => {
  const { login } = useAuthStore();

  return useMutation({
    mutationFn: async (credentials: LoginCredentials) => {
      // TEMPORARY MOCK - Remove when backend is ready
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 500));

      // Mock login - accepts any username/password for now
      if (credentials.username && credentials.password) {
        const mockUser: User = {
          id: 1,
          username: credentials.username,
          email: `${credentials.username}@rss-analysis.local`,
          role: 'admin' as any, // Give admin role for testing
          is_active: 1,
          created_at: new Date().toISOString(),
          last_login: new Date().toISOString(),
        };

        return {
          success: true,
          token: 'mock-jwt-token-' + Math.random().toString(36),
          user: mockUser,
        };
      }

      throw new Error('נא להזין שם משתמש וסיסמה');

      // REAL API CALL - Uncomment when backend is ready
      // const response = await apiClient.post<LoginResponse>(
      //   ENDPOINTS.AUTH.LOGIN,
      //   credentials
      // );
      // return response;
    },
    onSuccess: (data: any) => {
      if (data.token && data.user) {
        login(data.token, data.user);
        toast.success('התחברת בהצלחה! (מצב דמו)');
      }
    },
    onError: (error: any) => {
      toast.error(error.message || 'שגיאה בהתחברות');
    },
  });
};

export const useLogout = () => {
  const { logout } = useAuthStore();

  return () => {
    logout();
    toast.success('התנתקת בהצלחה');
  };
};

export const useMe = () => {
  const { isAuthenticated, user } = useAuthStore();

  return useQuery({
    queryKey: ['auth', 'me'],
    queryFn: async () => {
      // TEMPORARY MOCK - Return the user from store
      await new Promise(resolve => setTimeout(resolve, 100));
      return { user };

      // REAL API CALL - Uncomment when backend is ready
      // const response = await apiClient.get<{ user: User }>(ENDPOINTS.AUTH.ME);
      // return response;
    },
    enabled: isAuthenticated,
    staleTime: 1000 * 60 * 10, // 10 minutes
    retry: false,
  });
};
