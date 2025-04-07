import {
  Button,
  FormControl,
  FormLabel,
  HStack,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  useToast,
} from "@chakra-ui/react";
import { InventoryItem, updateInventorySchema } from "../api/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useUpdateInventory } from "../api/api";
import { useEffect } from "react";

interface UpdateInventoryModalProps {
  isOpen: boolean;
  onClose: () => void;
  inventoryItem?: InventoryItem;
  form: any;
  onSubmit: () => void;
  updateInventory: any;
}

const UpdateInventoryModal = ({
  isOpen,
  onClose,
  inventoryItem,
  form,
  onSubmit,
  updateInventory,
}: UpdateInventoryModalProps) => {
  //   const toast = useToast();

  //   const form = useForm({
  //     resolver: zodResolver(updateInventorySchema),
  //     defaultValues: {
  //       itemName: inventoryItem?.itemName || "",
  //       quantity: inventoryItem?.quantity || 0,
  //       unit: inventoryItem?.unit || "",
  //       lowStockThreshold: inventoryItem?.lowStockThreshold || 0,
  //     },
  //   });
  //   const updateInventory = useUpdateInventory();

  //   const onSubmit = () => {
  //     const data = form.getValues();
  //     updateInventory.mutate({
  //       id: inventoryItem?.id ?? "",
  //       data,
  //     });
  //   };

  //   useEffect(() => {
  //     if (updateInventory.isSuccess) {
  //       form.reset(); // Reset the form after successful submission
  //       toast({
  //         title: "Inventory updated successfully.",
  //         status: "success",
  //         duration: 3000,
  //         isClosable: true,
  //       });
  //       onClose(); // Close the modal after successful submission
  //     }
  //   }, [updateInventory.isSuccess]);

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="2xl">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Update Inentory</ModalHeader>
        <ModalCloseButton />

        <form
          onSubmit={(e) => {
            e.preventDefault();
            onSubmit();
          }}
        >
          <ModalBody>
            <HStack>
              <FormControl>
                <FormLabel>Item Name</FormLabel>
                <Input
                  type="text"
                  value={form.watch("itemName") || inventoryItem?.itemName}
                  onChange={(e) => {
                    form.setValue("itemName", e.target.value);
                  }}
                />
              </FormControl>
              <FormControl>
                <FormLabel>Unit</FormLabel>
                <Input
                  type="text"
                  value={form.watch("unit") || inventoryItem?.unit}
                />
              </FormControl>
            </HStack>
            <HStack mt={4}>
              <FormControl w={"50%"}>
                <FormLabel>Quantity</FormLabel>
                <NumberInput
                  defaultValue={0}
                  min={0}
                  value={form.watch("quantity") || 0}
                  onChange={(valueString) => {
                    form.setValue("quantity", parseInt(valueString));
                  }}
                >
                  <NumberInputField />
                  <NumberInputStepper>
                    <NumberIncrementStepper />
                    <NumberDecrementStepper />
                  </NumberInputStepper>
                </NumberInput>
              </FormControl>
              <FormControl w={"50%"}>
                <FormLabel>Low Stock Threshold</FormLabel>
                <NumberInput
                  min={0}
                  value={form.watch("lowStockThreshold") || 0}
                  onChange={(valueString) => {
                    form.setValue("lowStockThreshold", parseInt(valueString));
                  }}
                >
                  <NumberInputField />
                  <NumberInputStepper>
                    <NumberIncrementStepper />
                    <NumberDecrementStepper />
                  </NumberInputStepper>
                </NumberInput>
              </FormControl>
            </HStack>
          </ModalBody>
          <ModalFooter gap={3}>
            <Button
              type="submit"
              size="sm"
              colorScheme="blue"
              isLoading={updateInventory.status === "pending"}
            >
              Update
            </Button>
            <Button
              size="sm"
              onClick={onClose}
              variant={"outline"}
              colorScheme="blue"
            >
              Cancel
            </Button>
          </ModalFooter>
        </form>
      </ModalContent>
    </Modal>
  );
};

export default UpdateInventoryModal;
