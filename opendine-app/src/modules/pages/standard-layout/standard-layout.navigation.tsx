import { AppBar, Container, Toolbar } from '@mui/material';
import { Outlet, RouterProvider, useLocation, useMatch } from 'react-router-dom';
// import HideOnScroll from 'modules/common/components/hide-on-scroll/hide-on-scroll.component';
import { Box, styled } from '@mui/system';
import standardLayoutRouter from './standard-layout.router';
import { ButtonLink } from 'modules/common/components/button-link.component';

// const navMenuOptions = standardLayoutRouter.routes[0].children
//   ?.filter(route => isNaN(route?.id?.replaceAll('-', '') as any))
//   ?? [];

export const StandardLayoutNavigation = () => {
  const location = useLocation();
  console.warn('location', location);
  console.warn("paths", standardLayoutRouter.routes[0].children)
  return (
    <>
      {/* {navMenuOptions.map((navOption, idx) => (
          <ButtonLink
            key={idx}
            isActive={location.pathname === navOption.path}
            href={navOption.path}>
              {navOption.id} {navOption.path}
          </ButtonLink>
      ))} */}
    </>
  )
}

export default StandardLayoutNavigation;
