import {
    Flex,
    Box,
    FormControl,
    FormLabel,
    Input,
    InputGroup,
    HStack,
    InputRightElement,
    Stack,
    Button,
    Heading,
    Text,
    useColorModeValue,
    Link, Spinner, FormHelperText,
} from '@chakra-ui/react';
import {useState} from 'react';
import {ViewIcon, ViewOffIcon} from '@chakra-ui/icons';
import {useHistory} from "react-router-dom";
import appService from "../../../service/app.service";
import registrationReducer from "../../../reducers/registration.reducer";
import userService from '../../../service/user.service';
import {authAction} from "../../../actions/auth.action";

export default function Register() {
    const history = useHistory();
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setLoading] = useState(false);
    const [error, setError] = useState({type: '', message: ''});
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [phone, setPhone] = useState('');
    const validationInput = async (input, value) => {
        if (!value) {
            setError({
                type: input,
                message: `${input} must not be blank`
            })
        }
        if (value && input) {
            try {
                const resp = await appService.validationInputField(input, value);
            } catch (e) {
                if (e.message) {
                    setError({
                        type: input,
                        message: e.message
                    })
                }
            }
        }
    }

    const handleSignUp = async () => {
        if (phone && email && password) {
            setLoading(true);
            try {
                await userService.registration(phone, email, password);
                history.push('/verification');
            } catch (e) {
                setLoading(false);
                setError({type: email, message: 'Something went wrong please try again!'});
            }
        }
    }
    return (
        <Flex
            minH={"100vh"}
            align={"center"}
            justify={"center"}
            bg={useColorModeValue("gray.50", "gray.800")}>
            {isLoading && <>
                <Box bg={'gray.200'} zIndex={'1000000000000'} opacity={.2} position={'fixed'} w={'100vw'}
                     h={'100vh'}/>
                <Spinner
                    top="50%"
                    right="50%"
                    position="fixed"
                    zIndex="1000000000001"
                    color="green"
                />
            </>}
            <Stack spacing={8} mx={"auto"} maxW={"lg"} py={12} px={6}>
                <Stack
                    align={'center'}>
                    <Heading fontSize={'4xl'} textAlign={'center'}>
                        Sign up
                    </Heading>
                    <Text fontSize={'lg'} color={'gray.600'}>
                        to enjoy all of our cool features ✌️
                    </Text>
                </Stack>
                <Box
                    minW={'400'}
                    rounded={"lg"}
                    bg={useColorModeValue("white", "gray.700")}
                    boxShadow={"lg"}
                    p={8}>
                    <Stack spacing={4}>
                        <HStack>
                            <FormControl id="phone" isRequired>
                                <FormLabel>Phone</FormLabel>
                                <Input
                                    onBlur={() => validationInput('phone', phone)}

                                    value={phone}
                                    onChange={e => {
                                        setPhone(e.target.value);
                                        setError({});
                                    }}
                                    type="text"/>
                                {error && error.type === 'phone' &&
                                <FormHelperText color={'crimson'}>{error.message}</FormHelperText>}
                            </FormControl>
                        </HStack>
                        <FormControl id="email" isRequired>
                            <FormLabel>Email address</FormLabel>
                            <Input
                                value={email}
                                onChange={e => {
                                    setEmail(e.target.value);
                                    setError({});

                                }}
                                onBlur={() => validationInput('email', email)}
                                type="email"/>
                            {error && error.type === 'email' &&
                            <FormHelperText color={'crimson'}>{error.message}</FormHelperText>}
                        </FormControl>
                        <FormControl id="password" isRequired>
                            <FormLabel>Password</FormLabel>
                            <InputGroup>
                                <Input
                                    value={password}
                                    onChange={e => {
                                        setPassword(e.target.value);
                                        setError({})
                                    }}
                                    onBlur={() => validationInput('password', email)}

                                    type={showPassword ? 'text' : 'password'}/>
                                <InputRightElement h={'full'}>
                                    <Button
                                        variant={'ghost'}
                                        onClick={() =>
                                            setShowPassword((showPassword) => !showPassword)
                                        }>
                                        {showPassword ? <ViewIcon/> : <ViewOffIcon/>}
                                    </Button>
                                </InputRightElement>
                            </InputGroup>
                            {error && error.type === 'password' &&
                            <FormHelperText color={'crimson'}>{error.message}</FormHelperText>}
                        </FormControl>
                        <Stack spacing={10} pt={2}>
                            <Button
                                onClick={handleSignUp}
                                loadingText="Submitting"
                                size="lg"
                                bg={'blue.400'}
                                color={'white'}
                                _hover={{
                                    bg: 'blue.500',
                                }}>

                                Sign up
                            </Button>
                        </Stack>
                        <Stack pt={6}>
                            <Text align={'center'}>
                                Already a user? <Link onClick={() => history.push('/login')}
                                                      color={'blue.400'}>Login</Link>
                            </Text>
                        </Stack>
                    </Stack>
                </Box>
            </Stack>
        </Flex>
    );
}