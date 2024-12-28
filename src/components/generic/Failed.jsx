import { Button, Image, Text, VStack } from "@chakra-ui/react";
import React from "react";
import { useUser } from "../../contexts/UserContext";

const Failed = ({ handleFinish }) => {
  const { isLoading } = useUser();
  return (
    <>
      <VStack display={{ md: "none", base: "flex" }} w="100%">
        <Image
          src="./images/warn.png"
          alt="fb"
          mt="7.5rem"
          mb="2rem"
          w="100px"
          h="100px"
        />

        <Text
          letterSpacing="0.2px"
          fontSize="28px"
          fontWeight="bold"
          lineHeight="24px"
          mb="0.7rem"
          w="100%"
          textAlign="center"
        >
          This feature isn't available
        </Text>

        <Text
          w="100%"
          textAlign="center"
          mb="1rem"
          fontWeight="600"
          fontSize="1.2rem"
        >
          The feature may have been deactivated, or above your account status.
          Check to see if the feature is compatible with your account.
        </Text>

        <Button
          w="100%"
          h="50px"
          bg="rgb(0, 100, 224)"
          borderRadius="22px"
          border="0px solid rgb(28, 43, 51)"
          fontSize="16px"
          fontWeight="500"
          mt="2rem"
          onClick={handleFinish}
          disabled={isLoading}
        >
          Go to Accounts Center
        </Button>
      </VStack>
    </>
  );
};

export default Failed;