import React, {useEffect} from 'react';
import {Box, Flex, Heading, HStack, Link, Stack} from "@chakra-ui/react";
import {cartData} from "../../../data/cartData";
import {CartItem} from "../../../components/Public/CartItem";
import {CartOrderSummary} from "../../../components/Public/CardOrderSummary";
import {useDispatch, useSelector} from "react-redux";
import {store} from "../../../index";
import {shoppingCartAction} from "../../../actions/shoppingCartAction";
import {useHistory} from "react-router-dom";

const ShoppingCart = () => {

    const history = useHistory();
    const cartItems = useSelector((state => state.shoppingCartReducer));
    useEffect(() => {
        console.log('shopping items', cartItems);
    }, []);


    return (
        <>
            <Box
                maxW={{
                    base: '3xl',
                    lg: '7xl',
                }}
                mx="auto"
                px={{
                    base: '8',
                    md: '12',
                }}
                py={{
                    base: '8',
                    md: '12',
                }}
            >
                <Stack
                    direction={{
                        base: 'column',
                        lg: 'row',
                    }}
                    align={{
                        lg: 'flex-start',
                    }}
                    spacing={{
                        base: '8',
                        md: '16',
                    }}
                >
                    <Stack
                        spacing={{
                            base: '8',
                            md: '10',
                        }}
                        flex="2"
                    >
                        <Heading fontSize="2xl" fontWeight="extrabold">
                            Shopping Cart ({cartItems.length} items)
                        </Heading>

                        <Stack spacing="6">
                            {cartItems.map((item) => (
                                <CartItem key={item.id} {...item} />
                            ))}
                        </Stack>
                    </Stack>

                    <Flex direction="column" align="center" flex="1">
                        <CartOrderSummary/>
                        <HStack mt="6" fontWeight="semibold">
                            <p>or</p>
                            <Link onClick={() => history.replace('/')} color={'blue.500'}>Continue shopping</Link>
                        </HStack>
                    </Flex>
                </Stack>
            </Box>
        </>
    );
};

export default ShoppingCart;