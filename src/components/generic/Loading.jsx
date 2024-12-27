/* eslint-disable no-unused-vars */
import { Box, Image } from "@chakra-ui/react";
import { keyframes } from "@emotion/react";
import React from "react";

const zoomInOutAnimation = keyframes`
  0% { transform: scale(1); }
  50% { transform: scale(1.2); }  // Zoom in (increase size)
  100% { transform: scale(1); }  // Zoom out (original size)
`;

const Loading = () => {
  return (
    <>
      <Box w="100vw" h="100vh" p="0.5rem">
        <Box
          position="fixed"
          zIndex="9999"
          top="0"
          left="0"
          w="100%"
          h="100%"
          backgroundColor="rgba(255, 255, 255, 0.5)"
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <Image
            src="./images/fb.png"
            alt="logo"
            w="80px"
            h="80px"
            animation={`${zoomInOutAnimation} 2s ease-in-out infinite`}
          />
        </Box>
      </Box>
    </>
  );
};

export default Loading;
