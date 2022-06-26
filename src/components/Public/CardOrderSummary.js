import {Button, Flex, Heading, Link, Stack, Text, useColorModeValue} from '@chakra-ui/react'
import {FaArrowRight} from 'react-icons/fa'
import {formatPrice} from "./PriceTag";
import {useHistory} from "react-router-dom";
import {useEffect, useState} from "react";
import {useSelector} from "react-redux";

const OrderSummaryItem = (props) => {
    const {label, value, children} = props
    return (
        <Flex justify="space-between" fontSize="sm">
            <Text fontWeight="medium" color={useColorModeValue('gray.600', 'gray.400')}>
                {label}
            </Text>
            {value ? <Text fontWeight="medium">{value}</Text> : children}
        </Flex>
    )
}

export const CartOrderSummary = () => {
    const history = useHistory();
    const cartItems = useSelector(state => state.shoppingCartReducer);
    const [totalPrice, setTotalPrice] = useState();

    useEffect(() => {
        calcTotalPrice();
    }, [cartItems]);

    //calc total price
    const calcTotalPrice = () => {
        const totalPrice = cartItems.reduce((sum, {price, qty}) => sum + price * qty, 0);
        setTotalPrice(totalPrice);
    }
    return (
        <Stack spacing="8" borderWidth="1px" rounded="lg" padding="8" width="full">
            <Heading size="md">Order Summary</Heading>
            <Stack spacing="6">
                <OrderSummaryItem label="Subtotal" value={formatPrice(totalPrice)}/>
                <OrderSummaryItem label="Shipping + Tax">
                    <Link href="#" textDecor="underline">
                        Calculate shipping
                    </Link>
                </OrderSummaryItem>
                <OrderSummaryItem label="Coupon Code">
                    <Link href="#" textDecor="underline">
                        Add coupon code
                    </Link>
                </OrderSummaryItem>
                <Flex justify="space-between">
                    <Text fontSize="lg" fontWeight="semibold">
                        Total
                    </Text>
                    <Text fontSize="xl" fontWeight="extrabold">
                        {formatPrice(totalPrice)}
                    </Text>
                </Flex>
            </Stack>
            <Button
                onClick={() => history.push('checkout')}
                colorScheme="blue" size="lg" fontSize="md" rightIcon={<FaArrowRight/>}>
                Checkout
            </Button>
        </Stack>
    )
}