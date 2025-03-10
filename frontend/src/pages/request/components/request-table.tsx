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
} from "@chakra-ui/react";
import { Icon, ClipboardList, CheckCircle, XCircle } from "lucide-react";
import { FoodRequest } from "../api/types";

export default function RequestTable({
  requests,
}: {
  requests: FoodRequest[];
}) {
  const hoverBg = useColorModeValue("gray.50", "gray.700");
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
          {requests.map((request) => (
            <Tr key={request.id} _hover={{ bg: hoverBg }}>
              <Td fontWeight="medium">#{request.id}</Td>
              <Td>
                <Stack spacing={1}>
                  {request.items.map((item, index) => (
                    <Flex key={index} align="center" gap={2}>
                      <ClipboardList size={16} />
                      <Text>
                        {item}:{" "}
                        <Text as="span" fontWeight="medium">
                          {request.quantities[index]} units
                        </Text>
                      </Text>
                    </Flex>
                  ))}
                </Stack>
              </Td>
              <Td>
                <Tooltip label={new Date(request.requestDate).toLocaleString()}>
                  {new Date(request.requestDate).toLocaleDateString()}
                </Tooltip>
              </Td>
              <Td>
                {request.status === "pending" && (
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
                  </Stack>
                )}
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
      {requests.length === 0 && (
        <Box py={8} textAlign="center">
          <Text color="gray.500">No requests found</Text>
        </Box>
      )}
    </Box>
  );
}
