import { Image, Input, HStack, Text, VStack } from "@chakra-ui/react";
import React from "react";
import { Button } from "../ui/button";
import { useUser } from "../../contexts/UserContext";

const StageThree = ({ handleFinish }) => {
  const { isLoading } = useUser();

  return (
    <>
      <VStack display={{ md: "flex", base: "none" }} px="16px">
        <HStack mb="1rem" w="100%" justifyContent="center">
          <Image
            src="/images/icons8-instagram-verification-badge-100.svg"
            alt="verify"
          />
        </HStack>

        <Text
          letterSpacing="0.2px"
          fontSize="28px"
          fontWeight="bold"
          lineHeight="24px"
          mb="0.7rem"
          w="100%"
          textAlign="center"
        >
          You're on the waitlist
        </Text>

        <Text
          w="100%"
          textAlign="center"
          mb="1.5rem"
          fontWeight="600"
          fontSize="1.2rem"
        >
          Thank you for completing the process. We'll let you know when your
          accreditation is available.
        </Text>

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
          onClick={handleFinish}
          disabled={isLoading}
        >
          Done
        </Button>
      </VStack>

      <VStack
        display={{ md: "none", base: "flex" }}
        w="100%"
        pt="3rem"
        px="0.5rem"
        alignItems="flex-start"
      >
        <HStack mb="2rem" w="100%" justifyContent="center">
          <Image
            src="/images/icons8-instagram-verification-badge-100.svg"
            alt="verify"
          />
        </HStack>

        <Text
          letterSpacing="0.2px"
          fontSize="28px"
          fontWeight="bold"
          lineHeight="24px"
          mb="0.7rem"
          w="100%"
          textAlign="center"
        >
          You're on the waitlist
        </Text>

        <Text
          w="100%"
          textAlign="center"
          mb="1rem"
          fontWeight="600"
          fontSize="1.2rem"
        >
          Thank you for completing the process. We'll let you know when your
          accreditation is available.
        </Text>

        <Button
          w="100%"
          h="44px"
          bg="rgb(0, 100, 224)"
          borderRadius="22px"
          border="0px solid rgb(28, 43, 51)"
          fontSize="16px"
          fontWeight="500"
          mt="2rem"
          onClick={handleFinish}
          disabled={isLoading}
        >
          Done
        </Button>
      </VStack>
    </>
  );
};

export default StageThree;
