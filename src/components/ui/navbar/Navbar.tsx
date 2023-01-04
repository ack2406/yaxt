import React from "react";
import {
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuItemOption,
  MenuGroup,
  MenuOptionGroup,
  MenuDivider,
  Button,
} from "@chakra-ui/react";
import {
  AddIcon,
  ChevronDownIcon,
  HamburgerIcon,
  SettingsIcon,
} from "@chakra-ui/icons";

import { Flex, Box } from "@chakra-ui/react";
import { ButtonGroup } from "@chakra-ui/react";
import { Heading } from "@chakra-ui/react";
import { Spacer } from "@chakra-ui/react";
import { isButtonElement } from "react-router-dom/dist/dom";
import { useColorModeValue } from "@chakra-ui/react";
import { IconButton } from "@chakra-ui/react";
import { ExternalLinkIcon } from "@chakra-ui/icons";
import { RepeatIcon } from "@chakra-ui/icons";
import { EditIcon } from "@chakra-ui/icons";
import { Link } from "@chakra-ui/react";
import NavbarButton from "./NavbarButton";
import { useColorMode } from "@chakra-ui/react";
import { MoonIcon } from "@chakra-ui/icons";
import { SunIcon } from "@chakra-ui/icons";

import { FaGithub } from "react-icons/fa";

const Navbar = () => {
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <>
      <Box h={16} my="5" />
      <Flex
        as="header"
        h={16}
        alignItems={"center"}
        justifyContent={"space-between"}
        bg={useColorModeValue("gray.100", "gray.700")}
        borderWidth={1}
        borderColor={useColorModeValue("gray.300", "gray.600")}
        px={4}
        position="fixed"
        top="0"
        w="100%"
        zIndex="100"
        gap="2"
        boxShadow={"sm"}
      >
        <Heading
          size={["sm", "lg"]}
          as={Link}
          href="/"
          _hover={{
            textDecoration: "none",
            color: useColorModeValue("gray.500", "gray.400"),
          }}
        >
          Yet Another Exam Tester
        </Heading>
        <Spacer />

        <Button onClick={toggleColorMode}>
          {colorMode === "light" ? <MoonIcon /> : <SunIcon />}
        </Button>
        <Menu>
          <MenuButton
            as={IconButton}
            aria-label="Options"
            icon={<HamburgerIcon />}
            variant="outline"
          />
          <MenuList>
            <NavbarButton
              content="Dodaj Test"
              refLink="/add-test/"
              icon={<AddIcon />}
            />
            <NavbarButton
              content="Edytuj Testy"
              refLink="/edit-tests/"
              icon={<EditIcon />}
            />
            <NavbarButton
              content="Ustawienia"
              refLink="/settings/"
              icon={<SettingsIcon />}
            />
            <NavbarButton
              content="GitHub"
              refLink="https://github.com/ack2406/yaxt"
              icon={<FaGithub />}
            />
          </MenuList>
        </Menu>
      </Flex>
    </>
  );
};

export default Navbar;
