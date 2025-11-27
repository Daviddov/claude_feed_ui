import { useAuthStore } from '@/stores';
import { PERMISSIONS, type Permission } from '@/config/permissions';

export const usePermissions = () => {
  const { user } = useAuthStore();

  const can = (permission: Permission): boolean => {
    if (!user) return false;
    return PERMISSIONS[permission].includes(user.role);
  };

  const hasRole = (roles: string[]): boolean => {
    return user ? roles.includes(user.role) : false;
  };

  const isAdmin = (): boolean => {
    return user?.role === 'admin';
  };

  const isEditor = (): boolean => {
    return user?.role === 'editor';
  };

  const isAnalyst = (): boolean => {
    return user?.role === 'analyst';
  };

  return {
    can,
    hasRole,
    isAdmin,
    isEditor,
    isAnalyst,
  };
};
