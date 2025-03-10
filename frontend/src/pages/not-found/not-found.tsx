import React from "react";
import Navbar from "../../components/navbar";
import { Card, CardBody, Stack, useColorModeValue } from "@chakra-ui/react";
import { AlertCircle, Box } from "lucide-react";

const NotFound = () => {
  const cardBg = useColorModeValue("white", "gray.800");
  return (
    <Navbar>
      <Stack
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Card style={{ width: "100%", maxWidth: "28rem", margin: "1rem" }}>
          <CardBody style={{ paddingTop: "1.5rem" }}>
            <div
              style={{ display: "flex", marginBottom: "1rem", gap: "0.5rem" }}
            >
              <AlertCircle
                style={{ height: "2rem", width: "2rem", color: "#F56565" }}
              />
              <h1
                style={{
                  fontSize: "1.5rem",
                  fontWeight: "bold",
                  color: "#1A202C",
                }}
              >
                404 Page Not Found
              </h1>
            </div>

            <p
              style={{
                marginTop: "1rem",
                fontSize: "0.875rem",
                color: "#718096",
              }}
            >
              Did you forget to add the page to the router?
            </p>
          </CardBody>
        </Card>
      </Stack>
    </Navbar>
  );
};

export default NotFound;
