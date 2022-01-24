import React from 'react';
import ThemeProvider from './ThemeProvider';
import { TicketProvider } from './TicketProviders';

type props = {
  children: JSX.Element;
};

const Providers = ({ children }: props) => (
  <ThemeProvider>
    <TicketProvider>{children}</TicketProvider>
  </ThemeProvider>
);

export default Providers;
