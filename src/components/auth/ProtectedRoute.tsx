
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from './AuthProvider';

type ProtectedRouteProps = {
  children: React.ReactNode;
  requireAuth?: boolean;
  requireAdmin?: boolean;
  allowClient?: boolean;
};

export function ProtectedRoute({
  children,
  requireAuth = true,
  requireAdmin = false,
  allowClient = false,
}: ProtectedRouteProps) {
  const { user, isAdmin, loading, clientId } = useAuth();
  const location = useLocation();

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-pulse-opacity text-2xl">Loading...</div>
      </div>
    );
  }

  // Check if client access is allowed and client ID is present
  const hasClientAccess = allowClient && clientId;

  // Redirect to login if authentication is required but user is not logged in
  // and there's no valid client token
  if (requireAuth && !user && !hasClientAccess) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // Redirect to unauthorized page if admin access is required but user is not an admin
  if (requireAdmin && !isAdmin && !hasClientAccess) {
    return <Navigate to="/unauthorized" state={{ from: location }} replace />;
  }

  // User has permission to access the route
  return <>{children}</>;
}
