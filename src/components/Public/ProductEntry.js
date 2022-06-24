import React, {useEffect} from 'react';
import {Box, Flex, HStack, Text, VStack} from "@chakra-ui/react";
import {StarIcon} from "@chakra-ui/icons";
import {useHistory} from "react-router-dom";

const ProductEntry = ({...props}) => {
    const history = useHistory();
    const {id, name, minPrice, maxPrice, coverImage, solid, shop} = props;
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
                    backgroundImage={'url(https://images.pexels.com/photos/4041157/pexels-photo-4041157.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260)'}
                    flex={8}

                >
                </Box>
                <Box cursor={'pointer'} flex={4} p={2} bg={'white'} boxShadow={'md'}
                     borderRadius={'md'}>
                    <VStack align={'start'} w={'100%'}>
                        {/*PRODUCT NAME*/}
                        <Text isTruncated fontWeight={'medium'} fontSize={15}>{name}</Text>
                        <HStack>
                            <Text fontSize={14}>{minPrice}{' '}-{''}</Text>
                            {maxPrice && (minPrice < maxPrice) && <Text fontSize={14}>{maxPrice}</Text>}
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
                        <Text color={'gray.500'} fontSize={10} textAlign={'end'}
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