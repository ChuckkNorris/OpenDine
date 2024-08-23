import { Link, NavLink, useLocation } from 'react-router-dom';
import standardLayoutRouter from './standard-layout.router';
import { ButtonLink } from 'modules/common/components/button-link.component';
import { loginRequest } from 'modules/app/auth/auth.config';
import { AuthenticatedTemplate, UnauthenticatedTemplate, useMsal } from '@azure/msal-react';
import { Button } from '@mui/material';

export const StandardLayoutNavigation = () => {
  const location = useLocation();
  const { instance } = useMsal();
    
  const handleLoginRedirect = () => {
      instance.loginRedirect(loginRequest).catch((error) => console.log(error));
  };

  const handleLogoutRedirect = () => {
      instance.logoutRedirect().catch((error) => console.log(error));
  };

  const navMenuOptions = standardLayoutRouter.routes[0].children
  ?.filter(route => isNaN(route?.id?.replaceAll('-', '') as any))
  ?? [];
  return (
    <>
      {navMenuOptions.map((navOption, idx) => (
          <ButtonLink
            key={idx}
            href={navOption.path}>
              {navOption.id}
          </ButtonLink>
      ))}
       <AuthenticatedTemplate>
          <div className="collapse navbar-collapse justify-content-end">
              <Button variant='contained' onClick={handleLogoutRedirect}>
                  Sign out
              </Button>
          </div>
      </AuthenticatedTemplate>
      <UnauthenticatedTemplate>
          <div className="collapse navbar-collapse justify-content-end">
              <Button variant='contained' onClick={handleLoginRedirect}>Sign in</Button>
          </div>
      </UnauthenticatedTemplate>
    </>
  )
}

export default StandardLayoutNavigation;
