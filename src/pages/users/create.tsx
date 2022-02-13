import { Box, Button, Divider, Flex, Heading, HStack, SimpleGrid, VStack } from "@chakra-ui/react";
import Link from "next/link";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { Input } from "../../components/Form/Input";
import { Header } from "../../components/Header";
import { Sidebar } from "../../components/Sidebar";
import { SubmitHandler, useForm } from "react-hook-form";

type CreateUserFormData = {
  name: string;
  email: string;
  password: string;
  password_confirmation: string;
}

const createUserFormSchema = yup.object().shape({
  name: yup.string().required("nome obrigatório"),
  email: yup.string().required("E-mail obrigatório").email("E-mail inválido"),
  password: yup.string().required("senha obrigatória").min(6, "No mínimo 6 caracteres"),
  password_confirmation: yup.string().oneOf([null, yup.ref("password")], "As senhas precisam ser iguais")
});

export default function CreateUser() {

  const { register, handleSubmit, formState } = useForm({
    resolver: yupResolver(createUserFormSchema)
  });

  const handleCreateUser: SubmitHandler<CreateUserFormData> = async (value, event) => {
    await new Promise(resolve => setTimeout(resolve, 2000));
  }

  return (
    <Box>
      <Header />
      <Flex
        w="100%"
        my="6"
        maxWidth={1480}
        mx="auto"
        px="6"
      >
        <Sidebar />

        <Box 
          as="form" 
          flex="1" 
          borderRadius={8} 
          bg="gray.800" 
          p={["6", "8"]}
          onSubmit={handleSubmit(handleCreateUser)}
        >
          <Heading size="lg" fontWeight="normal">Criar usuário</Heading>

          <Divider my="6" borderColor="gray.700" />

          <VStack spacing="8">
              <SimpleGrid minChildWidth="240px" spacing={["6", "8"]} w="100%">
                <Input 
                  name="name" 
                  label="Nome completo" 
                  {...register("name")}  
                  error={formState.errors.name}
                />
                <Input 
                  name="email" 
                  label="E-mail" 
                  type="email" 
                  {...register("email")} 
                  error={formState.errors.email}
                />
              </SimpleGrid>

              <SimpleGrid minChildWidth="240px" spacing={["6", "8"]} w="100%">
                <Input 
                  name="password" 
                  label="Senha" 
                  type="password" 
                  {...register("password")}  
                  error={formState.errors.password} 
                />
                <Input 
                  name="password_confirmation" 
                  label="Confirmação da senha" 
                  type="password" 
                  {...register("password_confirmation")} 
                  error={formState.errors.password_confirmation}
                />
              </SimpleGrid>

          </VStack>

          <Flex mt="8" justify="flex-end">
            <HStack spacing="4">
              <Link href="/users" passHref>
                <Button colorScheme="whiteAlpha">Cancelar</Button>
              </Link>
              <Button type="submit" colorScheme="pink" isLoading={formState.isSubmitting}>Salvar</Button>
            </HStack>
          </Flex>

        </Box>
      </Flex>
    </Box>
  )
}