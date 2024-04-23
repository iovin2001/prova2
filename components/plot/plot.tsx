import React from 'react';
import './content.css';

export default function Plot() {
  // Qui potresti voler definire il titolo o altre variabili dinamiche
  const title = "Migration Information";

  // Stili CSS inline per il titolo e i paragrafi
  const titleStyle = {
    color: '#69d9e7',
    fontFamily: 'Ethnocentric',
    fontSize: '16px',
    marginBottom: '20px',
  };

  const paragraphStyle = {
    marginBottom: '20px',
  };

  // Componente di contenuto informativo
  const content = (
    <div className="content">
   
      <h2 style={titleStyle}>APE SUI SOCIETY - MIGRATION RULES</h2>
      
      <p style={paragraphStyle}>1) THE MIGRATION WILL BEGIN ON <b>APRIL 08 2024 AT 18:45 UTC </b> AND <b>THE DEADLINE WILL BE AFTER 33 DAYS AFTER THE START OF THE MIGRATION (ON 11 MAY AT 18:30 UTC).</b><br /></p>
      <p style={paragraphStyle}>2) IF YOU HAVE YOUR BORED APE SUI CLUB OR MUTANT APE SUI CLUB LISTED, DELIST IT FROM THE MARKETPLACES TO MIGRATE TO APE SUI SOCIETY NFT.<br /></p>
      <p style={paragraphStyle}>3) APE SUI SOCIETY NFTs THAT WON&apos;T BE MIGRATED BEFORE THE DEADLINE WILL BE BURNED, OR USED FOR FUTURE PROMOTIONS & REWARDS TO THE COMMUNITY.<br /></p>
      <p style={paragraphStyle}>4) ALL THE BORED APE SUI CLUB & MUTANT APE SUI CLUB NFTs THAT WON&apos;T BE MIGRATED <b>WILL BE USELESS IN FUTURE AND WILL NOT RECEIVE ANY BENEFITS FROM FUTURE PROJECT DEVELOPMENTS (REWARDS, STAKING, AIRDROP, ETC...).</b><br /></p>
      <p style={paragraphStyle}>5) IN ORDER TO MIGRATE YOU WILL NEED TO BURN YOUR BORED APE SUI CLUB OR MUTANT APE SUI CLUB NFTs WITHIN OUR WEBSITE.<br />
        <b>NFTS MUST BE BURNED ONLY THROUGH OUR WEBSITE.</b></p><br />
      <p style={paragraphStyle}>6) PRESS THE <b>“MIGRATE”</b> BUTTON TO BURN YOUR BASC/MASC NFTs. <b>THERE WILL BE A SMALL FEE OF 0.50 $SUI FOR EACH NFTS YOU&apos;LL GOING TO BURN.<br /></b>
        AFTER DOING THE BURN YOU WILL AUTOMATICALLY RECEIVE THE NEW NFTs WITHIN 24-72 HOURS DIRECTLY INTO YOUR WALLET.</p>
      <p style={paragraphStyle}>7) THE APE SUI SOCIETY COLLECTION WILL BE LISTED 72H AFTER THE START OF THE MIGRATION ON TRADEPORT</p>
      <p style={paragraphStyle}>8) A SNAPSHOT WILL BE TAKEN OF THOSE WHO HAVE BURNED THEIR BASCs/MASCs IN THE FIRST 72H FORM THE START OF THE MIGRATION, WHICH WILL MAKE THEM AUTOMATICALLY ELIGIBLE FOR THE AIRDROP.</p>
    </div>
  );

  return (
    <div className="justify-center text-center items-center mt-6">
      {content}
    </div>
  );
}
