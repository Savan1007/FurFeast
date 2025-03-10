import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Button,
} from "@chakra-ui/react";
import { Request } from "../api/types";
import { CheckCircle, XCircle } from "lucide-react";

interface RequestModalProps {
  isOpen: boolean;
  onClose: () => void;
  request?: Request; // Replace 'any' with the appropriate type if available
}

const RequestModal: React.FC<RequestModalProps> = ({ isOpen, onClose, request }) => {
  return (
    <Modal closeOnOverlayClick={false} isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Create your account</ModalHeader>
        <ModalCloseButton />
        <ModalBody pb={6}>
            {request && (
              <>
                Supplier ID: {request.supplierId}
                <br />
                Request
                <br />
                Type: {request.category}
                <br />
                Subcategory: {request.subcategory}
                <br />
                Quantity: {request.quantity}
                <br />
                Unit: {request.unit}
                <br />
                Status: {request.status}
                <br />
                Request Date: {request.requestDate.toString()}
              </>
            )}
          
        </ModalBody>

        <ModalFooter gap={3}>
          <Button
            size="sm"
            colorScheme="green"
            leftIcon={<CheckCircle size={16} />}
            // onClick={() =>
            //   updateStatusMutation.mutate({
            //     id: request.id,
            //     status: "approved",
            //   })
            // }
          >
            Approve
          </Button>
          <Button
            size="sm"
            colorScheme="red"
            leftIcon={<XCircle size={16} />}
            // onClick={() =>
            //   updateStatusMutation.mutate({
            //     id: request.id,
            //     status: "rejected",
            //   })
            // }
          >
            Reject
          </Button>
          <Button size="sm" onClick={onClose}>
            Cancel
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default RequestModal;
