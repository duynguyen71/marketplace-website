import {
    Flex,
    Box,
    FormControl,
    FormLabel,
    Input,
    Checkbox,
    Stack,
    Link,
    Button,
    Heading,
    Text,
    useColorModeValue, FormHelperText, Divider, HStack, VStack,
} from "@chakra-ui/react";
import {useState} from "react";
import {authAction} from "../../../actions/auth.action";
import {useSelector} from "react-redux";
import history from "../../../helper/history";
import applicationReducer from "../../../reducers/app.reducer";
import {store} from "../../../index";
import {applicationAction} from "../../../actions/applicationAction";

export default function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [remember, setRemember] = useState(true);
    const [error, setError] = useState('');
    //get redirect url
    const {redirectUrl} = useSelector(state => state.applicationReducer);

    const handleLogin = async (e) => {
        e.preventDefault();
        //username and password not blank
        if (!username) {
            setError('Username must not be blank');
            return;
        }
        if (!password) {
            setError('Password must not be blank');
            return;
        }
        try {
            await authAction.login(username, password);
            if (redirectUrl) {
                history.replace(redirectUrl);
                applicationAction.clearRedirectPath();
                return;
            } else {
                history.replace('/');
            }
            return;
        } catch (e) {
            console.log(e);
            setError('Username or password is not correct!');
        }

    }

    return (
        <Flex
            minH={"100vh"}
            align={"center"}
            justify={"center"}
            bg={useColorModeValue("gray.50", "gray.800")}
        >

            <Stack spacing={8} mx={"auto"} maxW={"lg"} py={12} px={6}>
                <Stack align={"center"}>
                    <Heading fontSize={"4xl"}>Sign in to your account</Heading>
                    <Text fontSize={"lg"} color={"gray.600"}>
                        to enjoy all of our cool{" "}
                        <Link color={"blue.400"}>features</Link> ✌️
                    </Text>
                </Stack>
                <Box
                    rounded={"lg"}
                    bg={useColorModeValue("white", "gray.700")}
                    boxShadow={"lg"}
                    p={8}
                >
                    {/*Form*/}
                    <Stack spacing={4}>
                        {/*Email*/}
                        <FormControl id="email">
                            <FormLabel>Email address</FormLabel>
                            <Input
                                value={username}
                                isInvalid={error}
                                errorBorderColor="crimson"
                                onChange={(e) => {
                                    setError('');
                                    setUsername(e.target.value);
                                }}
                                type='email|text'/>
                            {error &&
                            <FormHelperText color={'crimson'}>{error}</FormHelperText>}
                        </FormControl>
                        {/*Password*/}
                        <FormControl id="password">
                            <FormLabel>Password</FormLabel>
                            <Input
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                type="password"/>
                        </FormControl>
                        <Stack>
                            <Stack
                                direction={{base: "column", sm: "row"}}
                                align={"start"}
                                justify={"space-between"}
                            >
                                {/*Remember me*/}

                                <Checkbox
                                    defaultChecked
                                    value={remember}
                                    onChange={(e) => {
                                        setRemember(e.target.checked);
                                    }}>
                                    Remember me
                                </Checkbox>
                                <Link color={"blue.400"}>Forgot password?</Link>
                            </Stack>
                            <Box minH={10}></Box>
                            <Button
                                disabled={
                                    (username.length === 0 || password.length === 0)
                                }
                                bg={"blue.400"}
                                color={"white"}
                                _hover={{
                                    bg: "blue.500",
                                }}
                                onClick={(e) => handleLogin(e)}
                            >
                                Sign in
                            </Button>
                            <Button
                                bg={"purple.400"}
                                color={"white"}
                                _hover={{
                                    bg: "purple.100",
                                }}
                                onClick={
                                    () => {
                                        history.replace('/')
                                    }
                                }
                            >
                                Sign in as Guest
                            </Button>
                            <Divider/>
                            <VStack w={'100%'}>
                                <Text>Don't have an account</Text>
                                <Button w={'100%'}
                                        onClick={() => history.push('/register')}
                                >Sign Up</Button>
                            </VStack>
                        </Stack>
                    </Stack>
                </Box>
            </Stack>
        </Flex>
    );
}
