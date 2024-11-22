import { Box } from "@/components/ui/box";
import { Button, ButtonText } from "@/components/ui/button";
import { Center } from "@/components/ui/center";
import { Heading } from "@/components/ui/heading";
import { Input, InputField } from "@/components/ui/input";
import { VStack } from "@/components/ui/vstack";
// import { Text, View } from "react-native";

export default function Index() {
  return (
    <Center>
      <Heading>Welcome to HearthStone QuizGame!</Heading>
      
      <Input variant="outline" size="md" isDisabled={false} isInvalid={false} isReadOnly={false} >
          <InputField
            placeholder='Enter email here...'
          />
      </Input>

      <Input variant="outline" size="md" isDisabled={false} isInvalid={false} isReadOnly={false} >
          <InputField
            placeholder='Enter password here...'
          />
      </Input>
      
      <Button size="lg">
        <ButtonText>Login</ButtonText>
      </Button>

      <Button size="md">
        <ButtonText>Sign up</ButtonText>
      </Button>
    </Center>
  );
}
