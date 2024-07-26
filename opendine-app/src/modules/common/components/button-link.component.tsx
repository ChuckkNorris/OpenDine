import { Button } from "@mui/material"

export interface ButtonLinkProps {
  href: string | undefined;
  isActive?: boolean;
  children: React.ReactNode;
}

export const ButtonLink = ({href, isActive, children}: ButtonLinkProps) => {
  return (
    <Button href={href} color="secondary" variant="contained" sx={{mr: 2, background: isActive ? 'white': 'black'}}>
      {children}
    </Button>
  )
}