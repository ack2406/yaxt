import { NavbarButtonProps } from "../../../types/Props";

const NavbarButton = ({ content, refLink, icon }: NavbarButtonProps) => {
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
