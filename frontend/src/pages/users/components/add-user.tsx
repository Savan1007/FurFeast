import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  FormControl,
  FormLabel,
  Input,
  Stack,
  Select,
  InputGroup,
  InputRightElement,
  FormErrorMessage,
  HStack,
  Textarea,
} from "@chakra-ui/react";
import { useAddNewUser, useCheckUserExists, useGetAllRoles } from "../api/api";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { insertNewUserSchema } from "../api/types";
import { EyeIcon, EyeOff } from "lucide-react";
interface Props {
  isOpen: boolean;
  onClose: () => void;
}

const AddUser = ({ isOpen, onClose }: Props) => {
  const [show, setShow] = useState(false);
  const handleClick = () => setShow(!show);
  const { data: userExists, mutate: checkUsernameExists } =
    useCheckUserExists();

  const form = useForm({
    resolver: zodResolver(insertNewUserSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
      roles: [],
      userDetails: {
        name: "",
        phone: "",
        address: "",
      },
    },
  });

  const { data: roles, mutate, status } = useGetAllRoles();

  useEffect(() => {
    if (status === "idle") {
      mutate(undefined); // Pass undefined or the required argument based on your API
    }
  }, [status]);

  const addNewUser = useAddNewUser();
  const handleSubmit = () => {
    console.log("Form data:", form.getValues());
    addNewUser.mutate(form.getValues());
  };

  if (addNewUser.isSuccess) {
    form.reset(); // Clear the form data
    onClose();
  }

  const onUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const username = e.target.value;
    form.setValue("username", username);
    // Call API to check if username exists
    if (username) {
      checkUsernameExists(username);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} size={"4xl"}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Add User</ModalHeader>
        <ModalCloseButton />
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSubmit();
          }}
        >
          <ModalBody>
            <Stack spacing={6}>
              <HStack>
                <FormControl isInvalid={userExists?.exists} w={"50%"}>
                  <FormLabel>Username</FormLabel>
                  <Input
                    placeholder="Username"
                    value={form.watch("username")}
                    onChange={onUsernameChange}
                  />
                  {userExists?.exists && (
                    <FormErrorMessage>Username already exists</FormErrorMessage>
                  )}
                </FormControl>
              </HStack>
              <HStack>
                <FormControl>
                  <FormLabel>Name</FormLabel>
                  <Input
                    placeholder="Name"
                    value={form.watch("userDetails.name")}
                    onChange={(e) =>
                      form.setValue("userDetails.name", e.target.value)
                    }
                  />
                </FormControl>
                <FormControl>
                  <FormLabel>Role</FormLabel>
                  <Select
                    placeholder="Select Role"
                    value={form.watch("roles")}
                    onChange={(e) => form.setValue("roles", [e.target.value])}
                  >
                    {roles?.data.map((role) => (
                      <option key={role.id} value={role.id}>
                        {role.name}
                      </option>
                    ))}
                  </Select>
                </FormControl>
              </HStack>
              <HStack>
                <FormControl>
                  <FormLabel>Email Address</FormLabel>
                  <Input
                    placeholder="Email Address"
                    value={form.watch("email")}
                    onChange={(e) => form.setValue("email", e.target.value)}
                  />
                </FormControl>
                <FormControl>
                  <FormLabel>Phone</FormLabel>
                  <Input
                    placeholder="Phone"
                    value={form.watch("userDetails.phone")}
                    onChange={(e) =>
                      form.setValue("userDetails.phone", e.target.value)
                    }
                  />
                </FormControl>
              </HStack>

              <HStack>
                <FormControl>
                  <FormLabel>Password</FormLabel>
                  <InputGroup size="md">
                    <Input
                      type={show ? "text" : "password"}
                      placeholder="Password"
                      value={form.watch("password")}
                      onChange={(e) =>
                        form.setValue("password", e.target.value)
                      }
                    />
                    <InputRightElement width="4.5rem">
                      <Button
                        h="1.75rem"
                        size="sm"
                        onClick={handleClick}
                        variant={"ghost"}
                      >
                        {show ? <EyeIcon size={16} /> : <EyeOff size={16} />}
                      </Button>
                    </InputRightElement>
                  </InputGroup>
                </FormControl>
                <FormControl>
                  <FormLabel>Retype Password</FormLabel>
                  <InputGroup size="md">
                    <Input
                      type={show ? "text" : "password"}
                      placeholder="Retype Password"
                      value={form.watch("confirmPassword")}
                      onChange={(e) =>
                        form.setValue("confirmPassword", e.target.value)
                      }
                    />
                    <InputRightElement width="4.5rem">
                      <Button
                        h="1.75rem"
                        size="sm"
                        onClick={handleClick}
                        variant={"ghost"}
                      >
                        {show ? <EyeIcon size={16} /> : <EyeOff size={16} />}
                      </Button>
                    </InputRightElement>
                  </InputGroup>
                </FormControl>
              </HStack>

              <FormControl w={"50%"}>
                <FormLabel>Address</FormLabel>
                <Textarea
                  placeholder="Address"
                  value={form.watch("userDetails.address")}
                  onChange={(e) =>
                    form.setValue("userDetails.address", e.target.value)
                  }
                />
              </FormControl>
            </Stack>
          </ModalBody>
          <ModalFooter gap={3}>
            <Button type="submit" size="sm" colorScheme="blue" isLoading={addNewUser.status === "pending"}>
              Save
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

export default AddUser;
