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
        <div className="flex flex-col items-center my-10 py-10">
          <button
            onClick={(e) => {
              e.preventDefault();
              router.push("/place");
            }}
            type="button"
            style={{
              boxShadow: "0px 0px 0px 3px rgba(178,146,85,0.7)",
            }}
            className="glow-buttonblue flex items-center p-4 transition ease-in duration-200 uppercase rounded-full hover:bg-buttonblue hover:text-grey hover:shadow-[0_35px_60px_-15px_rgba(0,0,0,0.3)] border border-cyan-900 focus:outline-none bg-white text-black gap-x-2 font-ethnocentric"
          >
            Launch App
            <Image
              height={20}
              width={20}
              src="/images/sui_dark.svg"
              alt="Wallet"
              className={
                "rounded-full border-blue justify-center text-center items-center"
              }
            />
          </button>
        </div>
      </div>
        <div className="w-full col-start-5 col-end-8 h-full p-0 m-0">
          <Image src={"/images/logo.png"} height={500} width={350} alt={"minesweeper"} />
        </div>
    </div>
  )
}
