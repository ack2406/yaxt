import React from 'react'

import { AlertDialog, useDisclosure } from '@chakra-ui/react'
import {
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
} from '@chakra-ui/react'

import { Button } from '@chakra-ui/react'

interface ICloseProps {
  remove: <T>(index: number) => T | undefined;
  indexQuestion: number;
}

interface IEditDialogProps {
  isOpen: boolean;
  cancelRef: React.MutableRefObject<HTMLButtonElement>;
  onClose: () => void;
  onCloseConfirm: (props: ICloseProps) => void;
  remove: <T>(index: number) => T | undefined;
  indexQuestion: number;
  bodyText: string;
  headerText: string;
}

const EditDialog = ({isOpen, cancelRef, onClose, onCloseConfirm, remove, indexQuestion, bodyText, headerText}: IEditDialogProps) => {
  return (
    <AlertDialog
    isOpen={isOpen}
    leastDestructiveRef={cancelRef}
    onClose={onClose}
  >
    <AlertDialogOverlay>
      <AlertDialogContent ml={5} mr={5} mt="30vh" >
        <AlertDialogHeader fontSize="lg" fontWeight="bold">
          {headerText}
        </AlertDialogHeader>

        <AlertDialogBody>
          {bodyText}
        </AlertDialogBody>

        <AlertDialogFooter>
          <Button ref={cancelRef} onClick={onClose}>
            Anuluj
          </Button>
          <Button
            colorScheme="red"
            onClick={() => onCloseConfirm({remove, indexQuestion})}
            ml={3}
          >
            Usuń
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialogOverlay>
  </AlertDialog>
  )
}

export default EditDialog