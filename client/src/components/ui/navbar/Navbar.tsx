import { AddIcon, HamburgerIcon, SettingsIcon } from "@chakra-ui/icons";
import { Menu, MenuButton, MenuList } from "@chakra-ui/react";

import { Box, Flex, Heading, IconButton, Link } from "@chakra-ui/react";
import NavbarButton from "./NavbarButton";

import { FaGithub } from "react-icons/fa";

const Navbar = () => {
  return (
    <>
      <Box h={24} />
      <Flex
        as="header"
        alignItems="center"
        justifyContent="space-between"
        h={16}
        px={4}
        bg="gray.700"
        borderBottomWidth={1}
        borderBottomColor="whiteAlpha.300"
        position="fixed"
        top="0"
        w="100%"
        zIndex="100"
      >
        <Heading
          size={["sm", "lg"]}
          as={Link}
          href="/"
          _hover={{
            textDecoration: "none",
            color: { base: "gray.600", md: "gray.500" },
          }}
        >
          Yet Another Exam Tester
        </Heading>

        <Menu>
          <MenuButton
            as={IconButton}
            aria-label="Options"
            icon={<HamburgerIcon />}
            variant="outline"
          />
          <MenuList>
            {localStorage.getItem("token") ? (
              <NavbarButton
                content="Dodaj Test"
                refLink="/add-test/"
                icon={<AddIcon />}
              />
            ) : null}
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
