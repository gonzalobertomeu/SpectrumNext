import { Autocomplete, AutocompleteItem, Avatar, Button, ModalBody, ModalHeader } from "@nextui-org/react";
import { useContext, useState } from "react";
import { User, UserContext } from "../../context/User.context";
import { FiRepeat, FiX } from "react-icons/fi";

interface UserSelectionModalProps {
    usuarios: User[];
    onClose: () => void;
}

export const UserSelectionModal = ({ usuarios, onClose }: UserSelectionModalProps) => {
    const [searchValue, setSearchValue] = useState<string>('');
    const [selectedUser, setSelectedUser] = useState<User | null>(null);

    const { value: user, setValue: setUser } = useContext(UserContext);

    return <>
        <ModalHeader>
            <h1>Cambiar de usuario</h1>
        </ModalHeader>
        <ModalBody>
            {selectedUser ? (
                <div className="flex flex-col">
                    <div className="flex items-center justify-between p-3 mb-2 bg-primary-100 rounded-lg">
                        <div className="flex items-center">
                            <Avatar src={`https://robohash.org/${selectedUser.id}`} size="sm" className="mr-2" />
                            <span>{selectedUser.name} {selectedUser.surname}</span>
                        </div>
                        <Button
                            isIconOnly
                            size="sm"
                            variant="light"
                            onPress={() => setSelectedUser(null)}
                            aria-label="Deseleccionar usuario"
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
                    >
                        Cambiar usuario <FiRepeat />
                    </Button>
                </div>
            ) : (
                <Autocomplete
                    label="Buscar y seleccionar usuario"
                    placeholder="Ingrese el nombre del usuario"
                    fullWidth
                    className="mb-4"
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
            )}
        </ModalBody>
    </>
}