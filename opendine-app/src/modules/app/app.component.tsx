import 'modules/app/app.component.css';
import {SnackbarProvider} from 'notistack';
import { RouterProvider } from 'react-router-dom';
import standardLayoutRouter from 'modules/pages/standard-layout/standard-layout.router';
import { ThemeProvider } from '@mui/material';
import theme from 'modules/app/app.theme';

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      {/* Notistack provider to stack toast notifications programatically */}
      <SnackbarProvider maxSnack={3} autoHideDuration={3000} onClose={() => 'Error'}>
        {/* Custom component to enqueue toast messages when observed in state */}
        {/* <NotificationHandler> */}
          {/* Primary set of page routes that compose application */}
          <RouterProvider router={standardLayoutRouter} />
          {/* <StandardLayout /> */}
        {/* </NotificationHandler> */}
      </SnackbarProvider>
    </ThemeProvider>
  );
}

export default App;
