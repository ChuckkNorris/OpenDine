import { Link, NavLink, useLocation } from 'react-router-dom';
import standardLayoutRouter from './standard-layout.router';
import { ButtonLink } from 'modules/common/components/button-link.component';

export const StandardLayoutNavigation = () => {
  const location = useLocation();
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
    </>
  )
}

export default StandardLayoutNavigation;
