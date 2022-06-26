import React, {useEffect, useRef, useState} from 'react';
import {
    Box,
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    Button, Container,
    Divider,
    Flex,
    FormControl,
    FormHelperText,
    FormLabel,
    HStack,
    Input,
    Radio,
    RadioGroup,
    Select,
    Text,
    VStack
} from "@chakra-ui/react";
import CheckoutItem from "../../../components/Public/CheckoutItem";
import {ChevronRightIcon} from "@chakra-ui/icons";
import userService from '../../../service/user.service';
import {useSelector} from "react-redux";
import {useHistory} from "react-router-dom";
import {shoppingCartAction} from "../../../actions/shoppingCartAction";

require('dotenv').config();
const Checkout = () => {
    const [address, setAddress] = useState();
    const [addresses, setAddresses] = useState([]);
    const [payment, setPayment] = useState({});
    const [error, setError] = useState('');
    const history = useHistory();

    const cartItems = useSelector(state => state.shoppingCartReducer);

    const [count, setCount] = useState(0);
    useEffect(() => {
        console.log('item, ', cartItems)
        if (cartItems === undefined || cartItems.length === 0) {
            history.replace('/');
            return;
        }
        setCount((p) => ++p);
        if (count <= 1) {
            userService.getAddresses().then((data) => {
                setAddresses(data);
            })
        }
        calcSubTotalPrice();
        calcTotalPrice();
        calcDiscountPrice();

    }, [cartItems]);

    const placeOrder = async () => {
        //check address valid
        if (address == null || error) {
            setError('Please select or create new address');
            return;
        }
        if (!address.fullName) {
            setError('Please insert your name');
            return;
        }
        if (!address.addressDetails) {
            setError('Please add your address detail');
            return;
        }
        if (!address.phone) {
            setError('Please add your phone number');
            return;
        }
        if (!address.postCode) {
            setError('Please insert your postCode');
            return;
        }
        //update address
        const updatedAddress = await userService.saveAddress(address);
        let placeOrderData = {
            addressId: parseInt(updatedAddress.id),
            paymentId: 1,
        }
        let items = cartItems.map(item => ({
            productId: parseInt(item.id),
            modelId: parseInt(item.modelId) ||null,
            qty: parseInt(item.qty || 1),
            message: '',
        }));
        placeOrderData = {
            ...placeOrderData,
            items: [...items],
        }
        try {
            const resp = await userService.placeOrder(placeOrderData);
            shoppingCartAction.clearCart();
            history.replace(successOrderUrl)
        } catch (e) {
            // setError(e);
        }


    }
    const successOrderUrl = '/';
    const [subTotalPrice, setSubTotalPrice] = useState();
    const [totalPrice, setTotalPrice] = useState();
    const [discount, setDiscount] = useState();

    const calcSubTotalPrice = () => {
        const totalPrice = cartItems.reduce((sum, {priceBeforeDiscount, qty}) => sum + priceBeforeDiscount * qty, 0);
        setSubTotalPrice(totalPrice);
    }
    const calcTotalPrice = () => {
        const totalPrice = cartItems.reduce((sum, {price, qty}) => sum + price * qty, 0);
        setTotalPrice(totalPrice);
    }
    const calcDiscountPrice = () => {
        const discountPrice = cartItems.reduce((sum, {
            price,
            priceBeforeDiscount,
            qty
        }) => sum + ((priceBeforeDiscount - price) * qty), 0);
        setDiscount(discountPrice);
    }

    const clearError = () => {
        setError('')
    };
    return (
        <Flex direction={'column'}>
            <Breadcrumb m={5} spacing='8px' separator={<ChevronRightIcon color='gray.500'/>}>
                <BreadcrumbItem>
                    <BreadcrumbLink href='/'>Home</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbItem isCurrentPage>
                    <BreadcrumbLink href='/'>Checkout</BreadcrumbLink>
                </BreadcrumbItem>
            </Breadcrumb>
            <Flex minH={'100vh'} w={'100%'}>
                {/*SHIPPING INFORMATION*/}
                <VStack spacing={5} p={5} flex={7} borderColor={'gray.200'} borderWidth={1} px={5} m={4}>
                    <VStack spacing={5} w={'100%'} align={'start'}>
                        <Text textColor={'gray.700'} fontWeight={'bold'} fontSize={20}>
                            Shipping Information
                        </Text>
                        <Select

                            textColor={'gray.600'}
                            placeholder='Select address'
                            onChange={(e) => {
                                let address = addresses.find(address => address.id === parseInt(e.target.value));
                                if (address != undefined) {
                                    console.log('selected address: ', address);
                                    setAddress(address);
                                    clearError();

                                    return;
                                }
                                setAddress(null);
                                ;
                            }}>
                            {
                                addresses.map((address) => {
                                    return <option key={address.id}
                                                   value={address.id}>{address.addressDetails}</option>
                                })
                            }
                        </Select>
                        <FormControl id='first-name' isRequired>
                            <FormLabel textColor={'gray.600'}>Full name</FormLabel>
                            <Input
                                onChange={(e) => {
                                    setAddress((prev) => ({
                                        ...prev,
                                        fullName: e.target.value
                                    }));
                                    clearError();
                                }}
                                placeholder='Full name' value={address != null ? address.fullName : ''}/>
                        </FormControl>
                        <FormControl id='first-name' isRequired>
                            <FormLabel textColor={'gray.600'}>Address</FormLabel>
                            <Input
                                onChange={(e) => {
                                    setAddress((prev) => ({
                                        ...prev,
                                        addressDetails: e.target.value
                                    }));
                                    clearError();

                                }}
                                value={address != null ? address.addressDetails : ''} placeholder='Address detail...'/>
                        </FormControl>
                        <Flex w={'100%'}>
                            <FormControl flex={3} id='post-code' isRequired>
                                <FormLabel textColor={'gray.600'}>Post code</FormLabel>
                                <Input
                                    onChange={(e) => {
                                        setAddress((prev) => ({
                                            ...prev,
                                            postCode: e.target.value
                                        }));
                                        clearError();

                                    }}
                                    value={address != null ? address.postCode : ''} placeholder='Post code'/>
                            </FormControl>
                            <FormControl ml={5} flex={7} w={'100%'} id='phone' isRequired>
                                <FormLabel textColor={'gray.600'}>Phone</FormLabel>
                                <Input
                                    onChange={(e) => {
                                        setAddress((prev) => ({
                                            ...prev,
                                            phone: e.target.value
                                        }));
                                        clearError();

                                    }}
                                    value={address != null ? address.phone : ''} placeholder='Phone number'/>
                            </FormControl>

                        </Flex>
                    </VStack>
                    <Flex w={'100%'} textAlign={'start'} align={'flex-end'} justifyContent={'end'} color={'red'}>
                        {error && <Text fontWeight={'bold'} textAlign={'start'}>{error}</Text>}
                    </Flex>
                    <Divider/>
                    {/*SHIPPING METHOD*/}
                    <VStack w={'100%'} spacing={5} align={'start'}>
                        {/*<Text>Shipping Method</Text>*/}
                        <FormControl as='fieldset' isRequired>
                            <FormLabel textColor={'gray.700'} color={'gray.700'} fontWeight={'bold'} fontSize={20}
                                       as='text'>Select a shipping method</FormLabel>
                            <RadioGroup defaultValue='1'>
                                <HStack spacing='24px'>
                                    <Radio value='1'>Express</Radio>
                                    <Radio value='2'>Standard</Radio>
                                </HStack>
                            </RadioGroup>
                            <FormHelperText>Select only if you're a fan.</FormHelperText>
                        </FormControl>
                    </VStack>
                    {/*END OF SHIPPING METHOD*/}
                    <Divider/>

                    {/*PAYMENT INFORMATION*/}
                    <VStack w={'100%'} spacing={5} align={'start'}>
                        {/*<Text>Shipping Method</Text>*/}
                        <FormControl as='fieldset' isRequired>
                            <FormLabel textColor={'gray.700'} color={'gray.700'} fontWeight={'bold'} fontSize={20}
                                       as='text'>Payment Information</FormLabel>
                            <RadioGroup defaultValue='3'>
                                <HStack spacing='24px'>
                                    <Radio value='1'>Credit Card</Radio>
                                    <Radio value='2'>Paypal</Radio>
                                    <Radio value='3'>COD</Radio>
                                </HStack>
                            </RadioGroup>
                            <FormHelperText>Select only if you're a fan.</FormHelperText>
                        </FormControl>
                    </VStack>

                    {/*END OF PAYMENT INFORMATION*/}
                    {/*PAYMENT*/}

                    {/*END OF PAYMENT*/}
                </VStack>
                {/*ORDER SUMMARY*/}
                <Box p={5} bg={'#EDF2F7'} flex={4} m={4} w={'100%'}>
                    <Text textColor={'gray.700'} fontWeight={'bold'} fontSize={20}>
                        Shipping Information
                    </Text>
                    <Box height={5}/>
                    <VStack align={'start'} spacing={2}>
                        {
                            cartItems.map((item, i) => (
                                <>
                                    <CheckoutItem {...item} key={item.modelId}/>
                                    <Divider/>
                                </>
                            ))
                        }
                    </VStack>
                    <Box height={5}/>
                    {/*DISCOUT CODE*/}
                    <HStack w={'100%'}>
                        <Input borderColor={'teal'}/>
                        <Button variant={'solid'} colorScheme={'teal'}>Apply</Button>
                    </HStack>
                    <Box height={10}></Box>
                    <VStack spacing={4}>
                        <Flex w={'100%'} justifyContent={'space-between'} alignItems={'center'}>
                            <Text textColor={'gray.600'} fontSize={18}>Subtotal</Text>
                            <Text textColor={'gray.800'} fontSize={20}>{subTotalPrice || '-'}</Text>
                        </Flex>
                        <Flex w={'100%'} justifyContent={'space-between'} alignItems={'center'}>
                            <Text textColor={'gray.600'} fontSize={18}>Shipping cost</Text>
                            <Text textColor={'gray.800'} fontSize={20}>{totalPrice || '-'}</Text>
                        </Flex>
                        <Flex w={'100%'} justifyContent={'space-between'} alignItems={'center'}>
                            <Text textColor={'gray.600'} fontSize={18}>Discount</Text>
                            <Text textColor={'gray.800'} fontSize={20}>{'-'}{discount || 0}</Text>
                        </Flex>
                    </VStack>
                    <Divider my={8}/>
                    <Flex alignItems={'center'} justifyContent={'space-between'} w={'100%'}>
                        <Text textColor={'gray.900'} fontSize={18}>Order Total</Text>
                        <Text fontWeight={'medium'} textColor={'black'} fontSize={20}>{totalPrice} vnd</Text>
                    </Flex>
                    <Divider my={8}/>
                    <Button onClick={placeOrder} w={'100%'} variant={'solid'} colorScheme={'teal'}>Place Order</Button>
                    <Box height={'10'}/>
                </Box>
            </Flex>

        </Flex>
    );
};

export default Checkout;