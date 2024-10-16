import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, Input, Select, SelectItem } from "@nextui-org/react";
import { useState } from "react";
import { User } from "../../context/User.context";

interface UserCreationModalProps {
    isOpen: boolean;
    onOpenChange: (isOpen: boolean) => void;
}

export const UserCreationModal = ({ isOpen, onOpenChange }: UserCreationModalProps) => {
    const [nombre, setNombre] = useState<string>('');
    const [apellido, setApellido] = useState<string>('');
    const [especialidad, setEspecialidad] = useState<string>('');

    const handleSubmit = async () => {
        // Implementación de la llamada a la API para guardar el nuevo usuario
        const nuevoUsuario: Partial<User> = {
            name: nombre,
            surname: apellido,
            speciality: especialidad,
        };

        // TODO: Llamar a la API para guardar el nuevo usuario
        console.log("Nuevo usuario a guardar:", nuevoUsuario);

        // Cerrar el modal después de guardar
        onOpenChange(false);
    };

    return (
        <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
            <ModalContent>
                {(onClose) => (
                    <>
                        <ModalHeader>
                            <h1>Crear nuevo médico</h1>
                        </ModalHeader>
                        <ModalBody>
                            <Input
                                label="Nombre"
                                placeholder="Ingrese el nombre"
                                value={nombre}
                                onChange={(e) => setNombre(e.target.value)}
                                className="mb-4"
                            />
                            <Input
                                label="Apellido"
                                placeholder="Ingrese el apellido"
                                value={apellido}
                                onChange={(e) => setApellido(e.target.value)}
                                className="mb-4"
                            />
                            <Select
                                label="Especialidad"
                                placeholder="Seleccione la especialidad"
                                value={especialidad}
                                onChange={(e) => setEspecialidad(e.target.value)}
                                className="mb-4"
                            >
                                <SelectItem key="cardiologia" value="Cardiología">Cardiología</SelectItem>
                                <SelectItem key="neurologia" value="Neurología">Neurología</SelectItem>
                                <SelectItem key="pediatria" value="Pediatría">Pediatría</SelectItem>
                                {/* Agregar más especialidades según sea necesario */}
                            </Select>
                        </ModalBody>
                        <ModalFooter>
                            <Button color="danger" variant="light" onPress={onClose}>
                                Cancelar
                            </Button>
                            <Button color="primary" onPress={handleSubmit}>
                                Crear médico
                            </Button>
                        </ModalFooter>
                    </>
                )}
            </ModalContent>
        </Modal>
    );
};
