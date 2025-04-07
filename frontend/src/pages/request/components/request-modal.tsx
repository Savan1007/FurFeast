import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Button,
  Text,
  Flex,
  Stack,
  Box,
  HStack,
} from "@chakra-ui/react";
import { RequestData } from "../api/types";
import { CheckCircle, ClipboardList, XCircle } from "lucide-react";
import { useInventory } from "../../../store/app-store";

interface RequestModalProps {
  isOpen: boolean;
  onClose: () => void;
  request?: RequestData; // Replace 'any' with the appropriate type if available
}

const RequestModal: React.FC<RequestModalProps> = ({
  isOpen,
  onClose,
  request,
}) => {
  const inventory = useInventory();

  return (
    <Modal
      closeOnOverlayClick={false}
      isOpen={isOpen}
      onClose={onClose}
      size={"2xl"}
    >
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>
          <Flex align="center" gap={2}>
            <Text fontSize="lg" fontWeight="bold">
              Request Details
            </Text>
          </Flex>
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody pb={6}>
          {request && (
            <Stack spacing={8}>
              <HStack direction="row" gap={20}>
                <Box w={"200px"}>
                  <Text fontWeight="bold">Requested By: </Text>
                  <Text>{request.requestedBy.username}</Text>
                </Box>
                <Box w={"200px"}>
                  <Text fontWeight="bold">Date: </Text>
                  <Text>
                    {new Date(request.createdAt).toLocaleDateString()}
                  </Text>
                </Box>
              </HStack>
              <HStack direction="row" gap={20}>
                <Box w={"200px"}>
                  <Text fontWeight="bold">Request Type: </Text>
                  <Text>
                    {request.requestType.charAt(0).toUpperCase() +
                      request.requestType.slice(1)}
                  </Text>
                </Box>
                <Box w={"200px"}>
                  <Text fontWeight="bold">Status: </Text>
                  <Text>
                    {request.status.charAt(0).toUpperCase() +
                      request.status.slice(1)}
                  </Text>
                </Box>
              </HStack>
              <HStack direction="row" gap={20}>
                <Box w={"200px"}>
                  <Text fontWeight="bold">Item: </Text>
                  <Text>
                    {request.requestDetails.map((item, index) => (
                      <Flex key={index} align="center" gap={2}>
                        <ClipboardList size={16} />
                        <Text>
                          {(inventory ?? []).find(
                            (inv) => inv.id === item.inventoryId
                          )?.itemName || "Unknown"}
                          :{" "}
                          <Text as="span" fontWeight="medium">
                            {item.quantity +
                              " " +
                              (inventory ?? []).find(
                                (inv) => inv.id === item.inventoryId
                              )?.unit || "Units"}
                          </Text>
                        </Text>
                      </Flex>
                    ))}
                  </Text>
                </Box>
              </HStack>
              <HStack direction="row" gap={20}>
                <Box w={"200px"}>
                  <Text fontWeight="bold">Notes: </Text>
                  <Text>{request.notes || "N/A"}</Text>
                </Box>
              </HStack>
            </Stack>
          )}
        </ModalBody>

        <ModalFooter gap={3}>
          <Button size="sm" onClick={onClose} colorScheme="blue">
            Cancel
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default RequestModal;
