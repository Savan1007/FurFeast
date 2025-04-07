import { useEffect } from "react";
import { useFetchAllRequest } from "../../request/api/api";
import {
  Box,
  Flex,
  Skeleton,
  Stack,
  Table,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  useColorModeValue,
  Text,
  Tooltip,
  Card,
  CardBody,
} from "@chakra-ui/react";
import { ClipboardList } from "lucide-react";
import { useAuthUser, useInventory } from "../../../store/app-store";

const SupplierCommunityDashboard = () => {
  const { data: requests, mutate, isSuccess } = useFetchAllRequest();
  const inventory = useInventory();
  const authUser = useAuthUser();

  useEffect(() => {
    if (!isSuccess) {
      mutate({
        userId: authUser?.id,
        // page: 1,
        // limit: 10,
        includeDetails: true,
        includeUser: true,
      });
    }
  }, [isSuccess]);

  return (
    <Box mt={8}>
      <Skeleton isLoaded={isSuccess}>
        <Card>
          <CardBody>
            <Table variant={"simple"}>
              <Thead bg={useColorModeValue("gray.50", "gray.800")}>
                <Tr>
                  <Th>Items</Th>
                  <Th>Date</Th>
                  <Th>Status</Th>
                </Tr>
              </Thead>
              <Tbody>
                {requests?.data.map((request) => (
                  <Tr key={request.id}>
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
                        {new Date(request.createdAt).toLocaleDateString(
                          "en-CA"
                        )}
                      </Tooltip>
                    </Td>
                    <Td>
                      <Box
                        w={"fit-content"}
                        px={4}
                        py={1}
                        borderRadius="full"
                        fontSize="xs"
                        fontWeight="medium"
                        bg={
                          request.status === "pending"
                            ? "yellow.100"
                            : request.status === "rejected"
                            ? "red.100"
                            : "green.100"
                        }
                        color={
                          request.status === "pending"
                            ? "yellow.800"
                            : request.status === "rejected"
                            ? "red.800"
                            : "green.800"
                        }
                        _dark={{
                          bg:
                            request.status === "pending"
                              ? "yellow.900"
                              : request.status === "rejected"
                              ? "red.900"
                              : "green.900",
                          color:
                            request.status === "pending"
                              ? "yellow.200"
                              : request.status === "rejected"
                              ? "red.200"
                              : "green.200",
                        }}
                      >
                        {request.status.charAt(0).toUpperCase() + request.status.slice(1)}
                      </Box>
                    </Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>
          </CardBody>
        </Card>
      </Skeleton>
    </Box>
  );
};

export default SupplierCommunityDashboard;
