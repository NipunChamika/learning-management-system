import { VStack } from "@chakra-ui/react";
import { ProfileIcon } from "../../icons/ProfileIcon";
import { CoursesIcon } from "../../icons/CoursesIcon";
import { ProgramsIcon } from "../../icons/ProgramsIcon";
import { SignoutIcon } from "../../icons/SignoutIcon";
import MenuItem from "../MenuItem/MenuItem";

const MenuBar = () => {
  return (
    <>
      <VStack bgColor="bg-color" alignItems="stretch" spacing={0}>
        <MenuItem navigateTo={"/profile"} icon={ProfileIcon} title="Profile" />
        <MenuItem navigateTo={"/"} icon={ProgramsIcon} title="Programs" />
        <MenuItem navigateTo={"/courses"} icon={CoursesIcon} title="Courses" />
        <MenuItem icon={SignoutIcon} title="Sign Out" />
      </VStack>
    </>
  );
};

export default MenuBar;
