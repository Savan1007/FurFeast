import React, { use, useEffect } from "react";
import {
  Box,
  Button,
  Card,
  CardBody,
  CardHeader,
  Flex,
  Heading,
  HStack,
  Skeleton,
  Stack,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import Navbar from "../../components/navbar";
import { Package, Clock, CheckCircle, Plus } from "lucide-react";
import { useInventory, useUser } from "../../store/app-store";
import { Role } from "../../utils/enums";
import { useFetchDashboardData } from "./api/api";
import RequestTable from "../request/components/request-table";
import SupplierCommunityDashboard from "./components/supplier-community-dashboard";
import { useNavigate } from "react-router-dom";

const mockData = {
  totalItems: 0,
  lowStock: 0,
  pendingOrders: 6,
  completedOrders: 0,
  recentActivity: [
    {
      id: 1,
      title: "New inventory added",
      details: "SKU-234 added by John Doe",
      time: "2 hours ago",
    },
    {
      id: 2,
      title: "Stock transfer",
      details: "Warehouse A to Warehouse B",
      time: "5 hours ago",
    },
    {
      id: 3,
      title: "Order fulfilled",
      details: "Order #156879 completed",
      time: "8 hours ago",
    },
  ],
  pendingRequests: [
    { id: 1, type: "Stock Request", from: "Sarah Johnson" },
    { id: 2, type: "Purchase Approval", from: "Mike Chen" },
    { id: 3, type: "Access Request", from: "Lisa Park" },
  ],
};

const requests = [
  { id: 1, requestDate: "2023-10-01", status: "pending" },
  { id: 2, requestDate: "2023-10-02", status: "completed" },
  { id: 3, requestDate: "2023-10-03", status: "pending" },
  { id: 4, requestDate: "2023-10-04", status: "completed" },
  { id: 5, requestDate: "2023-10-05", status: "pending" },
];

const foodItems = [
  { id: 1, name: "Dog's Dry Food", quantity: 5, unit: "kg" },
  { id: 2, name: "Cat's Wet Food", quantity: 8, unit: "cans" },
];

export default function Dashboard() {
  const navigate = useNavigate();
  const cardBg = useColorModeValue("white", "gray.800");
  const borderColor = useColorModeValue("gray.200", "gray.700");
  const textColor = useColorModeValue("gray.600", "gray.400");
  const headingColor = useColorModeValue("gray.800", "white");
  const user = useUser();
  const dashboardData = useFetchDashboardData();
  const inventory = useInventory();

  useEffect(() => {
    if (!dashboardData.isSuccess) {
      dashboardData.mutate(
        {},
        {
          onSuccess: () => {
            console.log("Dashboard data mutated successfully");
          },
          onError: (error) => {
            console.error("Error mutating dashboard data", error);
          },
        }
      );
    }
  }, []);

  const stats = [
    {
      title: "Total Inventory Items",
      value: mockData.totalItems,
      icon: <Package className="w-8 h-8" />,
      color: "brand.500",
    },
    {
      title: "Low Stock Items",
      value: mockData.lowStock,
      icon: <Package className="w-8 h-8" />,
      color: "yellow.500",
    },
    {
      title: "Pending Requests",
      value: mockData.pendingOrders,
      icon: <Clock className="w-8 h-8" />,
      color: "orange.500",
    },
    {
      title: "Completed Requests",
      value: mockData.completedOrders,
      icon: <CheckCircle className="w-8 h-8" />,
      color: "green.500",
    },
  ];

  return (
    <Navbar>
      {(user?.roles[0].name === Role.SuperAdmin ||
        user?.roles[0].name === Role.Admin) && (
        <Box maxW="7xl" mx="auto" px={{ base: 4, sm: 6, lg: 8 }}>
          <Box>
            <Heading as="h1" size="lg" color={headingColor}>
              Dashboard
            </Heading>
            <Text color={textColor}>Overview of food distribution system</Text>
          </Box>

          <Box
            display="grid"
            gap={4}
            mt={6}
            gridTemplateColumns={{
              base: "1fr",
              md: "repeat(3, 1fr)",
              lg: "repeat(3, 1fr)",
            }}
          >
            <Skeleton isLoaded={dashboardData.isSuccess}>
              <Card
                bg={cardBg}
                borderWidth="1px"
                borderColor={borderColor}
                borderRadius="lg"
                shadow="sm"
                px={4}
              >
                <CardHeader
                  display="flex"
                  alignItems="center"
                  justifyContent="space-between"
                  pb={0}
                >
                  <Text fontSize="lg" fontWeight="semibold" color={textColor}>
                    Total Inventory Items
                  </Text>
                  <Box color={"brand.500"}>
                    <Package className="w-8 h-8" />
                  </Box>
                </CardHeader>
                <CardBody>
                  <Text fontSize="2xl" fontWeight="bold" color={headingColor}>
                    {dashboardData.data?.totalInventoryItems}
                  </Text>
                </CardBody>
              </Card>
            </Skeleton>
            <Skeleton isLoaded={dashboardData.isSuccess}>
              <Card
                bg={cardBg}
                borderWidth="1px"
                borderColor={borderColor}
                borderRadius="lg"
                shadow="sm"
                px={4}
              >
                <CardHeader
                  display="flex"
                  alignItems="center"
                  justifyContent="space-between"
                  pb={0}
                >
                  <Text fontSize="lg" fontWeight="semibold" color={textColor}>
                    Pending Requests
                  </Text>
                  <Box color={"orange.500"}>
                    <Clock className="w-8 h-8" />
                  </Box>
                </CardHeader>
                <CardBody>
                  <Text fontSize="2xl" fontWeight="bold" color={headingColor}>
                    {dashboardData.data?.totalPendingRequests}
                  </Text>
                </CardBody>
              </Card>
            </Skeleton>
            <Skeleton isLoaded={dashboardData.isSuccess}>
              <Card
                bg={cardBg}
                borderWidth="1px"
                borderColor={borderColor}
                borderRadius="lg"
                shadow="sm"
                px={4}
              >
                <CardHeader
                  display="flex"
                  alignItems="center"
                  justifyContent="space-between"
                  pb={0}
                >
                  <Text fontSize="lg" fontWeight="semibold" color={textColor}>
                    Approved Requests
                  </Text>
                  <Box color={"green.500"}>
                    <CheckCircle className="w-8 h-8" />
                  </Box>
                </CardHeader>
                <CardBody>
                  <Text fontSize="2xl" fontWeight="bold" color={headingColor}>
                    {dashboardData.data?.totalCompleteRequests}
                  </Text>
                </CardBody>
              </Card>
            </Skeleton>
          </Box>
          <Box
            display="grid"
            gap={4}
            gridTemplateColumns={{ base: "1fr", md: "repeat(2, 1fr)" }}
            mt={6}
          >
            <Skeleton isLoaded={dashboardData.isSuccess}>
              <Card
                bg={cardBg}
                borderWidth="1px"
                borderColor={borderColor}
                borderRadius="lg"
                shadow="sm"
                px={6}
              >
                <CardHeader pb={0}>
                  <Text
                    fontSize="lg"
                    fontWeight="semibold"
                    color={headingColor}
                  >
                    Recent Food Requests
                  </Text>
                </CardHeader>

                <CardBody>
                  <Box>
                    {dashboardData.data?.recentRequests
                      .slice(0, 5)
                      .map((request) => (
                        <Box
                          key={request.id}
                          display="flex"
                          alignItems="center"
                          justifyContent="space-between"
                          py={2}
                        >
                          <Box>
                            <Text fontWeight="medium" color={headingColor}>
                              Type:{" "}
                              {request.requestType.charAt(0).toUpperCase() +
                                request.requestType.slice(1)}
                            </Text>
                            <Text fontSize="sm" color={textColor}>
                              {new Date(request.createdAt).toLocaleDateString()}
                            </Text>
                          </Box>
                          <Box
                            px={2}
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
                            {request.status.charAt(0).toUpperCase() +
                              request.status.slice(1)}
                          </Box>
                        </Box>
                      ))}
                  </Box>
                </CardBody>
              </Card>
            </Skeleton>
            <Skeleton isLoaded={dashboardData.isSuccess}>
              <Card
                bg={cardBg}
                borderWidth="1px"
                borderColor={borderColor}
                borderRadius="lg"
                shadow="sm"
                px={6}
                height={"100%"}
              >
                <CardHeader pb={0}>
                  <Text
                    fontSize="lg"
                    fontWeight="semibold"
                    color={headingColor}
                  >
                    Low Stock Items
                  </Text>
                </CardHeader>
                <CardBody>
                  <Box>
                    {inventory
                      ?.filter(
                        (item) => item.quantity <= item.lowStockThreshold
                      )
                      .slice(0, 5)
                      .map((item) => (
                        <Box
                          key={item.id}
                          display="flex"
                          alignItems="center"
                          justifyContent="space-between"
                          py={2}
                        >
                          <Box>
                            <Text fontWeight="medium" color={headingColor}>
                              {item.itemName}
                            </Text>
                            <Text fontSize="sm" color={textColor}>
                              {item.quantity} {item.unit} remaining
                            </Text>
                          </Box>
                          <Text color="red.500" fontWeight="medium">
                            Low Stock
                          </Text>
                        </Box>
                      ))}
                  </Box>
                </CardBody>
              </Card>
            </Skeleton>
          </Box>
        </Box>
      )}
      {user?.roles[0].name === Role.Supplier && (
        <Box maxW="7xl" mx="auto" px={{ base: 4, sm: 6, lg: 8 }}>
          <Stack spacing={8}>
            <Flex justify="space-between" align="center">
              <Box>
                <Heading as="h1" size="lg" color={headingColor}>
                  Supplier Dashboard
                </Heading>
                <Text color={textColor}>
                  Overview of food distribution system
                </Text>
              </Box>
              <Button
                colorScheme="blue"
                size="lg"
                leftIcon={<Plus size={20} />}
                onClick={() =>
                  navigate("/requests/new", { state: { role: "Supplier" } })
                }
              >
                New Request
              </Button>
            </Flex>
            <SupplierCommunityDashboard />
          </Stack>
        </Box>
      )}
      {user?.roles[0].name === Role.Community && (
        <Box maxW="7xl" mx="auto" px={{ base: 4, sm: 6, lg: 8 }}>
          <Flex justify="space-between" align="center">
            <Box>
              <Heading as="h1" size="lg" color={headingColor}>
                Community Dashboard
              </Heading>
              <Text color={textColor}>
                Overview of food distribution system
              </Text>
            </Box>
            <Button
              colorScheme="blue"
              size="lg"
              leftIcon={<Plus size={20} />}
              onClick={() =>
                navigate("/requests/new", { state: { role: "Community" } })
              }
            >
              New Request
            </Button>
          </Flex>
          <SupplierCommunityDashboard />
        </Box>
      )}
    </Navbar>
  );
}
