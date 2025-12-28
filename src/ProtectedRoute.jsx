import { Navigate, useLocation } from "react-router-dom";

const ProtectedRoute = ({ user, children }) => {
  const location = useLocation();

  if (!user) {
    // حفظ المسار الحالي للعودة إليه بعد تسجيل الدخول
    return <Navigate to={`/login?redirect=${encodeURIComponent(location.pathname)}`} replace />;
  }

  return children;
};

export default ProtectedRoute;