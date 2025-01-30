"use client"

import { useRouter } from "next/navigation";
import Image from 'next/image'


export function Logo(){
 
    const router = useRouter();

    return(
        <>
           <div className='min-h-20 h-20 flex items-center px-6 border-b' onClick={()=> router.push("/")}>
           
                 <Image src="/logo.svg" alt="logo" width={30} height={30}  priority/>
                 <h1 className="font-bold text-xl">LightManager</h1>
           </div>
        </>
    )
}