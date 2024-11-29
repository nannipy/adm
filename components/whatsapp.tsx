// components/Whatsapp.js

'use client';

import React from 'react';
import { MessageSquare } from 'lucide-react';

const Whatsapp = () => {
  const phoneNumber = '+393341287766'; // Sostituisci con il tuo numero

  const handleClick = () => {
    // Controlla se l'app WhatsApp è installata sul dispositivo
    if (navigator.userAgent.includes('WhatsApp')) {
      window.open(`whatsapp://send?phone=${phoneNumber}`);
    } else {
      window.open(`https://web.whatsapp.com/send?phone=${phoneNumber}`, '_blank');
    }
  };

  return (
    <div 
      className="bg-blue-700 p-4 mr-6 md:mr-2 rounded-full fixed bottom-32 z-50 right-4 cursor-pointer hover:bg-neutral-700 "
      onClick={handleClick}
    >
      <MessageSquare color="white" className="w-7 h-7" />
    </div>
  );
};

export default Whatsapp;