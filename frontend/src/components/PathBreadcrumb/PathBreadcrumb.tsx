import { ChevronRightIcon } from "@chakra-ui/icons";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink } from "@chakra-ui/react";
import { Link } from "react-router-dom";

type Path = {
  pathName: string;
  pathTo: string;
  isCurrentPage?: boolean;
};

interface Props {
  paths: Path[];
}

const PathBreadcrumb = ({ paths }: Props) => {
  return (
    <>
      <Breadcrumb
        spacing="8px"
        alignSelf="self-start"
        color="low-text-color"
        separator={<ChevronRightIcon />}
      >
        {paths.map((path, i) => (
          <BreadcrumbItem key={i} isCurrentPage={path.isCurrentPage}>
            {path.isCurrentPage ? (
              <BreadcrumbLink>{path.pathName}</BreadcrumbLink>
            ) : (
              <BreadcrumbLink as={Link} to={path.pathTo}>
                {path.pathName}
              </BreadcrumbLink>
            )}
          </BreadcrumbItem>
        ))}
      </Breadcrumb>
    </>
  );
};

export default PathBreadcrumb;
