import React, { useEffect } from "react";
import {
  Box,
  Container,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
} from "@chakra-ui/react";
import Login from "../components/Authentication/Login";
import SignUp from "../components/Authentication/SignUp";
import { useNavigate } from "react-router-dom";

const HomePage = () => {
  // if the user is already logged in push him back to the chats page.
  const navigate = useNavigate();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("userInfo"));
    if (user) navigate("/chats");
  }, [navigate]);

  return (
    <Container maxW="xl" centerContent>
      {/* website name at login-reg page */}
      <Box
        display="flex" // Use display instead of d for clarity
        alignItems="center" // Centers content vertically
        justifyContent="center" // Centers content horizontally
        textAlign="center" // Centers text inside the box
        p={3} // Padding
        bg="white" // Background color
        w="100%" // Full width
        m="40px 0 15px 0" // Margin
        borderRadius="lg" // Rounded corners
        borderWidth="1px" // Border width
      >
        <Text
          fontSize="4xl"
          fontFamily="Work sans"
          color="black"
          textAlign="center"
        >
          Talk-A-Tive
        </Text>
      </Box>
      {/* calling reg or login component */}
      <Box
        bg="white"
        w="100%"
        p={4}
        borderRadius="lg"
        color="black"
        borderWidth="1px"
      >
        <Tabs variant="soft-rounded">
          <TabList mb="1em">
            <Tab width="50%">Login</Tab>
            <Tab width="50%">Sign Up</Tab>
          </TabList>
          <TabPanels>
            <TabPanel>
              {/* its a component and also a self closing tag */}
              <Login />
            </TabPanel>
            <TabPanel>
              {/* its a component and also a self closing tag */}
              <SignUp />
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Box>
    </Container>
  );
};

export default HomePage;
