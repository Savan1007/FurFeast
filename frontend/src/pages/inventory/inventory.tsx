import {
  Box,
  Button,
  Card,
  CardBody,
  Heading,
  IconButton,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Skeleton,
  Stack,
  Table,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  useColorModeValue,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import Navbar from "../../components/navbar";
import { useActions, useInventory } from "../../store/app-store";
import { CheckCircle, EllipsisVerticalIcon, Eye, Pen } from "lucide-react";
import UpdateInventoryModal from "./components/update-inventory-modal";
import { useEffect, useState } from "react";
import { InventoryItem, updateInventorySchema } from "./api/types";
import { useFetchAllInventory, useUpdateInventory } from "./api/api";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

export default function Inventory() {
  const textColor = useColorModeValue("gray.600", "gray.400");
  const headingColor = useColorModeValue("gray.800", "white");
  const bgColor = useColorModeValue("red.100", "red.700")
  const storeActions = useActions();

  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selectedInventory, setSelectedInventory] = useState<InventoryItem>();

  const {
    data: inventory,
    mutate: InventoryMutate,
    isSuccess: inventorySuccess,
  } = useFetchAllInventory();

  useEffect(() => {
    if (!inventorySuccess) {
      InventoryMutate(undefined);
    }
  }, []);
  
  if(inventorySuccess) {
    storeActions?.setInventory(inventory.data);
  }

  const toast = useToast();

  const form = useForm({
    resolver: zodResolver(updateInventorySchema),
    defaultValues: {
      itemName: "",
      quantity: 0,
      unit: "",
      lowStockThreshold: 0,
    },
  });

  useEffect(() => {
    if (selectedInventory) {
      form.reset({
        itemName: selectedInventory.itemName,
        quantity: selectedInventory.quantity,
        unit: selectedInventory.unit,
        lowStockThreshold: selectedInventory.lowStockThreshold,
      });
    }
  }, [selectedInventory, form]);
  const updateInventory = useUpdateInventory();

  const onSubmit = () => {
    const data = form.getValues();
    updateInventory.mutate({
      id: selectedInventory?.id ?? "",
      data,
    });
  };

  useEffect(() => {
    if (updateInventory.isSuccess) {
      form.reset(); // Reset the form after successful submission
      toast({
        title: "Inventory updated successfully.",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
      onClose(); // Close the modal after successful submission
      InventoryMutate(undefined);
    }
  }, [updateInventory.isSuccess]);

  return (
    <Navbar>
      <Box maxW="7xl" mx="auto" px={{ base: 4, sm: 6, lg: 8 }}>
        <Stack spacing={8}>
          <Box>
            <Heading size="lg" color={headingColor}>
              Inventory
            </Heading>
            <Text color={textColor}>Manage your inventory items here.</Text>
          </Box>
          <Skeleton isLoaded={!!inventory}>
            <Card>
              <CardBody>
                <Table variant="simple">
                  <Thead bg={useColorModeValue("gray.50", "gray.800")}>
                    <Tr>
                      <Th color={textColor}>Item Name</Th>
                      <Th color={textColor}>Quantity</Th>
                      <Th color={textColor}>Unit</Th>
                      <Th color={textColor}>Threshold</Th>
                      <Th color={textColor}>Actions</Th>
                    </Tr>
                  </Thead>
                  <Tbody>
                    {(inventory?.data ?? []).map((item) => (
                      <Tr
                      key={item.id}
                      bg={
                        item.quantity <= item.lowStockThreshold
                        ? bgColor
                        : undefined
                      }
                      >
                      <Td>{item.itemName}</Td>
                      <Td>{item.quantity}</Td>
                      <Td>{item.unit}</Td>
                      <Td>{item.lowStockThreshold}</Td>
                      <Td>
                        <Button
                        variant={"ghost"}
                        leftIcon={<Pen width={"14"} />}
                        onClick={() => {
                          setSelectedInventory(item);
                          onOpen();
                        }}
                        >
                        Edit
                        </Button>
                      </Td>
                      </Tr>
                    ))}
                  </Tbody>
                </Table>
              </CardBody>
            </Card>
          </Skeleton>
        </Stack>
      </Box>
      {isOpen && (
        <UpdateInventoryModal
          isOpen={isOpen}
          onClose={onClose}
          inventoryItem={selectedInventory}
          form={form}
          onSubmit={onSubmit}
          updateInventory={updateInventory}
        />
      )}
    </Navbar>
  );
}
