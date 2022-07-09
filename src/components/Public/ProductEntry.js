import React, {useEffect} from 'react';
import {Box, Flex, HStack, Text, VStack} from "@chakra-ui/react";
import {StarIcon} from "@chakra-ui/icons";
import {useHistory} from "react-router-dom";
import * as url from "url";
import {formatPrice} from "./PriceTag";

const ProductEntry = ({...props}) => {
    const history = useHistory();
    const {id, name, minPrice, maxPrice, coverImage, images, standardPrice, salesPrice, solid, shop, models,variants=[]} = props;
    useEffect(() => {

    }, [])
    return (
        <>
            <Flex
                maxW={300}
                onClick={() => history.push(`/shop/${shop.id}/products/${id}`)}
                cursor={'pointer'} w={'100%'} direction={'column'} height='300px'>
                <Box
                    _hover={{
                        'opacity': .8,
                        'transition': 'ease'
                    }}
                    position="relative"
                    backgroundPosition="center"
                    backgroundRepeat="no-repeat"
                    backgroundSize="cover"
                    backgroundImage={`url(${images[0] != undefined ? ('http://localhost:8080/api/v1/public/files/' + images[0].image.name) : 'http://localhost:8080/api/v1/public/files/no-image'})`}
                    flex={8}

                >
                </Box>
                <Box cursor={'pointer'} flex={4} p={2} bg={'white'} boxShadow={'md'}
                     borderRadius={'md'}>
                    <VStack align={'start'} w={'100%'}>
                        {/*PRODUCT NAME*/}
                        <Text noOfLines={1} isTruncated maxW={200} textAlign={'start'} fontWeight={'medium'}
                              fontSize={15}>{name}</Text>
                        <HStack>
                            <Text

                                fontSize={14}>{variants.length > 0 ? `${formatPrice(minPrice)} - ${formatPrice(maxPrice)}` : `${salesPrice ? formatPrice(salesPrice) : formatPrice(standardPrice)}`}</Text>
                        </HStack>
                        <Flex w={'100%'} justifyContent={'space-between'}>
                            <HStack>
                                {
                                    [1, 2, 3, 4, 5].map((item, i) => (
                                        <StarIcon key={i} boxSize={'10px'}
                                                  color={'orange.300'}/>
                                    ))
                                }
                            </HStack>
                            <Text fontSize={12} color={'gray.600'}>{solid} đã bán</Text>
                        </Flex>
                        <Text
                            noOfLines={1}
                            maxW={300} isTruncated color={'gray.500'} fontSize={10} textAlign={'end'}
                            w={'100%'}>
                            {shop.name}
                        </Text>
                    </VStack>
                </Box>
            </Flex>
        </>
    );
};

export default ProductEntry;