import { Button, useTheme } from "@mui/material"
import {blueGrey} from '@mui/material/colors'
import { Link, NavLink } from "react-router-dom";

export interface ButtonLinkProps {
  key?: any;
  href: string | undefined;
  isActive?: boolean;
  children: React.ReactNode;
}

export const ButtonLink = ({href, isActive, children, key}: ButtonLinkProps) => {
  const theme = useTheme();
  return (
    <NavLink
          to={href as string}
          key={key}
          >
            {({isActive, isPending, isTransitioning}) => {
                const background = isActive
                  ? theme.status.danger
                  : isPending
                    ? theme.palette.success
                    : isTransitioning
                      ? theme.palette.primary.dark
                      : theme.palette.primary.light;
                return (
                <Button color="secondary" variant="contained"
                sx={{mr: 2, background: background as string}}
              >
                {children}
              </Button>
              )}
            }
    
    </NavLink>
  )
}