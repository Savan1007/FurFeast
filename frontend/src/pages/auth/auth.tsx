import { useState } from "react";
import { useActions, useUser } from "../../store/app-store";
import { Form, useNavigate } from "react-router-dom";
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
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useAuth } from "./api/api";
import { Moon, Sun } from "lucide-react";

const Auth = () => {
  const storeAction = useActions();
  const navigate = useNavigate();
  const { data: user, mutate, isSuccess, status } = useAuth();
  const { colorMode, toggleColorMode } = useColorMode();

  const schema = yup.object().shape({
    username: yup.string().required("Username is required."),
    password: yup.string().required("Password is required."),
  });

  type FormData = {
    username: string;
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

  if (isSuccess && user.auth) {
    storeAction?.setUser(user.data);
    navigate("/");
  }

  if (user && user.auth === false) {
    console.log("Invalid username or password");
  }

  //   const handleLogin = () => {
  //     if (username === "admin" && password === "admin") {
  //       storeAction?.setUser({
  //         id: 1,
  //         username: "admin",
  //         email: "admin@gmail.com",
  //         role: "admin",
  //       });
  //       navigate("/");
  //     } else {
  //       setIsError(true);
  //     }
  //     console.log("isError", isError);
  //   };
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
                    <FormControl isInvalid={!!errors.username}>
                      <FormLabel htmlFor="username">Username</FormLabel>
                      <Input
                        isRequired={true}
                        id="username"
                        type="username"
                        borderBottomWidth="2px"
                        placeholder="username"
                        variant="flushed"
                        autoFocus={true}
                        {...register("username")}
                      />
                      <FormErrorMessage>
                        {errors.username?.message}
                      </FormErrorMessage>
                    </FormControl>
                    <FormControl isInvalid={!!errors.password}>
                      <Stack>
                        <FormLabel htmlFor="password" mt="4">
                          Password
                        </FormLabel>
                        <Input
                          isRequired={true}
                          id="password"
                          type="password"
                          borderBottomWidth="2px"
                          placeholder="Enter your password"
                          variant="flushed"
                          {...register("password")}
                        />
                        <FormErrorMessage>
                          {errors.password?.message}
                        </FormErrorMessage>
                      </Stack>
                    </FormControl>
                  </Stack>
                  {user && !user.auth && (
                    <Text color="red">Invalid username or password</Text>
                  )}
                  <Stack spacing="6">
                    <Button
                      type="submit"
                      colorScheme="gray"
                      variant="solid"
                      bg={"black"}
                      textColor={"white"}
                      _hover={{ bg: "black" }}
                      isLoading={isSubmitting || status === "pending"}
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
