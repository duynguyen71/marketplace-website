import React, {useEffect, useState} from 'react';
import {useParams} from "react-router-dom";
import {shopService} from "../../../service/shopService";
import {Avatar, Box, Divider, Flex, HStack, Select, Spacer, Text, VStack, Button, Center} from "@chakra-ui/react";
import {formatPrice} from "../../../components/Public/PriceTag";
import LoadingWidget from "../../../components/LoadingWidget";

const OrderItemDetailPage = () => {
    const {id} = useParams();
    const [items, setItems] = useState([]);
    const [order, setOrder] = useState(null);
    useEffect(() => {
        shopService.getOrderItems(id).then(items => {
            console.log(items);
            setItems(items);
            setStatus(items[0].status);
        });
        shopService.getOrder(id).then(data => {
            console.log(data);
            setOrder(data);
        });
    }, []);

    const [status, setStatus] = useState('');
    const updateStatus = async () => {
        try {
            setLoading(true);
            const resp = await shopService.updateOrderItemsStatus(id, status);
            console.log(resp);
        } catch (e) {
            setLoading(false);
        }
        setLoading(false);
    }
    const [isLoading, setLoading] = useState(false);
    return (
        <Flex position={'relative'} direction={'column'} w={'100%'} alignItems='start' w={'100%'}>
            <HStack borderRadius={'md'} spacing={4} bg={'white'} my={4} px={5} py={2} alignItems={'end'}
                    alignSelf={'end'}>
                <Select
                    onChange={(e) => {
                        setStatus(e.target.value);
                    }}
                    defaultValue={items[0] != undefined ? items[0].status : 'order status'}
                    placeholder={items[0] != undefined ? items[0].status : 'order status'}>
                    <option value='TO_PAY'>TO_PAY</option>
                    <option value='TO_SHIP'>TO_SHIP</option>
                    <option value='TO_RECEIVE'>TO_RECEIVE</option>
                    <option value='COMPLETED'>COMPLETED</option>
                    <option value='CANCELLED'>CANCELLED</option>
                </Select>
                <Button
                    onClick={updateStatus}
                    fontWeight={'normal'} colorScheme={'blue'}>Update</Button>
            </HStack>
            <Flex direction={'column'} w={'100%'} bg={'white'}>
                {items.map(oi => (
                    <Box w={'100%'} borderRadius={'md'} key={oi.id} bg={'white'} w={'100%'}>
                        <Box w={'100%'}>
                            <Flex p={4} alignItems={'center'}>
                                <Avatar
                                    boxSize={'100px'}
                                    src={(oi.product.image != null && oi.product.image[0] != undefined) ? ('http://localhost:8080/api/v1/public/files/' + oi.product.image[0]) : 'http://localhost:8080/api/v1/public/files/no-image'}
                                />
                                <VStack alignItems={'start'} px={4}>
                                    <Text fontWeight={'medium'}>{oi.product.name}</Text>
                                    <Text color={'gray.400'} textStyle={16}>{oi.model ? oi.model.name : ''}</Text>
                                </VStack>
                                <Spacer/>
                                <HStack>
                                    <Text color={'gray.600'}>{'x '}</Text>
                                    <Text fontWeight={'medium'}>{oi.qty}</Text>
                                </HStack>
                                <Spacer/>
                                {
                                    (oi.model != undefined && oi.model != null) ?
                                        <Text fontWeight={'medium'} fontSize={'16px'}
                                              textColor={'gray.800'}>{formatPrice(oi.model.price * oi.qty)}</Text>
                                        : <Text fontWeight={'medium'} fontSize={'16px'}
                                                textColor={'gray.800'}>{formatPrice(oi.product.salesPrice * oi.qty)}</Text>

                                }
                            </Flex>
                        </Box>
                    </Box>
                ))}
            </Flex>
            <Divider/>
            <Box w={'100%'}>

            </Box>
            <Box w={'100%'} my={4} bg={'white'} p={4}>
                <Text>Shipping Infomation</Text>
                <Divider/>

                {
                    order && (<Flex direction={'column'}>
                        <HStack spacing={4} alignItems={'start'}>
                            <HStack py={4}>
                                <Text fontWeight={'medium'} fontSize={'16px'} textColor={'gray.800'}>Name:</Text>
                                <Text>{order.address.fullName || ''}</Text>
                            </HStack>
                            <HStack py={4}>
                                <Text fontWeight={'medium'} fontSize={'16px'} textColor={'gray.800'}>Phone:</Text>
                                <Text>{order.address.phone || ''}</Text>
                            </HStack>
                        </HStack>

                        <HStack py={4}>
                            <Text fontWeight={'medium'} fontSize={'16px'} textColor={'gray.800'}>Address details:</Text>
                            <Text>{order.address.addressDetails || ''}</Text>
                        </HStack>
                        <HStack py={4}>
                            <Text fontWeight={'medium'} fontSize={'16px'} textColor={'gray.800'}>User NOTE:</Text>
                            <Text textTransform={'uppercase'}>{order.note || ''}</Text>
                        </HStack>

                    </Flex>)
                }
            </Box>
            <LoadingWidget isLoading={isLoading}/>
        </Flex>
    );
};

export default OrderItemDetailPage;