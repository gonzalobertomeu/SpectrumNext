import { Autocomplete, AutocompleteItem, Avatar, Button, Modal, ModalBody, ModalContent, ModalHeader, useDisclosure } from "@nextui-org/react";
import { useContext, useEffect, useState } from "react";
import { User, UserContext } from "../../context/User.context";
import { FiRepeat, FiUserPlus, FiX } from "react-icons/fi";
import { UserCreationModal } from "./UserCreationModal";


interface ModalProps {
    isOpen: boolean;
    onOpenChange: (isOpen: boolean) => void;
}

export const UserSelectionModal = ({ isOpen, onOpenChange }: ModalProps) => {
    const [usuarios, setUsuarios] = useState<User[]>([]);

    useEffect(() => {
        window.electron.medic('list').then(setUsuarios)
        setSelectedUser(null);
    }, [isOpen])

    const [searchValue, setSearchValue] = useState<string>('');
    const [selectedUser, setSelectedUser] = useState<User | null>(null);

    const { value: user, setValue: setUser } = useContext(UserContext);

    const { isOpen: isOpenNewUser, onOpen: onOpenNewUser, onOpenChange: onOpenChangeNewUser } = useDisclosure();

    const addAndSelectUser = (newUser: User) => {
        setUsuarios([...usuarios, newUser]);
        setSelectedUser(newUser);
    }

    return <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
            {
                (onClose) => (<>
                    {/* <UserSelectionModal usuarios={usuarios} onClose={onClose} /> */}
                    <ModalHeader>
                        <h1>Cambiar de usuario</h1>
                    </ModalHeader>
                    <ModalBody>
                        {selectedUser ? (
                            <div className="flex flex-col">
                                <div className="flex items-center justify-between p-3 mb-7 bg-default-100 rounded-lg">
                                    <div className="flex items-center">
                                        <Avatar src={`https://robohash.org/${selectedUser.id}`} size="sm" className="mr-2" />
                                        <span>{selectedUser.name} {selectedUser.surname}</span>
                                    </div>
                                    <Button
                                        isIconOnly
                                        size="sm"
                                        variant="flat"
                                        color="danger"
                                        onPress={() => setSelectedUser(null)}
                                        aria-label="Seleccionar usuario"
                                        tabIndex={3}
                                    >
                                        <FiX />
                                    </Button>
                                </div>
                                <Button
                                    fullWidth
                                    color="primary"
                                    onPress={() => {
                                        if (selectedUser) {
                                            setUser(selectedUser);
                                            onClose();
                                        }
                                    }}
                                    className="mb-2"
                                    aria-label="Cambiar usuario"
                                    tabIndex={2}
                                >
                                    Cambiar usuario <FiRepeat />
                                </Button>
                            </div>
                        ) : (
                            <>
                                <Autocomplete
                                    label="Buscar y seleccionar usuario"
                                    placeholder="Ingrese el nombre del usuario"
                                    fullWidth
                                    className="mb-4"
                                    tabIndex={0}
                                    items={usuarios.filter(usuario =>
                                        usuario.name.toLowerCase().includes(searchValue.toLowerCase()) ||
                                        usuario.surname.toLowerCase().includes(searchValue.toLowerCase())
                                    )}
                                    onInputChange={(value) => setSearchValue(value)}
                                    onSelectionChange={(value) => {
                                        setSelectedUser(usuarios.find(user => user.id == value) || null)
                                    }}
                                >
                                    {(usuario) => (
                                        <AutocompleteItem key={usuario.id} value={usuario.id} startContent={<Avatar src={`https://robohash.org/${usuario.id}`} size="sm" />}>
                                            {usuario.name} {usuario.surname}
                                        </AutocompleteItem>
                                    )}
                                </Autocomplete>
                                <Button
                                    fullWidth
                                    variant="light"
                                    color="primary"
                                    onPress={onOpenNewUser}
                                    className="mb-2"
                                    aria-label="Soy usuario nuevo"
                                    tabIndex={1}
                                >
                                    Soy usuario nuevo <FiUserPlus />
                                </Button>
                                <UserCreationModal
                                    isOpen={isOpenNewUser}
                                    onOpenChange={onOpenChangeNewUser}
                                    onAddAndSelect={addAndSelectUser}
                                />
                            </>
                        )}
                    </ModalBody>
                </>)
            }
        </ModalContent>
    </Modal>

}