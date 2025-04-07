import {
  Thead,
  useColorModeValue,
  Tr,
  Th,
  Tbody,
  Td,
  Stack,
  Flex,
  Tooltip,
  Button,
  Box,
  Table,
  Text,
  Menu,
  MenuButton,
  IconButton,
  MenuList,
  MenuItem,
  useDisclosure,
  Select,
  Skeleton,
  useToast,
} from "@chakra-ui/react";
import {
  Icon,
  ClipboardList,
  CheckCircle,
  XCircle,
  View,
  Eye,
  EllipsisVerticalIcon,
} from "lucide-react";
import { Requests, Request, RequestData } from "../api/types";
import RequestModal from "./request-modal";
import { use, useEffect, useState } from "react";
import { useInventory } from "../../../store/app-store";
import { useFetchAllRequest, useUpdateRequest } from "../api/api";

export default function RequestTable({ status }: { status: string }) {
  const textColor = useColorModeValue("gray.600", "gray.400");
  const hoverBg = useColorModeValue("gray.50", "gray.700");
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();
  const [selectedRequest, setSelectedRequest] = useState<RequestData>();
  const inventory = useInventory();

  const { data: requests, mutate, isSuccess } = useFetchAllRequest();
  const updateRequest = useUpdateRequest();

  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(1);

  const handleMutate = (page: number, limit: number, status: string) => {
    mutate({
      page,
      limit,
      status,
      includeDetails: true,
      includeUser: true,
    });
  };

  const handleUpdateRequest = async (requestId: string, status: string) => {
    updateRequest.mutate({
      id: requestId,
      data: { status },
    });
  };

  useEffect(() => {
    if (updateRequest.isSuccess) {
      toast({
        title: "Request updated successfully.",
        position: "top-right",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
      handleMutate(page, limit, status);
    } else if (updateRequest.status === "error") {
      toast({
        title: "Error updating request.",
        position: "top-right",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  }, [updateRequest.isSuccess]);

  useEffect(() => {
    if (!isSuccess) {
      handleMutate(page, limit, status);
    }
  }, [isSuccess, page, limit]);

  console.log("Requests: ", requests);
  return (
    <Box overflowX="auto">
      <Skeleton isLoaded={isSuccess}>
        <Table variant="simple">
          <Thead bg={useColorModeValue("gray.50", "gray.800")}>
            <Tr>
              <Th>Name of Organization</Th>
              <Th>Request Type</Th>
              <Th>Items</Th>
              <Th>Date</Th>
              <Th>Actions</Th>
            </Tr>
          </Thead>
          <Tbody>
            {requests?.data?.map((request) => (
              <Tr key={request.requestedBy.id} _hover={{ bg: hoverBg }}>
                <Td fontWeight="medium">#{request.requestedBy.username}</Td>
                <Td>
                  {request.requestType.charAt(0).toUpperCase() + request.requestType.slice(1)}
                </Td>
                <Td>
                  <Stack spacing={1}>
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
                  </Stack>
                </Td>
                <Td>
                  <Tooltip label={request.createdAt.toString()}>
                    {new Date(request.createdAt).toLocaleDateString("en-CA")}
                  </Tooltip>
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
                      {request.status === "pending" && (
                        <>
                          <MenuItem
                            icon={<CheckCircle />}
                            onClick={() =>
                              handleUpdateRequest(request.id, "approved")
                            }
                          >
                            Approve
                          </MenuItem>
                          <MenuItem
                            icon={<XCircle />}
                            onClick={() =>
                              handleUpdateRequest(request.id, "rejected")
                            }
                          >
                            Reject
                          </MenuItem>
                        </>
                      )}
                      <MenuItem
                        icon={<Eye />}
                        onClick={() => {
                          setSelectedRequest(request);
                          onOpen();
                        }}
                      >
                        View
                      </MenuItem>
                    </MenuList>
                  </Menu>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>

        <Flex justify="space-between" align="center" mt={4}>
          <Flex align="center">
            <Box>
              <Text color={textColor} mr={2}>
                Showing {Math.min(limit, requests?.totalItems ?? 0)} of{" "}
                {requests?.totalItems ?? 0} requests
              </Text>
            </Box>
            <Box>
              <Select
                value={limit}
                onChange={(e) => {
                  setLimit(parseInt(e.target.value));
                  setPage(1); // Reset to first page when limit changes
                  handleMutate(1, parseInt(e.target.value), status);
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
                  handleMutate(page - 1, limit, status);
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
                if (page < (requests?.totalItems ?? 0) / limit) {
                  setPage(page + 1);
                  handleMutate(page + 1, limit, status);
                }
              }}
              isDisabled={
                page === Math.ceil((requests?.totalItems ?? 0) / limit) ||
                requests?.totalItems === 0
              }
              colorScheme="blue"
            >
              Next
            </Button>
          </Flex>
        </Flex>

        {requests?.data.length === 0 && (
          <Box py={8} textAlign="center">
            <Text color="gray.500">No requests found</Text>
          </Box>
        )}
      </Skeleton>
      {/* Request Modal */}
      <RequestModal
        isOpen={isOpen}
        onClose={onClose}
        request={selectedRequest}
      />
    </Box>
  );
}
