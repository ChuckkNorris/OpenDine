import { Button, useTheme } from "@mui/material"
import {blueGrey} from '@mui/material/colors'

export interface ButtonLinkProps {
  href: string | undefined;
  isActive?: boolean;
  children: React.ReactNode;
}

export const ButtonLink = ({href, isActive, children}: ButtonLinkProps) => {
  const theme = useTheme();
  return (
    <Button href={href} color="secondary" variant="contained"
      sx={{mr: 2, background: isActive ? theme.status.danger: theme.palette.primary.main}}
    >
      {children}
    </Button>
  )
}