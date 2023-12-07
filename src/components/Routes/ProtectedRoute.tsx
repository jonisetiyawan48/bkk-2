import { Navigate, useLocation } from 'react-router-dom';
import { isLogged } from '../../utils/helpers/isLogged';

export default function ProtectedRoute({ children }: { children: any }) {
  const loggedStatus = isLogged();
  const location = useLocation();

  if(!loggedStatus){
    return <Navigate to={'/'} state={{from:location}} replace/>
  }

  return <>{children}</>
}
