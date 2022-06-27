import React, {useEffect, useState} from 'react';
import {Box, Button, ButtonGroup, Container, Divider, Flex, HStack, Image, Spacer, Text} from "@chakra-ui/react";
import userService from '../../../service/user.service';
import {OrderStatus} from "../../../constants/order-staus";

const OrderData = ({type}) => {
    const [data, setData] = useState([]);
    const [orderStatus, setOrderStatus] = useState('');
    useEffect(() => {
        Object.keys(OrderStatus).some(function (k) {
            if (OrderStatus[k] === type) {
                console.log(k);
                setOrderStatus(k);
            }
        });
        switch (type) {
            case null: {
                userService.getCurrentUserOrders(null).then(r => {
                    console.log(r);
                    setData(r);
                    // console.log(data);
                });
                break;
            }
            case  OrderStatus.TO_PAY: {
                userService.getCurrentUserOrders(OrderStatus.TO_PAY).then(r => {
                    console.log(r);
                    setData(r);
                    // console.log(data);
                });
                break;
            }
            case  OrderStatus.TO_RECEIVE: {
                userService.getCurrentUserOrders(OrderStatus.TO_RECEIVE).then(r => {
                    console.log(r);
                    setData(r);
                    // console.log(data);
                });
                break;
            }
            case  OrderStatus.COMPLETED: {
                userService.getCurrentUserOrders(OrderStatus.COMPLETED).then(r => {
                    console.log(r);
                    setData(r);
                    // console.log(data);
                });
                break;
            }
            case  OrderStatus.CANCELLED: {
                userService.getCurrentUserOrders(OrderStatus.CANCELLED).then(r => {
                    console.log(r);
                    setData(r);
                    // console.log(data);
                });
                break;
            }
            default: {
                // userService.getCurrentUserOrders(null).then(r => setData(r));
                break;
            }
        }
    }, []);
    return (
        <Box w={'100%'} bg={'white'} my={4} p={4}>
            <Flex align={'start'} justifyContent={'start'} w={'100%'} direction={'column'}>
                {
                    data && data.map((d, i) => {
                        return (
                            d.items.map((item, i) => {
                                return (
                                    <Flex key={item.id} align={'start'} justifyContent={'start'} w={'100%'}
                                          direction={'column'}>
                                        {/*SHOP INFO*/}
                                        <Flex w={'100%'}>
                                            <Text
                                                textDecoration={'underline'}
                                                cursor={'pointer'}>{item.product.shop.name || ''}</Text>
                                            <Spacer/>
                                            <Text fontWeight={'bold'}>{item.status}</Text>
                                        </Flex>
                                        {/*PRODUCT*/}
                                        <Flex alignItems={'center'} py={4} w={'100%'} justifyContent={'start'}>
                                            <Box>
                                                <Image
                                                    boxSize='80px'
                                                    objectFit='cover'
                                                    src='https://bit.ly/dan-abramov'
                                                    alt='Dan Abramov'
                                                />
                                            </Box>
                                            <Box w={10}/>
                                            <Flex justifyContent={'space-around'} alignItems={'start'}
                                                  direction={'column'}>
                                                <Text fontSize={'16px'} fontWeight={'medium'}>{item.product.name}</Text>
                                                <Text fontSize={'14px'}>{item.model.name || ''}</Text>
                                                <Text>x {item.qty}</Text>
                                            </Flex>
                                            <Spacer/>
                                            <Text fontSize={'20px'} textColor={'tomato'} textAlign={'center'}>90
                                                vnd</Text>
                                        </Flex>
                                        {/*META DATA*/}
                                        <Flex py={4} justifyContent={'end'} alignItems={'end'} w={'100%'}>
                                            <ButtonGroup size={'sm'} colorScheme={'orange'} fontWeight={'normal'}
                                                         fontSize={'12px'}>
                                                <Button fontWeight={'normal'}
                                                        variant={'solid'}>Rate</Button>
                                                <Button
                                                    fontWeight={'normal'}
                                                    variant={'outline'}>Buy Again</Button>
                                                <Button fontWeight={'normal'}
                                                        variant={'outline'}>Cancel Order</Button>
                                            </ButtonGroup>
                                        </Flex>
                                        <Box w={'100%'} py={1}>
                                            <Divider/>
                                        </Box>
                                    </Flex>
                                )
                            })
                        )
                    })
                }
            </Flex>
        </Box>
    );
};

export default OrderData;