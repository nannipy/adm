// components/Whatsapp.js

'use client';

import React from 'react';
import { FaWhatsapp } from 'react-icons/fa';

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
      className="bg-green-600 w-min p-2 rounded-full fixed bottom-10 right-4 cursor-pointer"
      onClick={handleClick}
    >
      <FaWhatsapp color="white" className="w-7 h-7" />
    </div>
  );
};

export default Whatsapp;