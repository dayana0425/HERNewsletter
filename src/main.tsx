import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material';
import {
  EthereumClient,
  w3mProvider,
  w3mConnectors,
} from '@web3modal/ethereum';
import { WagmiConfig, createClient, configureChains } from 'wagmi';
import { Web3Modal } from '@web3modal/react';
import { bellecour } from './config/walletConnection';
import './main.css';

import Front from './pages/Front';
import Form from './pages/Form';
import SendWeb3Email from './pages/SendWeb3Email';
import PageNotFound from './pages/PageNotFound';
import Newsletter from './pages/Newsletter';
import LoginGuard from './features/loginGuard';

const rootElement = document.getElementById('root');
const root = createRoot(rootElement!);

const theme = createTheme({
  palette: {
    primary: {
      main: '#fc5af4',
      contrastText: '#1D1D24',
    },
  },
});

if (!import.meta.env.VITE_WALLET_CONNECT_PROJECT_ID) {
  throw new Error(
    'You need to provide a WALLET_CONNECT_PROJECT_ID env variable'
  );
}
const projectId = import.meta.env.VITE_WALLET_CONNECT_PROJECT_ID!;
const chains = [bellecour];
const { provider } = configureChains(chains, [w3mProvider({ projectId })]);

const wagmiClient = createClient({
  autoConnect: true,
  connectors: w3mConnectors({ chains, projectId }),
  provider,
});

const ethereumClient = new EthereumClient(wagmiClient, chains);

root.render(
  <StrictMode>
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <WagmiConfig client={wagmiClient}>
          <LoginGuard>
            <Web3Modal projectId={projectId} ethereumClient={ethereumClient} />
            <Routes>
              <Route path="/" element={<Front />} />
              <Route path="/email" element={<SendWeb3Email />} />
              <Route path="/signup" element={<Form />} />
              <Route path="/newsletter" element={<Newsletter />} />
              <Route path="*" element={<PageNotFound />} />
            </Routes>
          </LoginGuard>
        </WagmiConfig>
      </BrowserRouter>
    </ThemeProvider>
  </StrictMode>
);
