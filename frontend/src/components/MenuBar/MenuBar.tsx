import { VStack } from "@chakra-ui/react";
import { ProfileIcon } from "../../icons/ProfileIcon";
import { CoursesIcon } from "../../icons/CoursesIcon";
import { ProgramsIcon } from "../../icons/ProgramsIcon";
import { SignoutIcon } from "../../icons/SignoutIcon";
import MenuItem from "../MenuItem/MenuItem";
import { useUserContext } from "../../context/UserContext";

const MenuBar = () => {
  const { user } = useUserContext();

  return (
    <>
      <VStack bgColor="bg-color" alignItems="stretch" spacing={0}>
        <MenuItem navigateTo={"/"} icon={ProfileIcon} title="Profile" />
        <MenuItem
          navigateTo={"/programs"}
          icon={ProgramsIcon}
          title="Programs"
        />
        {user?.role === "ADMIN" && (
          <MenuItem
            navigateTo={"/courses"}
            icon={CoursesIcon}
            title="Courses"
          />
        )}
        <MenuItem icon={SignoutIcon} title="Sign Out" />
      </VStack>
    </>
  );
};

export default MenuBar;
