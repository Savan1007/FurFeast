import React, { use, useEffect, useState } from "react";
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
  useToast,
} from "@chakra-ui/react";
import { useLocation, useNavigate } from "react-router-dom";
import RequestTable from "./request-table";
import { useFetchAllRequest, useUpdateRequest } from "../api/api";
import { Requests } from "../api/types";
import { useFetchAllInventory } from "../../inventory/api/api";
import { useActions, useInventory, useUser } from "../../../store/app-store";
import { Role } from "../../../utils/enums";

const Request = () => {
  const navigate = useNavigate();
  const storeActions = useActions();
  const { mutateAsync } = useFetchAllRequest();
  const [pendingRequests, setPendingRequests] = useState<Requests>();
  const [approvedRequests, setApprovedRequests] = useState<Requests>();
  const [rejectedRequests, setRejectedRequests] = useState<Requests>();

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const [pending, approved, rejected] = await Promise.all([
          mutateAsync({
            status: "pending",
            includeDetails: true,
            includeUser: true,
          }),
          mutateAsync({
            status: "approved",
            includeDetails: true,
            includeUser: true,
          }),
          mutateAsync({
            status: "rejected",
            includeDetails: true,
            includeUser: true,
          }),
        ]);

        setPendingRequests(pending);
        setApprovedRequests(approved);
        setRejectedRequests(rejected);
      } catch (error) {
        console.error("Error fetching requests", error);
      }
    };

    fetchRequests();
  }, [mutateAsync]);

  const textColor = useColorModeValue("gray.600", "gray.400");
  const headingColor = useColorModeValue("gray.800", "white");

  const user = useUser();

  return (
    <Navbar>
      <Box maxW="7xl" mx="auto" px={{ base: 4, sm: 6, lg: 8 }}>
        <Stack spacing={8}>
          {(user?.roles[0].name === Role.SuperAdmin ||
            user?.roles[0].name === Role.Admin) && (
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
          )}
          <Skeleton
            isLoaded={
              pendingRequests !== undefined &&
              approvedRequests !== undefined &&
              rejectedRequests !== undefined
            }
          >
            <Card>
              <CardBody>
                <Tabs>
                  <TabList>
                    <Tab>
                      <Flex align="center" gap={2}>
                        <Clock size={16} color="orange" />
                        Pending
                        <Badge ml={2} colorScheme="orange" variant="subtle">
                          {/* {pendingRequests?.data.length} */}
                        </Badge>
                      </Flex>
                    </Tab>
                    <Tab>
                      <Flex align="center" gap={2}>
                        <CheckCircle size={16} color="green" />
                        Approved
                        <Badge ml={2} colorScheme="green" variant="subtle">
                          {/* {approvedRequests?.data.length} */}
                        </Badge>
                      </Flex>
                    </Tab>
                    <Tab>
                      <Flex align="center" gap={2}>
                        <XCircle size={16} color="red" />
                        Rejected
                        <Badge ml={2} colorScheme="red" variant="subtle">
                          {/* {rejectedRequests?.data.length} */}
                        </Badge>
                      </Flex>
                    </Tab>
                  </TabList>

                  <TabPanels>
                    <TabPanel px={0}>
                      {pendingRequests?.data.length ? (
                        <RequestTable status="pending" />
                      ) : (
                        <Text color={textColor}>
                          No pending requests available.
                        </Text>
                      )}
                    </TabPanel>
                    <TabPanel px={0}>
                      {approvedRequests?.data.length ? (
                        <RequestTable status="approved" />
                      ) : (
                        <Text color={textColor}>
                          No approved requests available.
                        </Text>
                      )}
                    </TabPanel>
                    <TabPanel px={0}>
                      {rejectedRequests?.data.length ? (
                        <RequestTable status="rejected" />
                      ) : (
                        <Text color={textColor}>
                          No rejected requests available.
                        </Text>
                      )}
                    </TabPanel>
                  </TabPanels>
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
