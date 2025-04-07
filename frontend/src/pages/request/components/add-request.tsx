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
  FormErrorMessage,
  Textarea,
} from "@chakra-ui/react";
import Navbar from "../../../components/navbar";
import { ArrowLeft, Package, Plus, Trash2 } from "lucide-react";
import { Form, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useCreateRequest } from "../api/api";
import { insertFoodRequestSchema } from "../api/types";
import { useGetAllUsers } from "../../users/api/api";
import { useInventory, useRoles, useUser } from "../../../store/app-store";
import { Roles } from "../../users/api/types";
import { InventoryItems } from "../../inventory/api/types";
import { Role } from "../../../utils/enums";

const getRoleId = (roles: Roles, roleName: string) => {
  const role = roles.find((role) => role.name === roleName);
  return role ? role.id : null;
};

const AddRequest = () => {
  const navigate = useNavigate();
  const cardBg = useColorModeValue("white", "gray.800");
  const borderColor = useColorModeValue("gray.200", "gray.700");
  const textColor = useColorModeValue("gray.600", "gray.400");
  const [category, setCategory] = useState("");
  const { data: request, mutate, isSuccess, status } = useCreateRequest();
  const toast = useToast();
  const roles = useRoles();
  const getUsers = useGetAllUsers();
  const inventory = useInventory();
  const loggedInUser = useUser();

  const form = useForm({
    resolver: zodResolver(insertFoodRequestSchema),
    defaultValues: {
      requestType: "",
      email: "",
      phone: "",
      requestedBy: "",
      requestedByName: "",
      notes: "",
      requestDetails: [
        {
          category: "",
          subCategory: "",
          quantity: 0,
          unit: "",
          inventoryId: "",
        },
      ],
    },
  });

  // const {
  //   handleSubmit,
  //   register,
  //   formState: { errors, isSubmitting },
  // } = useForm();

  useEffect(() => {
    if (isSuccess) {
      toast({
        title: "Request Submited.",
        // description: "Your food request has been successfully created.",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
      if (
        loggedInUser?.roles[0].name === Role.Supplier.toString() ||
        loggedInUser?.roles[0].name === Role.Community.toString()
      ) {
        navigate("/");
      } else {
        navigate("/requests");
      }
    }
  }, [isSuccess, toast]);

  useEffect(() => {
    getUsers.mutate(
      {
        role:
          getRoleId(
            roles ?? [],
            form.getValues("requestType") === "donation"
              ? "supplier"
              : "community"
          ) || "",
      },
      {
        onSuccess: () => {
          console.log("Data fetched successfully");
        },
        onError: (error) => {
          console.error("Error fetching data", error);
        },
      }
    );
  }, [form.getValues("requestType")]);

  const getFoodCategories = (inventory: InventoryItems, category: string) => {
    const foodCategories = (inventory ?? [])
      .filter((item) => item.itemType === category)
      .map(({ itemName, unit, id }) => ({ itemName, unit, id }));
    return foodCategories;
  };

  const [selectedItems, setSelectedItems] = useState<
    Array<{
      category: string;
      subCategory: string;
      inventoryId: string;
      quantity: number;
    }>
  >([]);

  const handleAddItem = () => {
    const details = form.getValues("requestDetails");
    const category = details?.[0]?.category || "";
    const subCategory = details?.[0]?.subCategory || "";
    const inventoryId = details?.[0]?.inventoryId || "";
    const quantity = details?.[0]?.quantity || 0;

    if (category && quantity) {
      setSelectedItems([
        ...selectedItems,
        {
          inventoryId,
          quantity,
          category,
          subCategory,
        },
      ]);
      form.setValue("requestDetails", [
        {
          inventoryId: "",
          quantity: 0,
          category: "",
          subCategory: "",
        },
      ]);
    }
  };

  const handleRemoveItem = (index: number) => {
    setSelectedItems(selectedItems.filter((_, i) => i !== index));
  };

  const [error, setError] = useState(false);

  const onSubmit = () => {
    console.log("selectedItems", selectedItems);

    if (loggedInUser?.roles[0].name === Role.Supplier.toString()) {
      form.setValue("requestedBy", loggedInUser?.id);
      form.setValue("requestType", "donation");
    } else if (loggedInUser?.roles[0].name === Role.Community.toString()) {
      form.setValue("requestedBy", loggedInUser?.id);
      form.setValue("requestType", "distribution");
    }

    form.setValue("requestDetails", selectedItems);
    console.log("submitted", form.getValues());
    const values = form.getValues();
    const requiredFields: Array<keyof typeof values> = [
      "requestType",
      "requestedBy",
      "requestDetails",
    ];

    const hasEmptyFields = requiredFields.some((field: keyof typeof values) => {
      const value = values[field];
      return !value || (typeof value === "string" && value.trim() === "");
    });

    if (hasEmptyFields || selectedItems.length === 0) {
      setError(true);
      toast({
        title: "Validation Error",
        description:
          "Please fill all required fields and add at least one item.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
      return;
    }

    setError(false);
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
              onSubmit();
            }}
          >
            <Stack spacing={6}>
              <Card>
                <CardBody>
                  <Stack spacing={4}>
                    {(loggedInUser?.roles[0].name === Role.Admin.toString() ||
                      loggedInUser?.roles[0].name ===
                        Role.SuperAdmin.toString()) && (
                      <>
                        <FormControl>
                          <FormLabel>Type of Request *</FormLabel>
                          <RadioGroup
                            onChange={(value) =>
                              form.setValue("requestType", value)
                            }
                          >
                            <Stack>
                              <Radio value="donation">Suppliers</Radio>
                              <Radio value="distribution">
                                Community Organizations/Individuals
                              </Radio>
                            </Stack>
                          </RadioGroup>
                        </FormControl>
                      </>
                    )}
                    {loggedInUser?.roles[0].name === Role.Supplier.toString() ||
                      loggedInUser?.roles[0].name ===
                        Role.Community.toString() ||
                      (form.watch("requestType") && (
                        <>
                          <Stack direction={"column"}>
                            <FormControl
                              width="50%"
                              isInvalid={error && !form.watch("requestedBy")}
                            >
                              <FormLabel>
                                {form.watch("requestType") === "donation"
                                  ? "Supplier Name *"
                                  : "Organization Name *"}
                              </FormLabel>
                              <Select
                                placeholder="Choose a name"
                                value={`${form.watch("requestedBy") || ""} ${
                                  form.watch("requestedByName") || ""
                                }`.trim()}
                                onChange={(e) => {
                                  const [id, ...nameParts] =
                                    e.target.value.split(" ");
                                  form.setValue("requestedBy", id);
                                  form.setValue(
                                    "requestedByName",
                                    nameParts.join(" ")
                                  );
                                }}
                              >
                                {getUsers.isSuccess && getUsers.data ? (
                                  getUsers.data.data.map((user) => (
                                    <option
                                      key={user.id}
                                      value={
                                        user.id + " " + user.userDetails?.name
                                      }
                                    >
                                      {user.userDetails?.name} ({user.username})
                                    </option>
                                  ))
                                ) : (
                                  <option value="" disabled>
                                    Loading...
                                  </option>
                                )}
                              </Select>
                            </FormControl>
                          </Stack>
                        </>
                      ))}
                    {loggedInUser?.roles[0].name === Role.Supplier.toString() ||
                    loggedInUser?.roles[0].name === Role.Community.toString() ||
                    form.watch("requestType") ? (
                      <>
                        <Stack direction={"row"}>
                          <FormControl
                            width="50%"
                            isInvalid={
                              error &&
                              !form.watch("requestDetails")[0]?.category
                            }
                          >
                            <FormLabel>Category *</FormLabel>
                            <Select
                              placeholder="Choose a category"
                              value={form.watch("requestDetails")[0]?.category}
                              onChange={(e) => {
                                setCategory(e.target.value);
                                form.setValue(
                                  "requestDetails.0.category",
                                  e.target.value
                                );
                              }}
                            >
                              <option value="food">Food</option>
                              <option value="miscellaneous">
                                Miscellaneous
                              </option>
                            </Select>
                          </FormControl>

                          {category && (
                            <FormControl
                              width="50%"
                              isInvalid={
                                error &&
                                !form.watch("requestDetails")[0]?.inventoryId
                              }
                            >
                              <FormLabel>Subcategory *</FormLabel>
                              <Select
                                placeholder="Choose a subcategory"
                                value={
                                  form.watch("requestDetails")[0]?.inventoryId
                                }
                                onChange={(e) => {
                                  form.setValue(
                                    "requestDetails.0.inventoryId",
                                    e.target.value
                                  );
                                }}
                              >
                                {getFoodCategories(inventory, category)?.map(
                                  (subcategory) => (
                                    <option
                                      key={subcategory.id}
                                      value={subcategory.id}
                                    >
                                      {subcategory.itemName} ({subcategory.unit}
                                      )
                                    </option>
                                  )
                                )}
                              </Select>
                            </FormControl>
                          )}
                        </Stack>

                        <FormControl
                          width="50%"
                          isInvalid={
                            (error && !form.watch("requestDetails")[0]?.quantity) && form.watch("requestDetails")[0]?.quantity <= 0
                          }
                        >
                          <FormLabel>Quantity *</FormLabel>
                          <Input
                            type="number"
                            placeholder="Enter quantity"
                            value={
                              form.watch("requestDetails")[0]?.quantity || ""
                            }
                            onChange={(e) => {
                              const value = parseInt(e.target.value);
                              if (value > 0) {
                                form.setValue(
                                  "requestDetails.0.quantity",
                                  value
                                );
                              } else {
                                form.setValue("requestDetails.0.quantity", 0);
                              }
                            }}
                          />
                          {/* {form.watch("requestDetails")[0]?.quantity <= 0 && (
                            <FormErrorMessage>
                              Quantity must be greater than zero.
                            </FormErrorMessage>
                          )} */}
                        </FormControl>

                        <Button
                          onClick={() => {
                            handleAddItem();
                            form.setValue("requestDetails", [
                              {
                                inventoryId: "",
                                quantity: 0,
                                category: "",
                                subCategory: "",
                              },
                            ]);
                          }}
                          colorScheme="blue"
                          variant="outline"
                          leftIcon={<Plus size={20} />}
                        >
                          Add Item
                        </Button>
                      </>
                    ) : null}

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
                                      {item.category.charAt(0).toUpperCase() +
                                        item.category.slice(1)}
                                    </Text>
                                    <Text fontWeight="small">
                                      {
                                        inventory?.find(
                                          (i) => i.id === item.inventoryId
                                        )?.itemName
                                      }
                                    </Text>
                                    <Badge colorScheme="blue">
                                      {item.quantity}{" "}
                                      {
                                        inventory?.find(
                                          (i) => i.id === item.inventoryId
                                        )?.unit
                                      }
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

                    <FormControl width="50%">
                      <FormLabel>Additional Notes</FormLabel>
                      <Textarea
                        placeholder="Enter additional notes"
                        value={form.watch("notes") || ""}
                        onChange={(e) => form.setValue("notes", e.target.value)}
                      />
                    </FormControl>
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
