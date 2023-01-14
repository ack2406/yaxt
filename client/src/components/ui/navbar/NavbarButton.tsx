import React from "react";
import { MenuItem, Link } from "@chakra-ui/react";
import { EditIcon } from "@chakra-ui/icons";
import { useColorModeValue } from "@chakra-ui/react";

interface INavbarButtonProps {
  content: string;
  refLink: string;
  icon: JSX.Element;
}

const NavbarButton = ({content, refLink, icon}: INavbarButtonProps) => {
  return (
    <MenuItem
      icon={icon}
      as={Link}
      href={refLink}

      
      _hover={{
        textDecoration: "none",
      }}
    >
      {content}
    </MenuItem>
  );
};

export default NavbarButton;
