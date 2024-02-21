import { VStack } from "@chakra-ui/react";
import { ProfileIcon } from "../../icons/ProfileIcon";
import { ProgramsIcon } from "../../icons/ProgramsIcon";
import { SignoutIcon } from "../../icons/SignoutIcon";
import MenuItem from "../MenuItem/MenuItem";

const MenuBar = () => {
  return (
    <>
      <VStack bgColor="bg-color" alignItems="stretch" spacing={0}>
        <MenuItem navigateTo={"/"} icon={ProfileIcon} title="Profile" />
        <MenuItem
          navigateTo={"/programs"}
          icon={ProgramsIcon}
          title="Programs"
        />
        {/* {user?.role === "ADMIN" && (
          <MenuItem
            navigateTo={"/courses"}
            icon={CoursesIcon}
            title="Courses"
          />
        )} */}
        <MenuItem icon={SignoutIcon} title="Sign Out" />
      </VStack>
    </>
  );
};

export default MenuBar;
