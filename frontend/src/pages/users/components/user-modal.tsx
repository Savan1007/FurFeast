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
  HStack,
  Box,
} from "@chakra-ui/react";
import { User } from "../api/types";

interface UserModalProps {
  isOpen: boolean;
  onClose: () => void;
  user?: User; // Replace 'any' with the appropriate type if available
}

const UserModal = ({ isOpen, onClose, user }: UserModalProps) => {
  return (
    <Modal
      closeOnOverlayClick={false}
      isOpen={isOpen}
      onClose={onClose}
      size="2xl"
    >
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>
          <Flex align="center" gap={2}>
            <Text fontSize="lg" fontWeight="bold">
              User Details
            </Text>
          </Flex>
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody pb={6}>
          {user && (
            <Stack spacing={8}>
              <HStack direction="row" gap={20}>
                <Box w={"200px"}>
                  <Text fontWeight="bold">Username:</Text>
                  <Text>{user.username}</Text>
                </Box>
                <Box w={"200px"}>
                  <Text fontWeight="bold">Name:</Text>
                  <Text>{user.userDetails?.name}</Text>
                </Box>
                <Box w={"200px"}>
                  <Text fontWeight="bold">Role:</Text>
                  <Text>
                    {user.roles.length === 0
                      ? "No roles assigned"
                      : user.roles[0]?.name.charAt(0).toUpperCase() +
                        user.roles[0]?.name.slice(1)}
                  </Text>
                </Box>
              </HStack>
              <HStack direction="row" gap={20} align="start">
                <Box w={"200px"}>
                  <Text fontWeight="bold">Email:</Text>
                  <Text>{user.email || "N/A"}</Text>
                </Box>
                <Box w={"200px"}>
                  <Text fontWeight="bold">Phone:</Text>
                  <Text>{user.userDetails?.phone || "N/A"}</Text>
                </Box>
                <Box w={"200px"}>
                  <Text fontWeight="bold">Address:</Text>
                  <Text>{user.userDetails?.address || "N/A"}</Text>
                </Box>
              </HStack>
            </Stack>
          )}
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default UserModal;
