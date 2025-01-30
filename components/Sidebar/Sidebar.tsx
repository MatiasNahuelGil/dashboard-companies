
import { Logo } from "@/components/Logo";
import { SidebarRoutes } from "../SidebarRoutes";

export function Sidebar(){
   
    

    return(
        <>
           <aside className="h-screen">
               <div className="h-full flex flex-col border-r cursor-pointer gap-2" >
                     <Logo/>
                     <SidebarRoutes/>
               </div>
           </aside>
        </>
    )
}