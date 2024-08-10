import 'modules/app/app.component.css';
import {SnackbarProvider} from 'notistack';
import { RouterProvider } from 'react-router-dom';
import standardLayoutRouter from 'modules/pages/standard-layout/standard-layout.router';
import { ThemeProvider } from '@mui/material';
import theme from 'modules/app/app.theme';
import { Provider } from 'react-redux';
import { store } from 'modules/app/app.store';

// Defines providers (components which provide functionality throughout the app - child components can access their context),
// handlers (components which handle certain application functionality, such as notifications),
// and the root application router (component which renders configured components/elements based on the browser URL/route).
const App = () => {
  return (
    // Provides theme to all child components e.g. `const theme = useTheme()`
    <ThemeProvider theme={theme}>
      <Provider store={store}>
      {/* Notistack provider to stack toast notifications programatically */}
      <SnackbarProvider maxSnack={3} autoHideDuration={3000} onClose={() => 'Error'}>
        {/* Custom component to enqueue toast messages when observed in state */}
        {/* <NotificationHandler> */}
          {/* Primary set of page routes that compose application */}
          <RouterProvider router={standardLayoutRouter} />
          {/* <StandardLayout /> */}
        {/* </NotificationHandler> */}
      </SnackbarProvider>

      </Provider>
    </ThemeProvider>
  );
}

export default App;
