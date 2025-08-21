import React, { useContext, useState } from "react";
import { Button, Input,Dropdown,DropdownTrigger,DropdownMenu,DropdownSection,DropdownItem,Modal,ModalContent,ModalHeader,ModalBody,ModalFooter,useDisclosure, addToast, ToastProvider} from "@heroui/react"


export default function DropDownCard({onOpen,setUpdateMode}){
    return(
<Dropdown>
<DropdownTrigger>
<svg className="w-16 rotate-90 outline-none cursor-pointer" xmlns="http://www.w3.org/2000/svg" width="27" height="27" viewBox="0 0 24 24" fill="none" stroke="#b0b0b0" strokeWidth="2" strokeLinecap="square" strokeLinejoin="round">
  <circle cx="12" cy="12" r="1"></circle>
  <circle cx="19" cy="12" r="1"></circle>
  <circle cx="5" cy="12" r="1"></circle>
  </svg>
</DropdownTrigger>
<DropdownMenu aria-label="Static Actions">
  <DropdownItem onPress={()=>setUpdateMode(true)} key="edit">Edit file</DropdownItem>
  <DropdownItem onPress={onOpen}  key="delete" className="text-danger" color="danger">
    Delete file
  </DropdownItem>
</DropdownMenu>
</Dropdown>
    )
}
 
