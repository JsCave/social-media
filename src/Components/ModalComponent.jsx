import React from "react";
import { Button, Input,Dropdown,DropdownTrigger,DropdownMenu,DropdownSection,DropdownItem,Modal,ModalContent,ModalHeader,ModalBody,ModalFooter,useDisclosure, addToast, ToastProvider} from "@heroui/react"



export default function ModalComponent({isOpen,onOpenChange,deleteFunction,isPostDeleteing}){
    return(
              <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
                <ModalContent>
                  {(onClose) => (
                    <>
                      <ModalHeader className="flex flex-col gap-1">Delete Post</ModalHeader>
                      <ModalBody>
                        <p>
        Are You Sure you want Delete Post?
                        </p>
                      </ModalBody>
                      <ModalFooter>
                        <Button color="primary" variant="light" onPress={onClose}>
                          Close
                        </Button>
                        <Button isLoading={isPostDeleteing} color="danger" onPress={()=>deleteFunction(onClose)}>
                          Delete
                        </Button>
                      </ModalFooter>
                    </>
                  )}
                </ModalContent>
              </Modal>
    )
}