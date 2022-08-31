import React, { useState } from "react";

import {
  Button,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay
} from "@chakra-ui/react";

interface ChordModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelect: (chord: string) => void;
}

const ChordModal: React.FC<ChordModalProps> = ({
  onClose: handleClose,
  onSelect,
  isOpen
}) => {
  const [chord, setChord] = useState("");

  const onClose = () => {
    setChord("");
    handleClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Adicionar acorde</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Input
            placeholder="Digite o acorde"
            value={chord}
            onChange={e => setChord(e.target.value)}
          />
        </ModalBody>
        <ModalFooter>
          <Button colorScheme="blue" mr={3} onClick={() => onSelect(chord)}>
            Confirmar
          </Button>
          <Button variant="ghost" onClick={onClose}>
            Cancelar
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default ChordModal;
