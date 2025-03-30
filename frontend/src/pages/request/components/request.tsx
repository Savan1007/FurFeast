import React, { useEffect } from "react";
import Navbar from "../../../components/navbar";
import { CheckCircle, Clock, Plus, XCircle } from "lucide-react";
import {
  Box,
  Stack,
  Flex,
  Button,
  Text,
  Heading,
  Card,
  CardBody,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Badge,
  useColorModeValue,
  Skeleton,
} from "@chakra-ui/react";
import { useLocation, useNavigate } from "react-router-dom";
import RequestTable from "./request-table";
import { useFetchAllRequest } from "../api/api";

const Request = () => {
  const navigate = useNavigate();
  const { data: requests, mutate, isSuccess, status } = useFetchAllRequest();

  useEffect(() => {
    mutate({ status: "pending", includeDetails: true, includeUser: true }, {
      onSuccess: () => {
        console.log("Pending requests fetched successfully");
      },
      onError: (error) => {
        console.error("Error fetching pending requests", error);
      }
    });

    mutate({ status: "approved", includeDetails: true, includeUser: true }, {
      onSuccess: () => {
        console.log("Approved requests fetched successfully");
      },
      onError: (error) => {
        console.error("Error fetching approved requests", error);
      }
    });

    mutate({ status: "rejected", includeDetails: true, includeUser: true }, {
      onSuccess: () => {
        console.log("Rejected requests fetched successfully");
      },
      onError: (error) => {
        console.error("Error fetching rejected requests", error);
      }
    });
  }, [mutate]);
  
  useEffect(() => {
    if (isSuccess) {
      console.log("Data fetched successfully");
    }
  }, [isSuccess]);
  const textColor = useColorModeValue("gray.600", "gray.400");
  const headingColor = useColorModeValue("gray.800", "white");
  
  // if (status === "pending") {
  //   return <div>Loading...</div>;
  // }
  console.log("requests", requests);

  const pendingRequests = requests?.data?.filter((req) => req.status === "pending") || [];
  const approvedRequests = requests?.data?.filter((req) => req.status === "approved") || [];
  const rejectedRequests = requests?.data?.filter((req) => req.status === "rejected") || [];
  console.log("pendingRequests", pendingRequests);
  // const pendingRequests =
  //   Array.isArray(requests) ? requests.flatMap((req) => req.data || []).filter((req) => req.status === "pending") : [];
  // const approvedRequests =
  //   Array.isArray(requests) ? requests.flatMap((req) => req.data || []).filter((req) => req.status === "approved") : [];
  // const rejectedRequests =
  //   Array.isArray(requests) ? requests.flatMap((req) => req.data || []).filter((req) => req.status === "rejected") : [];

  return (
    <Navbar>
      <Box maxW="7xl" mx="auto" px={{ base: 4, sm: 6, lg: 8 }}>
        <Stack spacing={8}>
          <Flex justify="space-between" align="center">
            <Box>
              <Heading size="lg" color={headingColor}>
                Food Requests
              </Heading>
              <Text color={textColor}>
                Manage and track food distribution requests
              </Text>
            </Box>
            <Button
              colorScheme="blue"
              size="lg"
              leftIcon={<Plus size={20} />}
              onClick={() => navigate("/requests/new")}
            >
              New Request
            </Button>
          </Flex>
          <Skeleton isLoaded={status !== "success"}>
          <Card>
            <CardBody>
              <Tabs>
                <TabList>
                  <Tab>
                    <Flex align="center" gap={2}>
                      <Clock size={16} />
                      Pending
                      <Badge ml={2} colorScheme="orange" variant="subtle">
                        {pendingRequests.length}
                      </Badge>
                    </Flex>
                  </Tab>
                  <Tab>
                    <Flex align="center" gap={2}>
                      <CheckCircle size={16} />
                      Approved
                      <Badge ml={2} colorScheme="green" variant="subtle">
                        {approvedRequests.length}
                      </Badge>
                    </Flex>
                  </Tab>
                  <Tab>
                    <Flex align="center" gap={2}>
                      <XCircle size={16} />
                      Rejected
                      <Badge ml={2} colorScheme="red" variant="subtle">
                        {rejectedRequests.length}
                      </Badge>
                    </Flex>
                  </Tab>
                </TabList>

                {/* <TabPanels>
                  <TabPanel px={0}>
                    <RequestTable requests={{ data: pendingRequests }} />
                  </TabPanel>
                  <TabPanel px={0}>
                    <RequestTable requests={{ data: approvedRequests }} />
                  </TabPanel>
                  <TabPanel px={0}>
                    <RequestTable requests={{ data: rejectedRequests }} />
                  </TabPanel>
                </TabPanels> */}
              </Tabs>
            </CardBody>
          </Card>
          </Skeleton> 
        </Stack>
      </Box>
    </Navbar>
  );
};

export default Request;
