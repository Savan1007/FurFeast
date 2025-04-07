import {
  Box,
  Button,
  Card,
  CardBody,
  Flex,
  Heading,
  Select,
  Skeleton,
  Stack,
  Table,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tooltip,
  Tr,
  useColorModeValue,
} from "@chakra-ui/react";
import { useState } from "react";
import Navbar from "../../components/navbar";
import { useInventory } from "../../store/app-store";
import { useFetchAllRequest } from "../request/api/api";
import { ClipboardList } from "lucide-react";

export default function Reports() {
  const textColor = useColorModeValue("gray.600", "gray.400");
  const headingColor = useColorModeValue("gray.800", "white");
  const bgColor = useColorModeValue("gray.50", "gray.800");
  const inventory = useInventory();

  const {
    data: requests,
    mutate,
    isSuccess,
    status: mutateStatus,
  } = useFetchAllRequest();

  const [status, setStatus] = useState<string | undefined>(undefined);
  const [requestType, setRequestType] = useState<string | undefined>(undefined);
  const [startDate, setStartDate] = useState<string | undefined>();
  const [endDate, setEndDate] = useState<string | undefined>();
  const [filterClicked, setFilterClicked] = useState(false);

  const handleSubmit = () => {
    setFilterClicked(true);
    const filters: Record<string, any> = {};
    if (status) filters.status = status;
    if (requestType) filters.requestType = requestType;
    if (startDate) filters.startDate = startDate;
    if (endDate) filters.endDate = endDate;

    mutate({
      includeDetails: true,
      includeUser: true,
      ...filters,
    });
  };

  return (
    <Navbar>
      <Box maxW="7xl" mx="auto" px={{ base: 4, sm: 6, lg: 8 }}>
        <Stack spacing={8}>
          <Box>
            <Heading size="lg" color={headingColor}>
              Report
            </Heading>
            <Text color={textColor}>View and manage your reports here.</Text>
          </Box>

          <Card>
            <CardBody>
              <Stack
                spacing={4}
                direction={{ base: "column", md: "row" }}
                mb={4}
                width={"100%"}
              >
                <Box flex={1}>
                  <Text color={textColor} mb={1}>
                    Status
                  </Text>
                  <Select
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                    variant="outline"
                    borderColor={useColorModeValue("gray.300", "gray.600")}
                    bg={useColorModeValue("white", "gray.700")}
                    color={useColorModeValue("black", "white")}
                    _hover={{
                      borderColor: useColorModeValue("gray.400", "gray.500"),
                    }}
                    _focus={{
                      borderColor: useColorModeValue("blue.500", "blue.300"),
                      boxShadow: "outline",
                    }}
                    height="40px"
                  >
                    <option>All</option>
                    <option value="pending">Pending</option>
                    <option value="approved">Approved</option>
                    <option value="rejected">Rejected</option>
                  </Select>
                </Box>
                <Box flex={1}>
                  <Text color={textColor} mb={1}>
                    Request Type
                  </Text>
                  <Select
                    value={requestType}
                    onChange={(e) => setRequestType(e.target.value)}
                    variant="outline"
                    borderColor={useColorModeValue("gray.300", "gray.600")}
                    bg={useColorModeValue("white", "gray.700")}
                    color={useColorModeValue("black", "white")}
                    _hover={{
                      borderColor: useColorModeValue("gray.400", "gray.500"),
                    }}
                    _focus={{
                      borderColor: useColorModeValue("blue.500", "blue.300"),
                      boxShadow: "outline",
                    }}
                    height="40px"
                  >
                    <option>All</option>
                    <option value="donation">For Donation</option>
                    <option value="distribution">For Handouts</option>
                  </Select>
                </Box>
                <Box flex={1}>
                  <Text color={textColor} mb={1}>
                    Start Date
                  </Text>
                  <Box
                    as="input"
                    type="date"
                    value={startDate}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                      const selectedDate = new Date(e.target.value);
                      const formattedDate = selectedDate
                        .toISOString()
                        .split("T")[0];
                      setStartDate(formattedDate);
                    }}
                    width="100%"
                    padding="8px"
                    borderRadius="4px"
                    borderWidth="1px"
                    borderColor={useColorModeValue("gray.300", "gray.600")}
                    backgroundColor={useColorModeValue("white", "gray.700")}
                    color={useColorModeValue("black", "white")}
                    _hover={{
                      borderColor: useColorModeValue("gray.400", "gray.500"),
                    }}
                    _focus={{
                      borderColor: useColorModeValue("blue.500", "blue.300"),
                      boxShadow: "outline",
                    }}
                    height="40px"
                  />
                </Box>
                <Box flex={1}>
                  <Text color={textColor} mb={1}>
                    End Date
                  </Text>
                  <Box
                    as="input"
                    type="date"
                    value={endDate}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                      const selectedDate = new Date(e.target.value);
                      const formattedDate = selectedDate
                        .toISOString()
                        .split("T")[0];
                      setEndDate(formattedDate);
                    }}
                    width="100%"
                    padding="8px"
                    borderRadius="4px"
                    borderWidth="1px"
                    borderColor={useColorModeValue("gray.300", "gray.600")}
                    backgroundColor={useColorModeValue("white", "gray.700")}
                    color={useColorModeValue("black", "white")}
                    _hover={{
                      borderColor: useColorModeValue("gray.400", "gray.500"),
                    }}
                    _focus={{
                      borderColor: useColorModeValue("blue.500", "blue.300"),
                      boxShadow: "outline",
                    }}
                    height="40px"
                  />
                </Box>
                <Box
                  flex={1}
                  display="flex"
                  alignItems="center"
                  pt={{ base: 0, md: 6 }}
                >
                  <Button
                    onClick={handleSubmit}
                    colorScheme="blue"
                    height="40px"
                    width={{ base: "100%", md: "50%" }}
                  >
                    Filter
                  </Button>
                </Box>
              </Stack>
            </CardBody>
          </Card>
          {filterClicked && (
            <Skeleton isLoaded={mutateStatus !== "pending"}>
              <Card>
                <CardBody>
                  <Table variant="simple">
                    <Thead bg={bgColor}>
                      <Tr>
                        <Th>Name of Organization</Th>
                        <Th>Items</Th>
                        <Th>Date</Th>
                      </Tr>
                    </Thead>
                    <Tbody>
                      {(requests?.data ?? []).map((request) => (
                        <Tr key={request.id}>
                          <Td fontWeight="medium">
                            #{request.requestedBy.username}
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
                              {new Date(request.createdAt).toLocaleDateString(
                                "en-CA"
                              )}
                            </Tooltip>
                          </Td>
                        </Tr>
                      ))}
                    </Tbody>
                  </Table>
                </CardBody>
              </Card>
            </Skeleton>
          )}
        </Stack>
      </Box>
    </Navbar>
  );
}
