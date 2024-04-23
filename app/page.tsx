'use client'

import React, { useEffect, useState } from 'react';
import '@mysten/dapp-kit/dist/index.css';
import { SuiClientProvider } from '@mysten/dapp-kit';
import { WalletProvider } from '@mysten/dapp-kit';

import { getFullnodeUrl } from '@mysten/sui.js/client';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import dynamic from 'next/dynamic';

const queryClient = new QueryClient();
const networks = {
  devnet: { url: getFullnodeUrl('devnet') },
  testnet: { url: getFullnodeUrl('testnet') },
  mainnet: { url: getFullnodeUrl('mainnet') },
};

// Importa Navbar normalmente poiché non si prevede che utilizzi localStorage
import Navbar from "../components/navbar/navbar";

// Usa l'importazione dinamica per Plot e qualsiasi altro componente che dipende da WalletProvider
const Plot = dynamic(() => import('../components/plot/plot'), {
  ssr: false // Disabilita il rendering lato server per questo componente
});

// Se WalletProvider fosse stato un componente che hai intenzione di utilizzare direttamente in Home,
// dovresti importarlo dinamicamente allo stesso modo se dipende da localStorage o altre API del browser.

export default function Home() {
  // Gestisce il rendering condizionale lato client per i componenti che dipendono da WalletProvider
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true); // Una volta montato il componente, consideralo lato client
  }, []);

   return (
    <QueryClientProvider client={queryClient}>
      <SuiClientProvider networks={networks} defaultNetwork="mainnet">
        {isClient && (
          <WalletProvider>
            <>
              <Navbar isPlace={true} />
              <Plot />
            </>
          </WalletProvider>
        )}
      </SuiClientProvider>
    </QueryClientProvider>
  );
}

