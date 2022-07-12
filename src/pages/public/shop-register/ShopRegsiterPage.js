import {
    Box,
    Flex,
    Stack,
    Heading,
    Text,
    Container,
    Input,
    Button,
    SimpleGrid,
    Avatar,
    AvatarGroup,
    useBreakpointValue,
    IconProps,
    Icon, Textarea, FormHelperText, CircularProgress,
} from '@chakra-ui/react';
import {shopService} from "../../../service/shopService";
import {useSelector} from "react-redux";
import {useEffect, useState} from "react";
import {useHistory} from "react-router-dom";
import {authAction} from "../../../actions/auth.action";
import LoadingWidget from "../../../components/LoadingWidget";
// import {toast, ToastContainer} from "react-toastify";

const avatars = [
    {
        name: 'Ryan Florence',
        url: 'https://bit.ly/ryan-florence',
    },
    {
        name: 'Segun Adebayo',
        url: 'https://bit.ly/sage-adebayo',
    },
    {
        name: 'Kent Dodds',
        url: 'https://bit.ly/kent-c-dodds',
    },
    {
        name: 'Prosper Otemuyiwa',
        url: 'https://bit.ly/prosper-baba',
    },
    {
        name: 'Christian Nwamba',
        url: 'https://bit.ly/code-beast',
    },
];

export default function ShopRegisterPage() {

    const {user} = useSelector(state => state.authenticateReducer);
    const history = useHistory();
    useEffect(() => {
        setShop(prevState => ({
            ...prevState,
            phone: user.phone,
            email: user.email,
        }));
    }, []);
    const registerShop = async () => {
        // shopService.ge


        // toast.success('Create shop success!', {
        //     position: "bottom-left",
        //     autoClose: 2000,
        //     hideProgressBar: false,
        //     closeOnClick: true,
        //     pauseOnHover: true,
        //     draggable: true,
        //     progress: undefined,
        // });
        console.log('registering');
        setLoading(true);
        try {
            const data = await shopService.registrationShop(shop);
            await authAction.getUserDetail();
            history.replace('/dashboard/shop');
            setLoading(false);
            return;
        } catch (e) {
            console.log(e);
            if (e.details && e.details[0] != undefined) {
                setErr(e.details[0]);
            } else if (e.message) {
                setErr(e.message);
            } else {
                setErr('Failed register shop!');
            }
            setLoading(false);
        }
    }
    const [err, setErr] = useState('');
    const [shop, setShop] = useState({
        name: "",
        phone: '',
        email: '',
        description: '',
    });
    const [isLoading, setLoading] = useState(false);
    return (
        <Box position={'relative'}>
            <Container
                as={SimpleGrid}
                maxW={'7xl'}
                columns={{base: 1, md: 2}}
                spacing={{base: 10, lg: 32}}
                py={{base: 10, sm: 20, lg: 32}}>
                <Stack spacing={{base: 10, md: 20}}>
                    <Heading
                        lineHeight={1.1}
                        fontSize={{base: '3xl', sm: '4xl', md: '5xl', lg: '6xl'}}>
                        Register shop{' '}
                        <Text
                            as={'span'}
                            bgGradient="linear(to-r, red.400,pink.400)"
                            bgClip="text">
                            &
                        </Text>{' '}
                        Sell products in Viet Nam
                    </Heading>
                    <Stack direction={'row'} spacing={4} align={'center'}>
                        <AvatarGroup>
                            {avatars.map((avatar) => (
                                <Avatar
                                    key={avatar.name}
                                    name={avatar.name}
                                    src={avatar.url}
                                    size={'md'}
                                    position={'relative'}
                                    zIndex={2}
                                    _before={{
                                        content: '""',
                                        width: 'full',
                                        height: 'full',
                                        rounded: 'full',
                                        transform: 'scale(1.125)',
                                        bgGradient: 'linear(to-bl, red.400,pink.400)',
                                        position: 'absolute',
                                        zIndex: -1,
                                        top: 0,
                                        left: 0,
                                    }}
                                />
                            ))}
                        </AvatarGroup>
                        <Text fontFamily={'heading'} fontSize={{base: '4xl', md: '6xl'}}>
                            +
                        </Text>
                        <Flex
                            align={'center'}
                            justify={'center'}
                            fontFamily={'heading'}
                            fontSize={{base: 'sm', md: 'lg'}}
                            bg={'gray.800'}
                            color={'white'}
                            rounded={'full'}
                            width={useBreakpointValue({base: '44px', md: '60px'})}
                            height={useBreakpointValue({base: '44px', md: '60px'})}
                            position={'relative'}
                            _before={{
                                content: '""',
                                width: 'full',
                                height: 'full',
                                rounded: 'full',
                                transform: 'scale(1.125)',
                                bgGradient: 'linear(to-bl, orange.400,yellow.400)',
                                position: 'absolute',
                                zIndex: -1,
                                top: 0,
                                left: 0,
                            }}>
                            YOU
                        </Flex>
                    </Stack>
                </Stack>
                <Stack
                    bg={'gray.50'}
                    rounded={'xl'}
                    p={{base: 4, sm: 6, md: 8}}
                    spacing={{base: 8}}
                    maxW={{lg: 'lg'}}>
                    <Stack spacing={4}>
                        <Heading
                            color={'gray.800'}
                            lineHeight={1.1}
                            fontSize={{base: '2xl', sm: '3xl', md: '4xl'}}>
                            Register Shop
                            <Text
                                as={'span'}
                                bgGradient="linear(to-r, red.400,pink.400)"
                                bgClip="text">
                                !
                            </Text>
                        </Heading>
                    </Stack>
                    <Box as={'form'} mt={10}>
                        <Stack spacing={4}>
                            {/*SHOP NAME*/}
                            <Input
                                onChange={(e) => {
                                    setShop((prev) => ({...shop, name: e.target.value}))
                                    setErr('');
                                }}
                                placeholder="Shop name"
                                bg={'gray.100'}
                                border={0}
                                color={'gray.500'}
                                _placeholder={{
                                    color: 'gray.500',
                                }}
                            />
                            <Input
                                onChange={(e) => {
                                    setShop((prev) => ({...shop, email: e.target.value}))
                                    setErr('');
                                }}
                                value={shop.email}
                                bg={'gray.100'}
                                border={0}
                                color={'gray.500'}
                                _placeholder={{
                                    color: 'gray.500',
                                }}
                            />
                            <Input
                                onChange={(e) => {
                                    setShop((prev) => ({...shop, phone: e.target.value}))
                                    setErr('');
                                }}
                                value={shop.phone}
                                placeholder={'Your shop phone number'}
                                bg={'gray.100'}
                                border={0}
                                color={'gray.500'}
                                _placeholder={{
                                    color: 'gray.500',
                                }}
                            />
                            <Textarea
                                onChange={(e) => {
                                    setShop((prev) => ({...shop, description: e.target.value}))
                                    setErr('');
                                }}
                                placeholder="Description about your shop"
                                bg={'gray.100'}
                                border={0}
                                color={'gray.500'}
                                _placeholder={{
                                    color: 'gray.500',
                                }}/>
                            {/*<Button fontFamily={'heading'} bg={'gray.200'} color={'gray.800'}>*/}
                            {/*    Upload CV*/}
                            {/*</Button>*/}
                            {err &&
                            <Text textTransform={'capitalize'} alignSelf={'end'} textAlign={'end'} color={'red.500'}
                                  fontStyle={'italic'}>{err}</Text>}
                        </Stack>
                        <Button
                            onClick={registerShop}
                            fontFamily={'heading'}
                            mt={8}
                            w={'full'}
                            bgGradient="linear(to-r, red.400,pink.400)"
                            color={'white'}
                            _hover={{
                                bgGradient: 'linear(to-r, red.400,pink.400)',
                                boxShadow: 'xl',
                            }}>
                            Submit
                        </Button>
                    </Box>
                    form
                </Stack>
            </Container>
            {/*<Blur*/}
            {/*    position={'absolute'}*/}
            {/*    top={-10}*/}
            {/*    left={-10}*/}
            {/*    style={{filter: 'blur(70px)'}}*/}
            {/*/>*/}
            <LoadingWidget isLoading={isLoading}/>

        </Box>
    );
}

export const Blur = (props) => {
    return (
        <Icon
            width={useBreakpointValue({base: '100%', md: '40vw', lg: '30vw'})}
            zIndex={useBreakpointValue({base: -1, md: -1, lg: 0})}
            height="560px"
            viewBox="0 0 528 560"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            {...props}>
            <circle cx="71" cy="61" r="111" fill="#F56565"/>
            <circle cx="244" cy="106" r="139" fill="#ED64A6"/>
            <circle cy="291" r="139" fill="#ED64A6"/>
            <circle cx="80.5" cy="189.5" r="101.5" fill="#ED8936"/>
            <circle cx="196.5" cy="317.5" r="101.5" fill="#ECC94B"/>
            <circle cx="70.5" cy="458.5" r="101.5" fill="#48BB78"/>
            <circle cx="426.5" cy="-0.5" r="101.5" fill="#4299E1"/>
        </Icon>
    );
};