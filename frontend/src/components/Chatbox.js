import { Box } from "@chakra-ui/layout";
import "./styles.css";
import SingleChat from "./SingleChat";
import { ChatState } from "../Context/ChatProvider";

const Chatbox = ({ fetchAgain, setFetchAgain }) => {
  const { selectedChat } = ChatState();

  return (
    <Box
      display={{ base: selectedChat ? "flex" : "none", md: "flex" }} // Responsive display based on selected chat
      alignItems="flex-start" // Align items to the start for better layout
      flexDir="column" // Maintain column direction
      p={{ base: "3", sm: "4", md: "5", lg: "6" }} // Responsive padding
      bg="white"
      w={{
        base: "100%",
        sm: "100%",
        md: "100%",
        lg: "100%",
        xl: "100%",
        "2xl": "100%",
      }} // Responsive width
      borderRadius="lg"
      borderWidth="1px"
      boxShadow={{ base: "none", md: "md" }} // Add shadow for larger screens
    >
      <SingleChat fetchAgain={fetchAgain} setFetchAgain={setFetchAgain} />
    </Box>
  );
};

export default Chatbox;
