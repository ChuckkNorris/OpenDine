import React, { useEffect } from 'react';
import './app.component.css';
import {SnackbarProvider} from 'notistack';
import StandardLayout from 'modules/pages/standard-layout/standard-layout.component';

const App = () => {
  return (
    
    // Notistack provider to stack toast notifications programatically
    <SnackbarProvider maxSnack={3} autoHideDuration={3000} onClose={() => 'Error'}>
      {/* Custom component to enqueue toast messages when observed in state */}
      {/* <NotificationHandler> */}
        {/* Primary set of page routes that compose application */}
        
        <StandardLayout />
      {/* </NotificationHandler> */}
    </SnackbarProvider>
  );
}

export default App;
