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
import { FoodRequest, Requests, Request } from "../api/types";
import RequestModal from "./request-modal";
import { useState } from "react";

export default function RequestTable({ requests }: { requests: Requests }) {
  console.log("requests in table", requests);
  const hoverBg = useColorModeValue("gray.50", "gray.700");
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selectedRequest, setSelectedRequest] = useState<Request>();
  return (
    <Box overflowX="auto">
      <Table variant="simple">
        <Thead bg={useColorModeValue("gray.50", "gray.800")}>
          <Tr>
            <Th>Request ID</Th>
            <Th>Items</Th>
            <Th>Date</Th>
            <Th>Actions</Th>
          </Tr>
        </Thead>
        <Tbody>
          {requests.data.map((request) => (
            <Tr key={request.supplierId} _hover={{ bg: hoverBg }}>
              <Td fontWeight="medium">#{request.supplierId}</Td>
              <Td>
                <Stack spacing={1}>
                  {/* {request.items.map((item, index) => ( */}
                  <Flex
                    // key={index}
                    align="center"
                    gap={2}
                  >
                    <ClipboardList size={16} />
                    <Text>
                      {request.category}:{" "}
                      <Text as="span" fontWeight="medium">
                        {request.quantity + " " + request.unit} units
                      </Text>
                    </Text>
                  </Flex>
                  {/* ))} */}
                </Stack>
              </Td>
              <Td>
                <Tooltip label={request.requestDate.toString()}>
                  {request.requestDate.toString()}
                </Tooltip>
              </Td>
              <Td>
                <Menu>
                  <MenuButton
                    as={IconButton}
                    aria-label="Options"
                    icon={<EllipsisVerticalIcon />}
                    variant="outline"
                  />
                  <MenuList>
                    <MenuItem icon={<CheckCircle />}>Approve</MenuItem>
                    <MenuItem icon={<XCircle />}>Reject</MenuItem>
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
                {/* {request.status === "pending" && (
                  <Stack direction="row" spacing={2}>
                    <Tooltip label="Approve this request">
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
                    </Tooltip>
                    <Tooltip label="Reject this request">
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
                    </Tooltip>
                    <Tooltip label="Reject this request">
                      <Button
                        size="sm"
                        colorScheme="blue"
                        leftIcon={<Eye size={16} />}
                        // onClick={() =>
                        //   updateStatusMutation.mutate({
                        //     id: request.id,
                        //     status: "rejected",
                        //   })
                        // }
                      >
                        View
                      </Button>
                    </Tooltip>
                  </Stack>
                )} */}
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
      {requests.data.length === 0 && (
        <Box py={8} textAlign="center">
          <Text color="gray.500">No requests found</Text>
        </Box>
      )}
      <RequestModal isOpen={isOpen} onClose={onClose} request={selectedRequest} />
    </Box>
  );
}
