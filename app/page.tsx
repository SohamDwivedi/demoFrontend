'use client';
import Image from "next/image";
import { useEffect } from "react";

export default function Home() {
  useEffect(()=>{
    const value = localStorage.getItem('user');
    console.log(value,'--user');
    if(value && value!=''){
      window.location.href = '/question';
    }else{
      window.location.href = '/login';
    }
  },[])
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      
    </main>
  );
}
