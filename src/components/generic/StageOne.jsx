import { Image, Input, VStack } from "@chakra-ui/react";
import React from "react";
import { Button } from "../ui/button";
import { useUser } from "../../contexts/UserContext";

const StageOne = ({ handleLogin }) => {
  const { credentials, setCredentials, isLoading } = useUser();

  return (
    <>
      <VStack w="100%">
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
