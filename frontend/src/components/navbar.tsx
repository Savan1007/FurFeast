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
  Button,
  Image,
} from "@chakra-ui/react";
import React from "react";
import { Link, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  Package,
  ClipboardList,
  BarChart,
  LogOut,
  Sun,
  Moon,
  Users,
} from "lucide-react";
import { useActions, useUser } from "../store/app-store";
import { Role } from "../utils/enums";
import { useLogout } from "../pages/auth/api/api";
import logo from "../assets/FurFeast-logo.png";
import darkLogo from "../assets/FurFeast-logo-dark.png";

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
  const logout = useLogout();

  const links = [
    { href: "/", label: "Dashboard", icon: <LayoutDashboard size={20} /> },
    ...(user?.roles[0].name === Role.SuperAdmin.toString() ||
    user?.roles[0].name === Role.Admin.toString()
      ? [
          {
            href: "/inventory",
            label: "Inventory",
            icon: <Package size={20} />,
          },
          {
            href: "/requests",
            label: "Requests",
            icon: <ClipboardList size={20} />,
          },
          { href: "/reports", label: "Reports", icon: <BarChart size={20} /> },
          { href: "/users", label: "Users", icon: <Users size={20} /> },
        ]
      : []),
  ];

  const handleLogout = () => {
    if (user?.id) {
      logout.mutate(user.id);
    }
    storeAction?.logout();
  };

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
                <HStack spacing={2} alignItems="center">
                <Image
                  boxSize="80px"
                  src={colorMode === "light" ? logo : darkLogo}
                  alt="FurFeast Logo"
                  borderRadius='full'
                  onClick={() => (window.location.href = "/")}
                />
                {/* <Text
                  fontSize="lg"
                  fontWeight="bold"
                  color={useColorModeValue("brand.600", "brand.300")}
                >
                  FurFeast
                </Text> */}
                </HStack>
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
                {user?.username}  (
                {(user?.roles[0]?.name ?? "").charAt(0).toUpperCase() +
                  (user?.roles[0]?.name ?? "").slice(1).toLowerCase()}
                )
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
                onClick={handleLogout}
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
