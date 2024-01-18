import { Box, Grid, GridItem, Show } from "@chakra-ui/react";
import MenuBar from "../../components/MenuBar/MenuBar";
import Profile from "../Profile/Profile";

const Home = () => {
  return (
    <>
      <Grid
        templateAreas={{
          base: `"main"`,
          lg: `"aside main"`,
        }}
        templateColumns={{
          base: "1fr",
          lg: "250px 1fr",
        }}
      >
        <Show above="lg">
          <GridItem area="aside" paddingX={5}>
            <MenuBar />
          </GridItem>
        </Show>
        <GridItem area="main">
          <Box paddingLeft={2}>
            <Profile />
          </Box>
        </GridItem>
      </Grid>
    </>
  );
};

export default Home;
