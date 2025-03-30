import React, { useEffect, useState } from "react";
import Navbar from "../../components/navbar";
import {
  Box,
  Card,
  CardBody,
  Flex,
  Heading,
  Stack,
  useColorModeValue,
  Text,
  Button,
  Skeleton,
  Tabs,
  TabList,
  Tab,
  Table,
  Thead,
  Tr,
  Th,
  Tbody,
  useDisclosure,
  Td,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  IconButton,
  Select,
} from "@chakra-ui/react";
import { EllipsisVerticalIcon, Eye, EyeIcon, Pencil, Plus } from "lucide-react";
import AddUser from "./components/add-user";
import { useGetAllUsers } from "./api/api";
import { Role } from "../../utils/enums";
import { set } from "react-hook-form";

const Users = () => {
  const textColor = useColorModeValue("gray.600", "gray.400");
  const headingColor = useColorModeValue("gray.800", "white");
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { data: users, mutate, status } = useGetAllUsers();

  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(1);

  useEffect(() => {
    if (!isOpen) {
      mutate({limit, page});
    }
  }, [isOpen, limit, page]);

  return (
    <Navbar>
      <Box maxW="7xl" mx="auto" px={{ base: 4, sm: 6, lg: 8 }}>
        <Stack spacing={8}>
          <Flex justify="space-between" align="center">
            <Box>
              <Heading size="lg" color={headingColor}>
                Users
              </Heading>
              <Text color={textColor}>Manage users information</Text>
            </Box>
            <Button
              colorScheme="blue"
              size="lg"
              leftIcon={<Plus size={20} />}
              onClick={() => onOpen()}
            >
              New User
            </Button>
          </Flex>
          <Skeleton isLoaded={status == "success"}>
            <Card>
              <CardBody>
                <Table variant="simple">
                  <Thead bg={useColorModeValue("gray.50", "gray.800")}>
                    <Tr>
                      <Th>Username</Th>
                      <Th>Email</Th>
                      <Th>Role</Th>
                      <Th>Actions</Th>
                    </Tr>
                  </Thead>
                  <Tbody>
                    {users?.data.map((user) => (
                      <Tr key={user._id}>
                        <Td>{user.username}</Td>
                        <Td>{user.email}</Td>
                        <Td>
                          {(() => {
                            switch (user.roles[0]?.name) {
                              case Role.SuperAdmin:
                                return "Super Admin";
                              case Role.Admin:
                                return "Admin";
                              case Role.Supplier:
                                return "Supplier";
                              case Role.Community:
                                return "Community";
                              default:
                                return "N/A";
                            }
                          })()}
                        </Td>
                        <Td>
                          <Menu>
                            <MenuButton
                              as={IconButton}
                              aria-label="Options"
                              icon={<EllipsisVerticalIcon />}
                              variant="ghost"
                            />
                            <MenuList>
                              <MenuItem icon={<EyeIcon size={"16"} />}>
                                View
                              </MenuItem>
                              <MenuItem
                                icon={<Pencil size={"16"} />}
                                // onClick={() => {
                                //   setSelectedRequest(request);
                                //   onOpen();
                                // }}
                              >
                                Edit
                              </MenuItem>
                            </MenuList>
                          </Menu>
                        </Td>
                      </Tr>
                    ))}
                  </Tbody>
                </Table>
              </CardBody>
            </Card>

            <Flex justify="space-between" align="center" mt={4}>
              <Flex align="center">
                <Box>
                  <Text color={textColor} mr={2}>
                    Showing {limit} of {users?.total} users
                  </Text>
                </Box>
                <Box>
                  <Select
                    value={limit}
                    onChange={(e) => {
                      setLimit(parseInt(e.target.value));
                      setPage(1); // Reset to first page when limit changes
                      mutate({ page: 1, limit });
                    }}
                  >
                    {[5, 10, 20, 50, 100].map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </Select>
                </Box>
              </Flex>
              <Flex>
                <Button
                  size="sm"
                  onClick={() => {
                    if (page > 1) {
                      setPage(page - 1);
                      mutate({ page: page - 1, limit });
                    }
                  }}
                  isDisabled={page === 1}
                  mr={2}
                  colorScheme="blue"
                >
                  Previous
                </Button>
                <Button
                  size="sm"
                  onClick={() => {
                    if (page < (users?.total ?? 0) / limit) {
                      setPage(page + 1);
                      mutate({ page: page + 1, limit });
                    }
                  }}
                  isDisabled={
                    page === Math.ceil((users?.total ?? 0) / limit) ||
                    users?.total === 0
                  }
                  colorScheme="blue"
                >
                  Next
                </Button>
              </Flex>
            </Flex>
          </Skeleton>
        </Stack>
      </Box>
      <AddUser isOpen={isOpen} onClose={onClose} />
    </Navbar>
  );
};

export default Users;
