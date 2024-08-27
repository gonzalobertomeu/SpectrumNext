import { Avatar, Button, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, useDisclosure } from "@nextui-org/react"
import { useContext, useEffect } from "react"
import { FiRepeat } from 'react-icons/fi'
import { UserContext } from "../../context/User.context"

export const UserSwitch = () => {
    const { isOpen, onOpen, onOpenChange } = useDisclosure();

    useEffect(() => {
        console.log(isOpen, onOpen)
    }, [isOpen])

    const { value: user } = useContext(UserContext);

    return <>
        <Button fullWidth
            className="flex flex-row flex-1 h-14 p-2 pr-5"
            radius="full"
            color="primary"
            onPress={onOpen}
        >
            <Avatar name="S/D" isBordered />
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
        <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
            <ModalContent>
                {(onClose) => (
                    <>
                        <ModalHeader className="flex flex-col gap-1">Modal Title</ModalHeader>
                        <ModalBody>
                            <p>
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                                Nullam pulvinar risus non risus hendrerit venenatis.
                                Pellentesque sit amet hendrerit risus, sed porttitor quam.
                            </p>
                            <p>
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                                Nullam pulvinar risus non risus hendrerit venenatis.
                                Pellentesque sit amet hendrerit risus, sed porttitor quam.
                            </p>
                            <p>
                                Magna exercitation reprehenderit magna aute tempor cupidatat consequat elit
                                dolor adipisicing. Mollit dolor eiusmod sunt ex incididunt cillum quis.
                                Velit duis sit officia eiusmod Lorem aliqua enim laboris do dolor eiusmod.
                                Et mollit incididunt nisi consectetur esse laborum eiusmod pariatur
                                proident Lorem eiusmod et. Culpa deserunt nostrud ad veniam.
                            </p>
                        </ModalBody>
                        <ModalFooter>
                            <Button color="danger" variant="light" onPress={onClose}>
                                Close
                            </Button>
                            <Button color="primary" onPress={onClose}>
                                Action
                            </Button>
                        </ModalFooter>
                    </>
                )}
            </ModalContent>
        </Modal>
    </>
}