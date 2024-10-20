import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, Input, Select, SelectItem } from "@nextui-org/react";
import { useEffect, useState } from "react";
import { User } from "../../context/User.context";

interface UserCreationModalProps {
    isOpen: boolean;
    onOpenChange: (isOpen: boolean) => void;
    onAddAndSelect: (newUser: User) => void;
}

interface Specialty {
    id: string;
    name: string;
}

interface Errors {
    [field: string]: string;
}

export const UserCreationModal = ({ isOpen, onOpenChange, onAddAndSelect }: UserCreationModalProps) => {

    const [specialties, setSpecialties] = useState<Specialty[]>([])

    useEffect(() => {
        window.electron.medic('listSpecialties').then((specialties: Specialty[]) => {
            setSpecialties(specialties)
        })
    }, [])

    const [nombre, setNombre] = useState<string>('');
    const [apellido, setApellido] = useState<string>('');
    const [especialidad, setEspecialidad] = useState<string>('');
    const [error, setError] = useState<Errors>({});
    const [saving, setSaving] = useState<boolean>(false);

    const isValidForm = () => {
        setError({});
        const localError: Errors = {};
        if (nombre == '') {
            localError.name = 'El nombre es requerido';
        }
        if (apellido == '') {
            localError.surname = 'El apellido es requerido';
        }
        if (especialidad == '') {
            localError.speciality = 'La especialidad es requerida';
        }
        if (Object.keys(localError).length > 0) {
            setError(localError);
            return false;
        }
        return true;
    }

    const handleSubmit = async () => {
        // Implementación de la llamada a la API para guardar el nuevo usuario
        if (!isValidForm()) {
            return;
        }
        try {
            setSaving(true);
            // Agregar 1 segundo de espera
            await new Promise(resolve => setTimeout(resolve, 1000));
            const newUser = await window.electron.medic('create',
                nombre,
                apellido,
                especialidad,
            )
            onAddAndSelect(newUser);
        } catch (error) {
            console.error(error);
        } finally {
            setSaving(false);
            onOpenChange(false);
        }
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
                                onChange={(e) => {
                                    setNombre(e.target.value);
                                    setError(prevError => {
                                        const { name, ...rest } = prevError;
                                        return rest;
                                    });
                                }}
                                className="mb-4"
                                isInvalid={'name' in error}
                                errorMessage={error?.name || ''}
                            />
                            <Input
                                label="Apellido"
                                placeholder="Ingrese el apellido"
                                value={apellido}
                                onChange={(e) => {
                                    setApellido(e.target.value);
                                    setError(prevError => {
                                        const { surname, ...rest } = prevError;
                                        return rest;
                                    });
                                }}
                                className="mb-4"
                                isInvalid={'surname' in error}
                                errorMessage={error?.surname || ''}
                            />
                            <Select
                                label="Especialidad"
                                placeholder="Seleccione la especialidad"
                                value={especialidad}
                                onChange={(e) => {
                                    setEspecialidad(e.target.value);
                                    setError(prevError => {
                                        const { speciality, ...rest } = prevError;
                                        return rest;
                                    });
                                }}
                                className="mb-4"
                                isInvalid={'speciality' in error}
                                errorMessage={error?.speciality || ''}
                            >
                                {specialties.length === 0
                                    ?
                                    <SelectItem key="default" value="default">No hay especialidades</SelectItem>
                                    :
                                    specialties.map((specialty) => (
                                        <SelectItem key={specialty.id} value={specialty.id}>
                                            {specialty.name}
                                        </SelectItem>
                                    ))
                                }
                            </Select>
                        </ModalBody>
                        <ModalFooter>
                            <Button color="danger" variant="light" onPress={onClose}>
                                Cancelar
                            </Button>
                            <Button color="primary" onPress={handleSubmit} isLoading={saving}>
                                Crear médico
                            </Button>
                        </ModalFooter>
                    </>
                )}
            </ModalContent>
        </Modal>
    );
};
