import {
  Box,
  Flex,
  Heading,
  IconButton,
  Stack,
  Tooltip,
  Text,
  Card,
  CardBody,
  FormControl,
  FormLabel,
  Select,
  Button,
  Input,
  VStack,
  Icon,
  Badge,
  useColorModeValue,
  Radio,
  RadioGroup,
  useToast,
} from "@chakra-ui/react";
import Navbar from "../../../components/navbar";
import { ArrowLeft, Package, Plus, Trash2 } from "lucide-react";
import { Form, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useCreateRequest, useFetchAllSuppliers } from "../api/api";
import { insertFoodRequestSchema } from "../api/types";

const AddRequest = () => {
  const navigate = useNavigate();
  const cardBg = useColorModeValue("white", "gray.800");
  const borderColor = useColorModeValue("gray.200", "gray.700");
  const textColor = useColorModeValue("gray.600", "gray.400");
  const { data: request, mutate, isSuccess, status } = useCreateRequest();
  const toast = useToast();

  useEffect(() => {
    if (isSuccess) {
      toast({
        title: "Request Submited.",
        // description: "Your food request has been successfully created.",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
      navigate('/requests');
    }
  }, [isSuccess, toast]);
  const getSuppliers = useFetchAllSuppliers();

  useEffect(() => {
    getSuppliers.mutate(undefined, {
      onSuccess: () => {
        console.log(getSuppliers.data?.data);
        console.log("Data fetched successfully");
      },
      onError: (error) => {
        console.error("Error fetching data", error);
      },
    });
  }, [mutate]);

  const foodCategories: { [key: string]: string[] } = {
    Foods: [
      "Dog's Dry foods (KG)",
      "Dog's Wet foods (Cans)",
      "Cat's Dry foods (KG)",
      "Cat's Wet foods (Cans)",
    ],
    Miscellaneous: [],
  };

  const form = useForm({
    resolver: zodResolver(insertFoodRequestSchema),
    defaultValues: {
      type: "",
      email: "",
      phone: "",
      organizationName: "",
      supplierId: 0,
      contactPerson: "",
      details: [{ category: "", subCategory: "", quantity: 0, unit: "" }],
    },
  });

  const [selectedItems, setSelectedItems] = useState<
    Array<{ category: string; subCategory: string; quantity: number }>
  >([]);

  const handleAddItem = () => {
    const details = form.getValues("details");
    const category = details?.[0]?.category || "";
    const subCategory = details?.[0]?.subCategory || "";
    const quantity = details?.[0]?.quantity || 0;

    if (category && quantity) {
      setSelectedItems([
        ...selectedItems,
        {
          category: category,
          subCategory: subCategory,
          quantity,
        },
      ]);
      form.setValue("details", [
        { category: "", subCategory: "", quantity: 0 },
      ]);
    }
  };

  const handleRemoveItem = (index: number) => {
    setSelectedItems(selectedItems.filter((_, i) => i !== index));
  };

  const handleSubmit = () => {
    console.log("submitted", form.getValues());
    mutate(form.getValues());
  };

  return (
    <Navbar>
      <Box maxW="7xl" mx="auto" px={{ base: 4, sm: 6, lg: 8 }}>
        <Stack spacing={8}>
          <Flex justify="space-between" align="center">
            <Box>
              <Heading size="lg">Create New Food Request</Heading>
              <Text color="gray.600" mt={1}>
                Add items to your food request
              </Text>
            </Box>
            <Tooltip label="Back to requests">
              <IconButton
                aria-label="Back to requests"
                icon={<ArrowLeft />}
                variant="ghost"
                onClick={() => navigate("/requests")}
              />
            </Tooltip>
          </Flex>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSubmit();
            }}
          >
            <Stack spacing={6}>
              <Card>
                <CardBody>
                  <Stack spacing={4}>
                    <FormControl>
                      <FormLabel>Type of Request</FormLabel>
                      <RadioGroup
                        onChange={(value) => form.setValue("type", value)}
                      >
                        <Stack>
                          <Radio value="supplier">Suppliers</Radio>
                          <Radio value="community">
                            Community Organizations/Individuals
                          </Radio>
                        </Stack>
                      </RadioGroup>
                    </FormControl>

                    {form.watch("type") && (
                      <>
                        <Stack direction={"row"}>
                          <FormControl>
                            <FormLabel>
                              {form.watch("type") === "supplier"
                                ? "Supplier Name"
                                : "Organization Name"}
                            </FormLabel>
                            <Select
                              placeholder="Choose a category"
                              value={(form.watch("organizationName") || form.watch("supplierId")) || ""}
                              onChange={(e) => {
                                if (form.watch("type") === "supplier") {
                                  form.setValue("supplierId", parseInt(e.target.value));
                                } else {
                                  form.setValue(
                                    "organizationName",
                                    e.target.value
                                  );
                                }
                              }}
                            >
                              {getSuppliers.data &&
                                getSuppliers.data.data.map(
                                  (supplier: { id: number; name: string }) => (
                                    <option
                                      key={supplier.id}
                                      value={supplier.id}
                                    >
                                      {supplier.name}
                                    </option>
                                  )
                                )}
                            </Select>
                          </FormControl>

                          <FormControl>
                            <FormLabel>Contact Person</FormLabel>
                            <Input
                              type="contactPerson"
                              placeholder="Enter contact person"
                              value={form.watch("contactPerson") || ""}
                              onChange={(e) => {
                                form.setValue("contactPerson", e.target.value);
                              }}
                            />
                          </FormControl>
                        </Stack>

                        <Stack direction={"row"}>
                          <FormControl>
                            <FormLabel>Phone</FormLabel>
                            <Input
                              type="phone"
                              placeholder="Enter phone number"
                              value={form.watch("phone") || ""}
                              onChange={(e) => {
                                form.setValue("phone", e.target.value);
                              }}
                            />
                          </FormControl>

                          <FormControl>
                            <FormLabel>Email</FormLabel>
                            <Input
                              type="email"
                              placeholder="Enter email"
                              value={form.watch("email") || ""}
                              onChange={(e) => {
                                form.setValue("email", e.target.value);
                              }}
                            />
                          </FormControl>
                        </Stack>

                        <Stack direction={"row"}>
                          <FormControl width="50%">
                            <FormLabel>Category</FormLabel>
                            <Select
                              placeholder="Choose a category"
                              value={form.watch("details")[0]?.category || ""}
                              onChange={(e) => {
                                form.setValue(
                                  "details.0.category",
                                  e.target.value
                                );
                              }}
                            >
                              {Object.keys(foodCategories).map((category) => (
                                <option key={category} value={category}>
                                  {category}
                                </option>
                              ))}
                            </Select>
                          </FormControl>

                          {foodCategories[form.watch("details")[0]?.category]
                            ?.length > 0 && (
                            <FormControl width="50%">
                              <FormLabel>Subcategory</FormLabel>
                              <Select
                                placeholder="Choose a subcategory"
                                value={
                                  form.watch("details")[0]?.subCategory || ""
                                }
                                onChange={(e) => {
                                  form.setValue(
                                    "details.0.subCategory",
                                    e.target.value
                                  );
                                }}
                              >
                                {foodCategories[
                                  form.watch("details")[0]?.category
                                ]?.map((subcategory) => (
                                  <option key={subcategory} value={subcategory}>
                                    {subcategory}
                                  </option>
                                ))}
                              </Select>
                            </FormControl>
                          )}
                        </Stack>

                        <FormControl width="50%">
                          <FormLabel>Quantity</FormLabel>
                          <Input
                            type="number"
                            placeholder="Enter quantity"
                            value={form.watch("details")[0]?.quantity || ""}
                            onChange={(e) => {
                              form.setValue(
                                "details.0.quantity",
                                parseInt(e.target.value)
                              );
                            }}
                          />
                        </FormControl>

                        <Button
                          onClick={() => {
                            handleAddItem();
                            form.setValue("details", [
                              { category: "", subCategory: "", quantity: 0 },
                            ]);
                          }}
                          colorScheme="blue"
                          variant="outline"
                          leftIcon={<Plus size={20} />}
                        >
                          Add Item
                        </Button>
                      </>
                    )}

                    {selectedItems.length > 0 && (
                      <Card>
                        <CardBody>
                          <Text fontWeight="medium" mb={4}>
                            Selected Items
                          </Text>
                          <VStack align="stretch" spacing={3}>
                            {selectedItems.map((item, index) => (
                              <Flex
                                key={index}
                                p={4}
                                bg={cardBg}
                                borderRadius="md"
                                align="center"
                                justify="space-between"
                              >
                                <Flex align="center" gap={3}>
                                  <Icon as={Package} />
                                  <Box>
                                    <Text fontWeight="medium">
                                      {item.category}
                                    </Text>
                                    <Text fontWeight="small">
                                      {item.subCategory}
                                    </Text>
                                    <Badge colorScheme="blue">
                                      {item.quantity} units
                                    </Badge>
                                  </Box>
                                </Flex>
                                <IconButton
                                  aria-label="Remove item"
                                  icon={<Trash2 size={16} />}
                                  variant="ghost"
                                  colorScheme="red"
                                  size="sm"
                                  onClick={() => handleRemoveItem(index)}
                                />
                              </Flex>
                            ))}
                          </VStack>
                        </CardBody>
                      </Card>
                    )}
                  </Stack>
                </CardBody>
              </Card>
              <Button
                type="submit"
                colorScheme="blue"
                size="lg"
                isLoading={status === "pending"}
                leftIcon={<Plus size={20} />}
              >
                Submit Request
              </Button>
            </Stack>
          </form>
        </Stack>
      </Box>
    </Navbar>
  );
};
export default AddRequest;
