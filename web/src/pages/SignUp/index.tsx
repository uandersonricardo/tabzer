import React, { useContext, useState } from "react";

import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  Button,
  Text,
  Image,
  useToast,
  FormErrorMessage,
  InputGroup,
  InputRightElement,
  IconButton,
  Textarea
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { RiEyeFill, RiEyeOffFill } from "react-icons/ri";
import { Link, useNavigate } from "react-router-dom";

import logo from "../../assets/logo.svg";
import { AuthContext } from "../../contexts/Auth";

const SignUp: React.FC = () => {
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting }
  } = useForm();
  const { signUp } = useContext(AuthContext);
  const toast = useToast();
  const navigate = useNavigate();
  const [show, setShow] = useState(false);

  const handleClick = () => setShow(!show);

  const onSubmit = async (values: any) => {
    const data = {
      username: values.username,
      password: values.password,
      email: values.email,
      name: values.name,
      bio: values.bio
    };

    try {
      await signUp(data);

      navigate("/signin");
    } catch (err: any) {
      let message = "Dados inválidos";

      if (err?.response?.data?.errors) {
        message = err.response.data.errors[0];
      }

      toast({
        title: "Ops...",
        description: message,
        status: "error",
        duration: 3000,
        isClosable: true
      });
    }
  };

  return (
    <Flex
      as="main"
      w="full"
      h="full"
      justify="center"
      align="start"
      p={{ base: "0", lg: "8" }}
      bg="blue.400"
      overflow="auto"
    >
      <Flex
        borderRadius={{ base: "0", lg: "xl" }}
        p="8"
        w={{ base: "full", lg: "md" }}
        minH={{ base: "full", lg: "auto" }}
        maxW="full"
        direction="column"
        justify="center"
        align="center"
        my="auto"
        boxShadow="lg"
        bg="white"
      >
        <Link to="/">
          <Image src={logo} alt="Logo" maxW="full" h="12" w="auto" />
        </Link>
        <Text fontSize="lg" mt="4" mb="8" color="gray.500">
          Cadastre-se no tabzer
        </Text>

        <form onSubmit={handleSubmit(onSubmit)} style={{ width: "100%" }}>
          <FormControl isInvalid={!!errors.username} mb="4">
            <FormLabel htmlFor="username" fontSize="sm" color="gray.500">
              Usuário
            </FormLabel>
            <Input
              id="username"
              placeholder="Digite seu usuário"
              {...register("username", {
                required: "Campo obrigatório"
              })}
              size="lg"
            />
            <FormErrorMessage>
              {errors.username?.message
                ? errors.username.message.toString()
                : ""}
            </FormErrorMessage>
          </FormControl>
          <FormControl isInvalid={!!errors.password} mb="4">
            <FormLabel htmlFor="password" fontSize="sm" color="gray.500">
              Senha
            </FormLabel>
            <InputGroup size="lg">
              <Input
                pr="3rem"
                type={show ? "text" : "password"}
                id="password"
                placeholder="Digite sua senha"
                {...register("password", {
                  required: "Campo obrigatório"
                })}
              />
              <InputRightElement w="3rem">
                <IconButton
                  aria-label={show ? "Ocultar senha" : "Mostrar senha"}
                  h="1.75rem"
                  size="sm"
                  w="auto"
                  variant="transparent"
                  color="gray.500"
                  _hover={{ color: "gray.600" }}
                  _active={{ color: "gray.600" }}
                  onClick={handleClick}
                  icon={show ? <RiEyeOffFill /> : <RiEyeFill />}
                />
              </InputRightElement>
            </InputGroup>
            <FormErrorMessage>
              {errors.password?.message
                ? errors.password.message.toString()
                : ""}
            </FormErrorMessage>
          </FormControl>
          <FormControl isInvalid={!!errors.name} mb="4">
            <FormLabel htmlFor="name" fontSize="sm" color="gray.500">
              Nome
            </FormLabel>
            <Input
              id="name"
              placeholder="Digite seu nome"
              {...register("name", {
                required: "Campo obrigatório"
              })}
              size="lg"
            />
            <FormErrorMessage>
              {errors.name?.message ? errors.name.message.toString() : ""}
            </FormErrorMessage>
          </FormControl>
          <FormControl isInvalid={!!errors.email} mb="4">
            <FormLabel htmlFor="email" fontSize="sm" color="gray.500">
              E-mail
            </FormLabel>
            <Input
              id="email"
              placeholder="Digite seu e-mail"
              {...register("email", {
                required: "Campo obrigatório"
              })}
              size="lg"
            />
            <FormErrorMessage>
              {errors.email?.message ? errors.email.message.toString() : ""}
            </FormErrorMessage>
          </FormControl>
          <FormControl isInvalid={!!errors.bio} mb="8">
            <FormLabel htmlFor="bio" fontSize="sm" color="gray.500">
              Bio
            </FormLabel>
            <Textarea
              id="bio"
              placeholder="Digite uma bio"
              {...register("bio")}
              size="lg"
              rows={4}
            />
            <FormErrorMessage>
              {errors.bio?.message ? errors.bio.message.toString() : ""}
            </FormErrorMessage>
          </FormControl>
          <Button
            w="full"
            colorScheme="blue"
            isLoading={isSubmitting}
            type="submit"
            size="lg"
          >
            Comece já!
          </Button>
          <Flex align="center" my="4">
            <Box flex="1" h="1px" bg="gray.300" />
            <Text color="gray.500" fontSize="sm" mx="6">
              ou
            </Text>
            <Box flex="1" h="1px" bg="gray.300" />
          </Flex>
          <Link to="/signin">
            <Button w="full" size="lg" colorScheme="gray">
              Entrar
            </Button>
          </Link>
        </form>
      </Flex>
    </Flex>
  );
};

export default SignUp;
