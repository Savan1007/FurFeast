import { useEffect, useState } from "react";
import { useActions } from "../../store/app-store";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Button,
  Checkbox,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  HStack,
  Input,
  Stack,
  Text,
  Image,
  useBreakpointValue,
  Container,
  Divider,
  FormErrorMessage,
  Tooltip,
  IconButton,
  useColorMode,
  InputGroup,
  InputRightElement,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useAuth, useFetchUser } from "./api/api";
import { EyeIcon, EyeOff, Moon, Sun } from "lucide-react";
import { Role } from "../../utils/enums";

const Auth = () => {
  const storeAction = useActions();
  const navigate = useNavigate();
  const { data, mutate, isSuccess, status, isError } = useAuth();
  const [show, setShow] = useState(false);
  const handleClick = () => setShow(!show);
  const [loadingRole, setLoadingRole] = useState(false);
  const user = useFetchUser();

  const schema = yup.object({
    emailOrUsername: yup.string().required("Email/Username is required."),
    password: yup.string().required("Password is required."),
  });

  type FormData = {
    emailOrUsername: string;
    password: string;
  };

  const {
    formState: { errors, isSubmitting },
    handleSubmit,
    register,
  } = useForm<FormData>({
    mode: "onBlur",
    resolver: yupResolver(schema),
  });

  const onSubmit = handleSubmit((values) => {
    mutate(values);
  });

  useEffect(() => {
    const fetchUserRole = async () => {
      if (data?.user?.id && isSuccess && data.success) {
        setLoadingRole(true);
        try {
          console.log("Fetching user role...");
          user.mutate(data.user.id); // Call the useFetchUser mutation with the user ID
        } catch (error) {
          console.error("Failed to fetch user role:", error);
        } finally {
          setLoadingRole(false);
        }
      }
    };

    fetchUserRole();
  }, [data, isSuccess]);

  useEffect(() => {
    if (user.isSuccess && user.data?.success) {
      storeAction?.setUser(user.data.data); // Save user role in the store
      navigate("/"); // Redirect after fetching the role
    }

    if (user.isError) {
      console.error("Failed to fetch user role:", user.error);
    }
  }, [user, storeAction, navigate]);

  useEffect(() => {
    if (isSuccess && data.success) {
      storeAction?.setAuthUser({
        id: data.user.id,
        username: data.user.username,
        email: data.user.email,
      });
      storeAction?.setAccessToken(data.accessToken);
    }
  }, [isSuccess, data, storeAction]);

  return (
    <Flex
      margin="auto"
      alignSelf="center"
      h={{ base: "auto", md: "100vh" }}
      flexDirection={{ base: "column", md: "row" }}
    >
      {/* --- Left side of page --- */}

      <Stack
        alignItems="center"
        justifyContent="center"
        w={"full"}
        p={{ base: "25px", md: "0px" }}
      >
        {/* -- Login Component */}

        <Stack w="450px" h="500px" p="10">
          <Stack spacing="8">
            <Stack spacing={{ base: "2", md: "3" }} textAlign="center">
              <Heading as={"h3"} size={"lg"} textAlign="center">
                Welcome to Food Distribution System
              </Heading>
            </Stack>
            <Divider bg={"black"} h={"0.5"} />
            <Box borderWidth="0px">
              <form onSubmit={onSubmit}>
                <Stack spacing="6">
                  <Stack spacing="5">
                    <FormControl isInvalid={!!errors.emailOrUsername}>
                      <FormLabel htmlFor="email">Email / Username</FormLabel>
                      <Input
                        isRequired={true}
                        id="emailOrUsername"
                        borderBottomWidth="2px"
                        placeholder="Email / Username"
                        variant="flushed"
                        autoFocus={true}
                        {...register("emailOrUsername")}
                      />
                      <FormErrorMessage>
                        {errors.emailOrUsername?.message}
                      </FormErrorMessage>
                    </FormControl>
                    <FormControl isInvalid={!!errors.password}>
                      <Stack>
                        <FormLabel htmlFor="password" mt="4">
                          Password
                        </FormLabel>
                        <InputGroup size="md">
                          <Input
                            isRequired={true}
                            id="password"
                            type={show ? "text" : "password"}
                            borderBottomWidth="2px"
                            placeholder="Enter your password"
                            variant="flushed"
                            {...register("password")}
                          />
                          <InputRightElement width="4.5rem">
                            <Button
                              h="1.75rem"
                              size="sm"
                              onClick={handleClick}
                              variant={"ghost"}
                            >
                              {show ? (
                                <EyeIcon size={16} />
                              ) : (
                                <EyeOff size={16} />
                              )}
                            </Button>
                          </InputRightElement>
                        </InputGroup>
                        <FormErrorMessage>
                          {errors.password?.message}
                        </FormErrorMessage>
                      </Stack>
                    </FormControl>
                  </Stack>
                  {isError && (
                    <Text color="red">Invalid email or password</Text>
                  )}
                  <Stack spacing="6">
                    <Button
                      type="submit"
                      colorScheme="gray"
                      variant="solid"
                      bg={"black"}
                      textColor={"white"}
                      _hover={{ bg: "black" }}
                      isLoading={
                        isSubmitting || status === "pending" || loadingRole
                      }
                    >
                      Login
                    </Button>
                  </Stack>
                </Stack>
              </form>
            </Box>
          </Stack>
        </Stack>
      </Stack>

      {/* Right: Login Illustration */}
      <Box w={"full"}>
        <Stack h={"100vh"} alignItems={"center"} justifyContent={"center"}>
          <Container>
            <Box padding={"4"} maxW={"2xl"}>
              <Heading as={"h3"} size={"xl"} textAlign={"left"}>
                Streamline Your Food Distribution
              </Heading>
              <Text mt={4}>
                Efficiently manage food inventory, handle donors with
                communities through our food distribution management system.
              </Text>
            </Box>
          </Container>
        </Stack>
      </Box>
    </Flex>
  );
};

export default Auth;
