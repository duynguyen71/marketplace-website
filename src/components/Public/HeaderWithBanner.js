import React, {useEffect, useState} from 'react';
import {
    Badge,
    Box,
    Button,
    CloseButton,
    Flex,
    Heading,
    HStack, IconButton, Input,
    InputGroup,
    InputLeftElement, Stack,
    Text,
    VStack
} from "@chakra-ui/react";
import {SearchIcon} from "@chakra-ui/icons";
import {AiOutlineShopping, AiOutlineShoppingCart} from "react-icons/all";
import history from '../../helper/history';
import {store} from "../../index";
import {authAction} from "../../actions/auth.action";
import {useSelector} from "react-redux";
import {shoppingCartAction} from "../../actions/shoppingCartAction";

const HeaderWithBanner = () => {
    const [banner, setBanner] = useState(true);
    const [total, setTotal] = useState(0);
    const {loggedIn} = useSelector(state => state.authenticateReducer);
    const cart = useSelector(state => state.shoppingCartReducer);
    useEffect(() => {
        console.log('cart item', cart);
        setTotal(calcTotalItems());
    }, [cart]);
    const calcTotalItems = () => {
        const totalPrice = cart.reduce((sum, {qty}) => sum + qty, 0);
        return totalPrice;
    }
    return (
        <>
            <Flex zIndex={999} direction={'column'} w={'100%'} position={'sticky'} top={0}>
                {/*BANNER*/}
                {banner && <Flex
                    bgGradient='linear(to-r, gray.300, yellow.400, pink.200)'
                    justifyContent={'center'}
                    alignItems={'center'}
                    p={1}
                    textAlign={'end'}
                    w={'100%'}>
                    <HStack w={'100%'} align={'center'} justifyContent={'center'}>
                        <Text>Did you buy a license yet?
                        </Text>
                        <Button size={'sm'} variant={'outline'}>Check it out</Button>
                    </HStack>
                    <CloseButton
                        onClick={() => setBanner(false)}
                        ml={'auto'} justifySelf={'flex-end'} alignSelf={'flex-end'}/>
                </Flex>}
                {/*END OF BANNER*/}
                {/*TOP NAV*/}
                <Box bg={'tomato'} w={'100%'} px={5}>
                    <Flex justifyContent={'space-between'} w={'100%'}>
                        <HStack color={'white'}
                                cursor={'pointer'}
                        >
                            <Text
                                onClick={() => history.push('/dashboard')}
                            >Seller Center| </Text>
                            <Text>Download| </Text>
                            <Text>Connect| </Text>
                        </HStack>
                        <HStack color={'white'}
                        >
                            <Text
                                cursor={'pointer'}
                                onClick={() => {
                                    shoppingCartAction.clearCart();
                                    authAction.logout();
                                    return history.replace('/login');
                                }}>{loggedIn ? "Log out" : "Log in"}</Text>
                            {
                                !loggedIn && <Text cursor={'pointer'} onClick={() => history.replace('/register')
                                }>Register</Text>
                            }
                            {loggedIn && <Text
                                onClick={() => {
                                    loggedIn ? history.push('/user/purchase') : authAction.logout();
                                }}
                            >My Account</Text>}
                        </HStack>
                    </Flex>
                    <Flex alignItems={'center'} py={4} justifyContent={'space-between'} w={'95%'} m={'auto'}>
                        <Heading
                            onClick={() => history.push('/')}
                            cursor={'pointer'}
                            color={'white'} letterSpacing={1}>Logo</Heading>
                        <VStack w={'100%'}>
                            <InputGroup color={'white'} maxW={600}>
                                <InputLeftElement
                                    pointerEvents='none'
                                    children={<SearchIcon color='gray.300'/>}
                                />
                                <Input color={'white'} type='tel' placeholder='Search...'/>
                            </InputGroup>
                            <Stack direction='row'>
                                {/*<Badge>Default</Badge>*/}
                                {/*<Badge colorScheme='green'>Success</Badge>*/}
                                {/*<Badge colorScheme='red'>Removed</Badge>*/}
                                {/*<Badge colorScheme='purple'>New</Badge>*/}
                                {
                                    ['electronics', 'bike', 'clothes', 'bag', 'phone', 'milk'].map((item, index) => (
                                        <Text key={index} color={'white'} fontSize={14} cursor={'pointer'}>{item}</Text>
                                    ))
                                }
                            </Stack>
                        </VStack>
                        {/*<IconButton colorScheme={'white'} bg={'transparent'} aria-label='Search database'*/}
                        {/*            icon={<AiOutlineShoppingCart size={'md'}/>}/>*/}

                        {/*SHOPPING CART ITEM COUNT*/}
                        <Box
                            onClick={() => history.push("/cart")}
                            align={'center'} position={'relative'}>
                            <AiOutlineShopping color={'white'} size={'30px'}/>
                            <Box
                                // bg={'red'}
                                position={'absolute'} right={'-10px'} top={0} w={'20px'} borderRadius={'lg'}
                                h={'20px'} align={'center'}
                                justifySelf={'center'}
                                justifyContent={'center'} alignItems={'center'} alignSelf={'center'}
                                alignItems={'center'} textAlign={'center'} justifyItems={'center'}>
                                <Text
                                    color={'white'}
                                    align={'center'}
                                    justifySelf={'center'}
                                    justifyContent={'center'} alignItems={'center'} alignSelf={'center'}
                                    alignItems={'center'} textAlign={'center'}
                                    justifyItems={'center'}>{total}</Text>
                            </Box>
                        </Box>
                    </Flex>
                </Box>
                {/*END OF TOP NAV*/}
            </Flex>

        </>
    );
};

export default HeaderWithBanner;