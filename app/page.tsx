'use client'

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
            
          </button>
        </div>
      </div>
        
    </div>
  )
}
