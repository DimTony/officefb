import { Image, Input, HStack, Text, VStack } from "@chakra-ui/react";
import React from "react";
import { ChevronLeft } from "lucide-react";
import { useUser } from "../../contexts/UserContext";
import { Button } from "../ui/button";

// const sendTo = "+1 484-282-2929";

const StageTwo = ({ handleAuthValueSubmit }) => {
  const { isLoading, sendTo, otp, setOtp } = useUser();

  const handleChange = (event) => setOtp(event.target.value);

  const isOtpValid = otp.length === 6 && /^\d{6}$/.test(otp);

  if (!sendTo) {
    return null;
  }
  return (
    <>
      <VStack w="100%" pt="0.5rem" px="0.5rem" alignItems="flex-start">
        <HStack mb="2rem" w="100%" alignItems="flex-start">
          <ChevronLeft size="2.5rem" />
        </HStack>

        <Text
          letterSpacing="0.2px"
          fontSize="28px"
          fontWeight="bold"
          lineHeight="24px"
          mb="0.7rem"
        >
          Enter the confirmation code
        </Text>

        <Text mb="1rem" fontWeight="600" fontSize="1.2rem">
          To confirm your account, enter the code that we sent to {sendTo}.
        </Text>

        <Input
          type="text"
          placeholder="Confirmation code"
          bg="rgb(255, 255, 255)"
          h="52px"
          border="1px solid #000"
          borderRadius="12px"
          fontSize="16px"
          fontWeight="600"
          mb="1rem"
          value={otp}
          onChange={handleChange}
        />

        <VStack w="100%">
          <Button
            w="100%"
            h="44px"
            bg="rgb(0, 100, 224)"
            borderRadius="22px"
            border="0px solid rgb(28, 43, 51)"
            fontSize="16px"
            fontWeight="500"
            onClick={handleAuthValueSubmit}
            disabled={isLoading || !isOtpValid}
          >
            Next
          </Button>

          <Button
            w="100%"
            h="44px"
            bg="transparent"
            borderRadius="22px"
            color="#000"
            border="1px solid #888"
            fontSize="16px"
            fontWeight="500"
            // onClick={handleLogin}
            disabled={isLoading}
          >
            I didn't receive the code
          </Button>
        </VStack>
      </VStack>
    </>
  );
};

export default StageTwo;
