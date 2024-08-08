import React from 'react'
import {
    DropdownMenu,
    DropdownMenuContent,
   
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
  } from "../../components/ui/dropdown-menu";
import { Avatar,AvatarFallback,AvatarImage } from '../../components/ui/avatar';
const CustomAvatar = (data) => {
    
  return (
    <div className="flex  sm:hidden items-center justify-center h-12">
        s
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Avatar>
          <AvatarFallback>JB</AvatarFallback>
          <AvatarImage
            className="h-10 w-10"
            src={"https://github.com/shadcn.png"}
          />
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuSeparator />
    
      </DropdownMenuContent>
    </DropdownMenu>
  </div>
  )
}

export default CustomAvatar
