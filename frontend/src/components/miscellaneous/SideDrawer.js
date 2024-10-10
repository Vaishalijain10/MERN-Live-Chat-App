import React from "react";
import { Button } from "@chakra-ui/button";
import { useDisclosure } from "@chakra-ui/hooks";
import { Input } from "@chakra-ui/input";
import { Box, Text } from "@chakra-ui/layout";
import {
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
} from "@chakra-ui/menu";
import {
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
} from "@chakra-ui/modal";
import { Tooltip } from "@chakra-ui/tooltip";
import { BellIcon, ChevronDownIcon } from "@chakra-ui/icons";
import { Avatar } from "@chakra-ui/avatar";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import ChatLoading from "../ChatLoading";
import { Spinner } from "@chakra-ui/spinner";
import ProfileModal from "./ProfileModal";
import { getSender } from "../../config/ChatLogics";
import UserListItem from "../UserAvatar/UserListItem";
import { ChatState } from "../../Context/ChatProvider";
import { ToastContainer, toast } from "react-toastify"; // react-toastify import
import "react-toastify/dist/ReactToastify.css"; // react-toastify styles
import { Badge } from "@chakra-ui/react"; // Import Badge component

function SideDrawer() {
  const [search, setSearch] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadingChat, setLoadingChat] = useState(false);
  const { setSelectedChat, user, chats, setChats } = ChatState();
  const { notification, setNotification } = ChatState();

  const { isOpen, onOpen, onClose } = useDisclosure();
  const navigate = useNavigate();

  // Logout feature
  const logoutHandler = () => {
    localStorage.removeItem("userInfo");
    navigate("/");
    window.location.reload();
  };

  // Search to new chat
  const handleSearch = async () => {
    if (!search) {
      toast.warn("Please Enter something in search", {
        position: "top-left",
        autoClose: 5000,
      });
      return;
    }

    try {
      setLoading(true);

      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };

      const { data } = await axios.get(`/api/user?search=${search}`, config);

      setLoading(false);
      setSearchResult(data);
    } catch (error) {
      toast.error("Failed to Load the Search Results", {
        position: "bottom-left",
        autoClose: 5000,
      });
    }
  };

  // Access chat
  const accessChat = async (userId) => {
    console.log(userId);

    try {
      setLoadingChat(true);
      const config = {
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
      };
      const { data } = await axios.post(`/api/chat`, { userId }, config);

      if (!chats.find((c) => c._id === data._id)) setChats([data, ...chats]);
      setSelectedChat(data);
      setLoadingChat(false);
      onClose();
      toast.success("Chat accessed successfully!", {
        position: "bottom-left",
        autoClose: 5000,
      });
    } catch (error) {
      toast.error("Error fetching the chat", {
        position: "bottom-left",
        autoClose: 5000,
      });
    }
  };

  return (
    <>
      <Box
        display="flex"
        alignItems="center"
        bg="white"
        w="100%"
        p={{ base: "2px", md: "5px" }} // Responsive padding
        borderWidth="0px"
      >
        <Text
          fontSize={{ base: "xl", md: "2xl"}}
          fontFamily="Work sans"
          ml={2}
        >
          Talk-A-Tive
        </Text>

        <Tooltip
          label="Search Users to chat"
          hasArrow
          placement="bottom-end"
          mx="auto"
        >
          <Button
            variant="ghost"
            onClick={onOpen}
            mx="auto"
            px={{ base: "40px", md: "80px" }} // Responsive padding
            border="1px gray solid"
            fontSize={{ base: "sm", md: "md" }} // Responsive font size
          >
            <i className="fas fa-search"></i>
            <Text display={{ base: "none", md: "flex" }} px={4}>
              Search User
            </Text>
          </Button>
        </Tooltip>

        <Box display="flex" alignItems="center" ml="auto">
          <Menu>
            <MenuButton p={4} position="relative">
              <BellIcon fontSize="2xl" m={1} />
              {notification.length > 0 && (
                <Badge
                  colorScheme="red"
                  borderRadius="full"
                  position="absolute"
                  top="2"
                  right="3"
                  fontSize="0.8em"
                  variant="solid"
                  px={1}
                >
                  {notification.length}
                </Badge>
              )}
            </MenuButton>
            <MenuList pl={2} textAlign="center">
              {notification.length
                ? notification.map((notif) => (
                    <MenuItem
                      key={notif._id}
                      onClick={() => {
                        setSelectedChat(notif.chat);
                        setNotification(
                          notification.filter((n) => n !== notif)
                        );
                      }}
                    >
                      {notif.chat.isGroupChat
                        ? `New Message in ${notif.chat.chatName}`
                        : `New Message from ${getSender(
                            user,
                            notif.chat.users
                          )}`}
                    </MenuItem>
                  ))
                : "No New Messages"}
            </MenuList>
          </Menu>
          <Menu>
            <MenuButton as={Button} bg="white" rightIcon={<ChevronDownIcon />}>
              <Avatar
                size="sm"
                cursor="pointer"
                name={user.name}
                src={user.pic}
              />
            </MenuButton>
            <MenuList>
              <ProfileModal user={user}>
                <MenuItem>My Profile</MenuItem>
              </ProfileModal>
              <MenuDivider />
              <MenuItem onClick={logoutHandler}>Logout</MenuItem>
            </MenuList>
          </Menu>
        </Box>
      </Box>

      {/* Search for new user */}
      <Drawer placement="left" onClose={onClose} isOpen={isOpen}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerHeader borderBottomWidth="1px">Search Users</DrawerHeader>
          <DrawerBody>
            <Box display="flex" pb={2}>
              <Input
                placeholder="Search by name or email"
                mr={2}
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                size={{ base: "sm", md: "md" }} // Responsive input size
              />
              <Button onClick={handleSearch} size={{ base: "sm", md: "md" }}>
                Go
              </Button>
            </Box>
            {loading ? (
              <ChatLoading />
            ) : (
              searchResult?.map((user) => (
                <UserListItem
                  key={user._id}
                  user={user}
                  handleFunction={() => accessChat(user._id)}
                />
              ))
            )}
            {loadingChat && <Spinner ml="auto" display="flex" />}
          </DrawerBody>
        </DrawerContent>
      </Drawer>

      <ToastContainer />
    </>
  );
}

export default SideDrawer;
