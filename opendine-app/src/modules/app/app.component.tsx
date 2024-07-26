import React, { useEffect } from 'react';
import './app.component.css';
import {SnackbarProvider} from 'notistack';
import StandardLayout from 'modules/pages/standard-layout/standard-layout.component';
import { RouterProvider } from 'react-router-dom';
import standardLayoutRouter from 'modules/pages/standard-layout/standard-layout.router';

const App = () => {
  return (
    
    // Notistack provider to stack toast notifications programatically
    <SnackbarProvider maxSnack={3} autoHideDuration={3000} onClose={() => 'Error'}>
      {/* Custom component to enqueue toast messages when observed in state */}
      {/* <NotificationHandler> */}
        {/* Primary set of page routes that compose application */}
        <RouterProvider router={standardLayoutRouter} />
        {/* <StandardLayout /> */}
      {/* </NotificationHandler> */}
    </SnackbarProvider>
  );
}

export default App;
