import {
  Avatar,
  Box,
  Flex,
  Heading,
  HStack,
  Stack,
  useColorMode,
  useColorModeValue,
  Text,
  Container,
  Tooltip,
  IconButton,
  Button
} from "@chakra-ui/react";
import React, { useState } from "react";
import {
  Link,
  useLocation,
  useNavigate,
} from "react-router-dom";
import { Link as ChakraLink, LinkProps } from "@chakra-ui/react";
import {
  LayoutDashboard,
  Package,
  ClipboardList,
  BarChart,
  LogOut,
  Sun,
  Moon,
} from "lucide-react";
import { useActions, useUser } from "../store/app-store";

interface NavLinkProps {
  href: string;
  icon: React.ReactNode;
  children: React.ReactNode;
  isActive: boolean;
}

function NavLink({ href, icon, children, isActive }: NavLinkProps) {
  const activeColor = useColorModeValue("brand.600", "brand.300");
  const hoverBg = useColorModeValue("gray.100", "gray.700");

  return (
    <Link to={href}>
      <a>
        <Stack
          direction="row"
          px={4}
          py={2}
          rounded="md"
          color={isActive ? activeColor : undefined}
          _hover={{ bg: hoverBg }}
          alignItems="center"
          spacing={2}
        >
          {icon}
          <Text>{children}</Text>
        </Stack>
      </a>
    </Link>
  );
}

export default function Navbar({ children }: { children: React.ReactNode }) {
  const user = useUser();
  const storeAction = useActions();
  const location = useLocation();
  const { colorMode, toggleColorMode } = useColorMode();
  const bg = useColorModeValue("white", "gray.800");
  const borderColor = useColorModeValue("gray.200", "gray.700");

  const links = [
    { href: "/", label: "Dashboard", icon: <LayoutDashboard size={20} /> },
    { href: "/inventory", label: "Inventory", icon: <Package size={20} /> },
    { href: "/requests", label: "Requests", icon: <ClipboardList size={20} /> },
    { href: "/reports", label: "Reports", icon: <BarChart size={20} /> },
  ];

  return (
    <Box minH="100vh" bg={useColorModeValue("gray.50", "gray.900")}>
      <Box
        as="nav"
        position="fixed"
        w="full"
        bg={bg}
        borderBottom="1px"
        borderColor={borderColor}
        zIndex={1}
        shadow="sm"
      >
        <Container maxW="7xl">
          <Flex h={16} alignItems="center" justifyContent="space-between">
            <Stack direction="row" spacing={8} alignItems="center">
              <Text
                fontSize="lg"
                fontWeight="bold"
                color={useColorModeValue("brand.600", "brand.300")}
              >
                RHS Food Network
              </Text>
              <Stack direction="row" spacing={4}>
                {links.map((link) => (
                  <NavLink
                    key={link.href}
                    href={link.href}
                    icon={link.icon}
                    isActive={location.pathname === link.href}
                  >
                    {link.label}
                  </NavLink>
                ))}
              </Stack>
            </Stack>

            <Stack direction="row" spacing={4} alignItems="center">
              <Text fontSize="sm" color="gray.500">
                Welcome, {user?.username}
              </Text>
              <Tooltip
                label={`Switch to ${
                  colorMode === "light" ? "dark" : "light"
                } mode`}
              >
                <IconButton
                  aria-label="Toggle color mode"
                  icon={
                    colorMode === "light" ? (
                      <Moon size={18} />
                    ) : (
                      <Sun size={18} />
                    )
                  }
                  onClick={toggleColorMode}
                  variant="ghost"
                  size="sm"
                />
              </Tooltip>
              <Button
                onClick={() => storeAction?.logout()}
                variant="ghost"
                leftIcon={<LogOut size={20} />}
                colorScheme="red"
              >
                Logout
              </Button>
            </Stack>
          </Flex>
        </Container>
      </Box>

      <Box as="main" pt={20}>
        <Container maxW="7xl" py={6}>
          {children}
        </Container>
      </Box>
    </Box>
  );
}

// const Navbar = () => {
//   const navigate = useNavigate();
//   const [showPopup, setShowPopup] = useState(false);
//   const location = useLocation();
//   const { colorMode, toggleColorMode } = useColorMode();
//   const bg = useColorModeValue("white", "gray.800");
//   const borderColor = useColorModeValue("gray.200", "gray.700");
//   const activeColor = useColorModeValue("brand.600", "brand.900");
//   const hoverBg = useColorModeValue("gray.100", "gray.700");

//   const handleNavigation = (path: string) => {
//     navigate(path);
//   };

//   const handleLogout = () => {
//     // Add your logout logic here
//     console.log("User logged out");
//   };

//   return (
//     <Flex p={4} mb={2} shadow={"md"} bg={"white"} alignItems={"center"}>
//       <Heading className="text-lg font-bold">RHS</Heading>
//       <Flex ml={"10"} flex={1} justifyContent={"space-between"}>
//         <HStack justifyContent={"start"} gap={8}>
//           {[
//             { name: "Dashboard", path: "/" },
//             { name: "Requests", path: "/requests" },
//             { name: "Inventory", path: "/inventory" },
//             { name: "Reports", path: "/reports" },
//           ].map((item, index) => (
//             <ChakraLink
//               key={index}
//               as={ReactRouterLink}
//               to={item.path}
//               color={location.pathname === item.path ? activeColor : undefined}
//               _hover={{ bg: hoverBg }}
//               fontSize={"lg"}
//               px={4}
//               py={2}
//               rounded="md"
//             >
//               {item.name}
//             </ChakraLink>
//           ))}
//         </HStack>
//         <HStack className="flex items-center space-x-4" position="relative">
//           <Avatar
//             size={"sm"}
//             src="https://bit.ly/broken-link"
//             cursor="pointer"
//             onClick={() => setShowPopup(!showPopup)}
//           />
//           {showPopup && (
//             <Box
//               position="absolute"
//               top="100%"
//               right={0}
//               mt={2}
//               p={2}
//               bg="white"
//               shadow="md"
//               borderRadius="md"
//               zIndex={1}
//             >
//               <ChakraLink
//                 as="button"
//                 onClick={handleLogout}
//                 _hover={{ textDecoration: "none", color: "black" }}
//                 textColor={"gray.600"}
//                 fontSize={"lg"}
//               >
//                 Logout
//               </ChakraLink>
//             </Box>
//           )}
//         </HStack>
//       </Flex>
//     </Flex>
//   );
// };

// export default Navbar;
