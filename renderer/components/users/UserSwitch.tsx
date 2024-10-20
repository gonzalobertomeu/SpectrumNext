import { Autocomplete, AutocompleteItem, Avatar, Button, Input, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, Select, SelectItem, useDisclosure } from "@nextui-org/react"
import { useContext, useEffect, useState } from "react"
import { FiRepeat, FiX } from 'react-icons/fi'
import { UserContext } from "../../context/User.context"
import { UserSelectionModal } from "./UserSelectionModal"

export const UserSwitch = () => {
    const { isOpen, onOpen, onOpenChange } = useDisclosure();


    useEffect(() => {
        console.log(isOpen, onOpen)
    }, [isOpen])

    const { value: user, setValue: setUser } = useContext(UserContext);

    return <>
        <Button fullWidth
            className="flex flex-row flex-1 h-14 p-2 pr-5"
            radius="full"
            color="primary"
            onPress={onOpen}
        >
            <Avatar src={`https://robohash.org/${user?.id || 'default'}`} name={user?.name || 'S/D'} isBordered />
            <div className="flex-1 text-left pl-1">
                <span className="text-base">
                    {user?.id ?
                        user.name + ' ' + user.surname :
                        'Sin definir'
                    }
                </span>
            </div>
            <FiRepeat />
        </Button>
        <UserSelectionModal
            isOpen={isOpen}
            onOpenChange={onOpenChange}
        />
    </>
}