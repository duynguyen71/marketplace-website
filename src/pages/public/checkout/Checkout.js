import React from 'react';
import {
    Box, Breadcrumb, BreadcrumbItem, BreadcrumbLink, Button,
    Divider,
    Flex,
    FormControl, FormHelperText,
    FormLabel,
    Heading,
    HStack,
    Input, Radio, RadioGroup,
    Select,
    Text,
    VStack
} from "@chakra-ui/react";
import CheckoutItem from "../../../components/Public/CheckoutItem";
import {ChevronRightIcon} from "@chakra-ui/icons";

require('dotenv').config();
const Checkout = () => {
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
                        <Select textColor={'gray.600'} placeholder='Select address'>
                            <option value='option1'>Home</option>
                            <option value='option2'>Work</option>
                            <option value='option3'>New address</option>
                        </Select>
                        <FormControl id='first-name' isRequired>
                            <FormLabel textColor={'gray.600'}>Full name</FormLabel>
                            <Input placeholder='First name'/>
                        </FormControl>
                        <FormControl id='first-name' isRequired>
                            <FormLabel textColor={'gray.600'}>Address</FormLabel>
                            <Input placeholder='Address detail...'/>
                        </FormControl>
                        <Flex w={'100%'}>
                            <FormControl flex={3} id='post-code' isRequired>
                                <FormLabel textColor={'gray.600'}>Post code</FormLabel>
                                <Input placeholder='Post code'/>
                            </FormControl>
                            <FormControl ml={5} flex={7} w={'100%'} id='city' isRequired>
                                <FormLabel textColor={'gray.600'}>City</FormLabel>
                                <Input placeholder='City'/>
                            </FormControl>
                        </Flex>
                    </VStack>
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
                            <RadioGroup defaultValue='1'>
                                <HStack spacing='24px'>
                                    <Radio value='1'>Credit Card</Radio>
                                    <Radio value='2'>Paypal</Radio>
                                    <Radio value='2'>COD</Radio>
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
                            [1, 2, 3].map((item, i) => (
                                <>
                                    <CheckoutItem key={i}/>
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
                            <Text textColor={'gray.800'} fontSize={20}>$670</Text>
                        </Flex>
                        <Flex w={'100%'} justifyContent={'space-between'} alignItems={'center'}>
                            <Text textColor={'gray.600'} fontSize={18}>Shipping cost</Text>
                            <Text textColor={'gray.800'} fontSize={20}>+$10</Text>
                        </Flex>
                        <Flex w={'100%'} justifyContent={'space-between'} alignItems={'center'}>
                            <Text textColor={'gray.600'} fontSize={18}>Discount</Text>
                            <Text textColor={'gray.800'} fontSize={20}>-$67</Text>
                        </Flex>
                    </VStack>
                    <Divider my={8}/>
                    <Flex alignItems={'center'} justifyContent={'space-between'} w={'100%'}>
                        <Text textColor={'gray.900'} fontSize={18}>Order Total</Text>
                        <Text fontWeight={'medium'} textColor={'black'} fontSize={20}>$670</Text>
                    </Flex>
                    <Divider my={8}/>
                    <Button w={'100%'} variant={'solid'} colorScheme={'teal'}>Place Order</Button>
                    <Box height={'10'}/>
                </Box>
            </Flex>

        </Flex>
    );
};

export default Checkout;