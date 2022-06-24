import {
    Button,
    FormControl,
    Flex,
    Heading,
    Input,
    Stack,
    Text,
    useColorModeValue, FormErrorMessage, FormHelperText,
} from '@chakra-ui/react';
import {useState} from "react";
import {useHistory} from "react-router-dom";
import userService from '../../../service/user.service';
import {authAction} from "../../../actions/auth.action";

export default function VerificationPage() {
    const [code, setCode] = useState('');
    const [err, setErr] = useState('');
    const history = useHistory();
    const verification = async () => {
        if (!code) {
            setErr("Code must node be blank");
            return;
        }
        try {
            await userService.verificationAccount(code);
            await authAction.getUserDetail();
            history.replace("/");
            window.location.reload();
        } catch (e) {
            setErr('Code is not valid');
            // setErr(e.response.data.message);
        }
    }
    return (
        <Flex
            minH={'100vh'}
            align={'center'}
            justify={'center'}
            bg={useColorModeValue('gray.50', 'gray.800')}>
            <Stack
                spacing={4}
                w={'full'}
                maxW={'md'}
                bg={useColorModeValue('white', 'gray.700')}
                rounded={'xl'}
                boxShadow={'lg'}
                p={6}
                my={12}>
                <Heading lineHeight={1.1} fontSize={{base: '2xl', md: '3xl'}}>
                    Verification Account
                </Heading>
                <Text
                    fontSize={{base: 'sm', sm: 'md'}}
                    color={useColorModeValue('gray.800', 'gray.400')}>
                    You&apos;ll get an code on your mail box
                </Text>
                <FormControl id="email">
                    <Input

                        isInvalid={err}
                        errorBorderColor={'red'}
                        value={code}
                        onChange={(e) => {
                            setCode(e.target.value)
                            setErr('')
                        }}
                        // placeholder="your-email@example.com"
                        _placeholder={{color: 'gray.500'}}
                        type="email"
                    />
                    {err && <FormHelperText color={'red'}>{err}</FormHelperText>}
                </FormControl>
                <Stack spacing={6}>
                    <Button
                        onClick={() => verification()}
                        bg={'blue.400'}
                        color={'white'}
                        _hover={{
                            bg: 'blue.500',
                        }}>
                        Verification Account
                    </Button>
                </Stack>
            </Stack>
        </Flex>
    );
}