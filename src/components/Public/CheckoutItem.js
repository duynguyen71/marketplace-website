import React from 'react';
import {
    AspectRatio, Divider,
    Flex, Heading,
    HStack,
    Image, NumberDecrementStepper, NumberIncrementStepper,
    NumberInput,
    NumberInputField,
    NumberInputStepper,
    Text,
    VStack
} from "@chakra-ui/react";
import {store} from "../../index";
import {shoppingCartAction} from "../../actions/shoppingCartAction";
import {formatPrice} from "./PriceTag";

const CheckoutItem = ({...props}) => {
    const {images = []} = props;
    return (
        <>
            <Flex justifyContent={'space-between'} alignItems={'center'} w={'100%'}>
                <HStack spacing={2}>
                    <AspectRatio w={100} ratio={1}>
                        <Image
                            borderRadius={'md'}
                            src={(images != null && images[0] != undefined) ? ('http://localhost:8080/api/v1/public/files/' + images[0].image.name) : 'http://localhost:8080/api/v1/public/files/no-image'}
                            alt={'cart dstem'}/>
                    </AspectRatio>

                    <VStack align={'start'}>
                        <Text
                            fontSize={16}
                            textColor={
                                'gray.600'
                            } fontWeight={'medium'}>{props.name || ''}</Text>
                        <Text fontSize={15} color={'grey'}>models</Text>
                        {/*<Text fontSize={15} textColor={'gray.600'}>Size : 20</Text>*/}
                    </VStack>
                </HStack>
                <NumberInput
                    onChange={(e) => {
                        shoppingCartAction.updateCartItemQty(props.id, parseInt(e));
                    }}
                    maxW={20}
                    step={1}
                    defaultValue={props.qty}
                    min={1}
                    max={100}>
                    <NumberInputField/>
                    <NumberInputStepper>
                        <NumberIncrementStepper/>
                        <NumberDecrementStepper/>
                    </NumberInputStepper>
                </NumberInput>
                <Text textColor={'gray.700'} fontWeight={'medium'}
                      fontSize={'x-large'}>{formatPrice(props.salesPrice * props.qty)}</Text>
            </Flex>
        </>
    );
};

export default CheckoutItem;