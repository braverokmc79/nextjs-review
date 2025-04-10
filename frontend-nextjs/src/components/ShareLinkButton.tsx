"use client";
import React, { useState } from 'react'
import { Button } from './ui/button';
import { LinkIcon } from '@heroicons/react/16/solid';




const ShareLinkButton:React.FC = () => {

  const [clicked, setClicked] = useState(false);

  const handleClick = () => {
    navigator.clipboard.writeText(window.location.href);
    setClicked(true);    
    setTimeout(() => { setClicked(false)}, 1500);  
  }


  return (
    <Button onClick={handleClick}
        className='border px-2 py-1 text-xs rounded-lg hover:bg-rose-700 mb-2'>  
      <LinkIcon/>    {clicked ? "Link copied!" : "Share link"}            
    </Button>
  )
}

export default ShareLinkButton;