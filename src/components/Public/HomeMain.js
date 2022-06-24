import React from 'react';
import {
    AspectRatio,
    Box,
    Flex,
    Grid,
    GridItem,
    Heading,
    HStack,
    Icon,
    Image, SimpleGrid,
    Skeleton,
    Stack, Text,
    useColorModeValue
} from "@chakra-ui/react";
import {Link, useHistory} from "react-router-dom";
import {FaArrowRight} from "react-icons/all";
import SimpleThreeColumns from "../Feature";
import CaptionCarousel from "./CaptionCarosel";
import Categories from "./Categories";

const HomeMain = () => {

    const history = useHistory();

    return (
        <>
            <Box height={5}/>
            <Grid
                w={'100%'}
                h='200px'
                templateRows='repeat(2, 1fr)'
                templateColumns='repeat(5, 1fr)'
                gap={4}
            >
                <GridItem rowSpan={2} colSpan={1} bg='tomato'/>
                <GridItem colSpan={2} bg='papayawhip'/>
                <GridItem colSpan={2} bg='papayawhip'/>
                <GridItem colSpan={4} bg='tomato'/>
            </Grid>
            {/*BIG BANNER SECTION*/}
            <Box maxW="7xl" mx="auto" px={{base: '0', lg: '12'}} py={{base: '0', lg: '12'}}>
                <Stack direction={{base: 'column-reverse', lg: 'row'}} spacing={{base: '0', lg: '20'}}>
                    <Box
                        width={{lg: 'sm'}}
                        transform={{base: 'translateY(-50%)', lg: 'none'}}
                        bg={{base: useColorModeValue('red.50', 'gray.700'), lg: 'transparent'}}
                        mx={{base: '6', md: '8', lg: '0'}}
                        px={{base: '6', md: '8', lg: '0'}}
                        py={{base: '6', md: '8', lg: '12'}}
                    >
                        <Stack spacing={{base: '8', lg: '10'}}>
                            <Stack spacing={{base: '2', lg: '4'}}>
                                <Heading size="xl" color={useColorModeValue('red.500', 'red.300')}>
                                    Misguided
                                </Heading>
                                <Heading size="xl" fontWeight="normal">
                                    Refresh your wardrobe
                                </Heading>
                            </Stack>
                            <HStack spacing="3"
                                    onClick={() => history.push('/product-details')}
                            >
                                <Link to={'/'} color={useColorModeValue('red.500', 'red.300')} fontWeight="bold"
                                      fontSize="lg">
                                    Discover now
                                </Link>
                                <Icon color={useColorModeValue('red.500', 'red.300')} as={FaArrowRight}/>
                            </HStack>
                        </Stack>
                    </Box>
                    <Flex flex="1" overflow="hidden">
                        <Image
                            src="https://images.unsplash.com/photo-1589156229687-496a31ad1d1f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=772&q=80"
                            alt="Lovely Image"
                            fallback={<Skeleton/>}
                            maxH="450px"
                            minW="300px"
                            objectFit="cover"
                            flex="1"
                        />
                        <Image
                            display={{base: 'none', sm: 'initial'}}
                            src="https://images.unsplash.com/photo-1589156206699-bc21e38c8a7d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=772&q=80"
                            alt="Lovely Image"
                            fallback={<Skeleton/>}
                            maxH="450px"
                            objectFit="cover"
                        />
                    </Flex>
                </Stack>
            </Box>
            {/*END OF BIG BANNER*/}
            {/*CATEGORY*/}
            <Box p={5}>
                <Flex w={'95%'} justifyContent={'space-between'} direction={'row'} mb={3}>
                    <Text fontWeight={'bold'}>CATEGORY</Text>
                    <Text>
                        <Link to={'/'}>More</Link>
                    </Text>
                </Flex>
                {/* CATEGORIES*/}
                <Categories/>
            </Box>
            {/*END OF CATEGORY*/}
            <SimpleThreeColumns/>
            <Box h={'5vh'}/>
            <CaptionCarousel/>
        </>
    );
};

export default HomeMain;