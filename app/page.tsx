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

// Se WalletProvider fosse stato un componente che hai intenzione di utilizzare direttamente in Home,
// dovresti importarlo dinamicamente allo stesso modo se dipende da localStorage o altre API del browser.

import Image from 'next/image'
import { useRouter } from 'next/navigation';

export default function Home() {
  const router = useRouter();
  return (
    <div className="grid grid-cols-8 gap-4 gap-x-12 py-32 my-16 h-4">
      <style jsx>{`
        @font-face {
          font-family: 'Ethnocentric';
          src: url('./ethnocentric.otf') format('opentype');
        }
        .text-azzurro {
          color: #1DCDFF;
        }
        .font-ethnocentric {
          font-family: 'Ethnocentric';
        }
      `}</style>
      <div className="w-full col-start-2 col-end-4 justify-center font-ethnocentric">
        <span className="text-6xl font-heading py-2 tracking-wider">
        Let’s 
        </span>
        <span className="text-banner text-azzurro font-heading font-bold py-2">
        start&nbsp;
        </span>
        <div className="tracking-wide text-xl w-full col-start-2 col-end-4 justify-center">
          <span className="text-white">
          the &nbsp;
          </span>
          <span className="text-azzurro">
          migration! &nbsp;
          </span>
          
        </div>
     
    </div>
  )
}
