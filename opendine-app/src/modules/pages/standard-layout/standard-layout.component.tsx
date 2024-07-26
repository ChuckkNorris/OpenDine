import { AppBar, Container, Toolbar } from '@mui/material';
import { Outlet } from 'react-router-dom';
import { Box, styled } from '@mui/system';
import StandardLayoutNavigation from 'modules/pages/standard-layout/standard-layout.navigation';

const ToolbarFill = styled('div')({ flexGrow: 1});
const PageWrapper = styled('div')((props) => ({ padding: props.theme.spacing(4) }));

export const StandardLayout = () => {
  return (
    <>
        <AppBar position='sticky'>
          <Container maxWidth="xl">
            <Toolbar disableGutters>
              <Box sx={{ mr: 2 }}>
                OpenDine
              </Box>
              <ToolbarFill />
              <StandardLayoutNavigation />
            </Toolbar>
          </Container>
        </AppBar>
      <PageWrapper>
        {/* Child route components will be rendered here */}
        <Outlet />
      </PageWrapper>
    </>
  )
}

export default StandardLayout;