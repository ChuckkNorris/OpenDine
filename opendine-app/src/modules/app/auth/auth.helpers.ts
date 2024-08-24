import { EventType, PublicClientApplication } from "@azure/msal-browser"
import { msalConfig } from "modules/app/auth/auth.config";
import { Navigate, redirect } from "react-router-dom";

const msalClient = new PublicClientApplication(msalConfig);
// Listen for sign-in event and set active account
msalClient.addEventCallback((event: any) => {
  if (event.eventType === EventType.LOGIN_SUCCESS && event.payload.account) {
      const account = event.payload.account;
      msalClient.setActiveAccount(account);
  }
});

export const getMsalClient = (): PublicClientApplication => msalClient;


export const trySetDefaultAccount = () => {
  // Default to using the first account if no account is active on page load
if (!msalClient.getActiveAccount() && msalClient.getAllAccounts().length > 0) {
  // Account selection logic is app dependent. Adjust as needed for different use cases.
  msalClient.setActiveAccount(msalClient.getActiveAccount());
}
}

export const getIdToken = async (): Promise<string | Response> => {
  const client = getMsalClient();
  client.initialize();
  const defaultAccount = client.getActiveAccount() ?? client.getAllAccounts()[0];
  if (defaultAccount) {
    const result = await client.acquireTokenSilent({scopes: [''], account: defaultAccount});
    return result.idToken;
  } else {
    console.error('No active account! Need to retrigger login process');
    return '';
    // return redirect('/login');
    //Navigate({ to: '/login'});
  }
}
