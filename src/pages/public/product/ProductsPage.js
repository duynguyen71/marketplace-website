import React, {useEffect, useState} from 'react';
import {
    Box,
    Container,
    Flex,
    Heading,
    Image,
    Text,
    CheckboxGroup,
    Checkbox,
    HStack,
    VStack,
    SimpleGrid,
    RangeSlider,
    RangeSliderTrack,
    RangeSliderFilledTrack,
    RangeSliderThumb,
    Divider,
    Button,
    FormControl, Input, FormLabel, FormHelperText,

} from "@chakra-ui/react";
import {
    Slider as CSlider,
    SliderTrack,
    SliderFilledTrack,
    SliderThumb,
} from '@chakra-ui/react';
import Slider from 'react-slick';
import ProductEntry from "../../../components/Public/ProductEntry";
import {StarIcon} from "@chakra-ui/icons";
import {AiOutlineDollar, MdGraphicEq} from "react-icons/all";
import {useParams} from "react-router-dom";
import productService from "../../../service/product.service";
import {compareTwoStrings, findBestMatch} from "string-similarity";

const settings = {
    dots: true,
    arrows: true,
    fade: true,
    infinite: true,
    autoplay: true,
    speed: 500,
    autoplaySpeed: 3000,
    slidesToShow: 1,
    slidesToScroll: 1,
}


const ProductsPage = () => {
    const [slider, setSlider] = useState();
    const [products, setProducts] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [banners, setBanners] = useState([
        'https://images.pexels.com/photos/942305/pexels-photo-942305.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
        'https://images.pexels.com/photos/9436715/pexels-photo-9436715.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500',
        'https://images.pexels.com/photos/6152258/pexels-photo-6152258.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500'
    ])
    const {category} = useParams();

    useEffect(async () => {
        if (category) {
            document.title = category;
            const resp = await productService.getProductsByCategory(category);
            setProducts(resp.data);
            setFilteredProducts(resp.data);
        } else {
            document.title = "Products"
        }
    }, []);


    return (
        <>
            <Box bg={'red'} minH={'100vh'} bg={'gray.100'} bgColor={'gray.100'} w={'100%'} p={5}>
                <Box w={'100%'}>
                    {/*BANNER*/}
                    <Slider
                        {...settings} ref={(slider) => setSlider(slider)}
                    >
                        {
                            banners.map((item, i) => (
                                <Box
                                    maxH={'50vh'}
                                    w={'100%'}
                                    key={i}
                                    height={'6xl'}
                                    position="relative"
                                    backgroundPosition="center"
                                    backgroundRepeat="no-repeat"
                                    backgroundSize="cover"
                                    backgroundImage={`url(${item})`}>

                                </Box>


                            ))
                        }
                    </Slider>
                    {/*END OF BANNER*/}

                    {/*BRAND*/}

                    {/*END OF BRAND*/}
                    <Box height={5}></Box>
                    {/*MAIN*/}
                    <Box w={'100%'} alignItems={'start'}>
                        <Flex w={'100%'} alignItems={'start'}>
                            {/*FILTERS*/}
                            <Box
                                w={'100%'} bg={'white'} flex={2} p={4}
                                mr={5}
                            >
                                <Flex borderRadius={'md'} w={'100%'} direction={'column'}>
                                    {/*CATEGORY FILTER*/}
                                    <Box w={'100%'}>
                                        <Text mb={2} color={'gray.700'} fontSize={'20px'}>Category</Text>
                                        <VStack w={'100&'} spacing={1} align={'start'}>
                                            <CheckboxGroup size={'md'} colorScheme={'green'} borderColor={'white'}>
                                                {
                                                    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1].map((item, i) => (
                                                        <Checkbox borderColor={'gray.600'} key={i}>
                                                            Category
                                                        </Checkbox>
                                                    ))
                                                }
                                            </CheckboxGroup>
                                        </VStack>
                                    </Box>
                                    {/*PRICE FILTER*/}
                                    <Divider my={5}/>
                                    <VStack w={'100%'} align={'start'}>
                                        <Text>Price $</Text>
                                        <Flex w={'100%'} justifyContent={'space-between'}>
                                            <Text fontSize={14} color={'gray.800'}>100</Text>
                                            <Text fontSize={14} color={'gray.800'}>100</Text>
                                        </Flex>
                                        <RangeSlider
                                            onChange={(arr) => {
                                                const start = arr[0];
                                                const end = arr[1];
                                                const filter = products.filter((p) => {
                                                    if (p.models && p.models.length > 0) {
                                                        return p.minPrice >= start && p.maxPrice <= end;
                                                    } else {
                                                        return p.salesPrice >= start && p.salesPrice <= end;
                                                    }
                                                });
                                                setFilteredProducts([...filter]);
                                                console.log(filter);
                                            }}
                                            colorScheme={'teal'}
                                            defaultValue={[10000, 240]} min={10000} max={10000000000000} step={10}>
                                            <RangeSliderTrack bg='red.100'>
                                                <RangeSliderFilledTrack bg='tomato'/>
                                            </RangeSliderTrack>
                                            <RangeSliderThumb boxSize={4} index={0}/>
                                            <RangeSliderThumb boxSize={4} index={1}/>
                                        </RangeSlider>
                                    </VStack>
                                    <Divider/>
                                    <Button
                                        onClick={() => setFilteredProducts([...products])}
                                        size={'sm'} variant={'outline'}>Remove filter</Button>
                                </Flex>
                            </Box>
                            {/*END OF FILTERS*/}
                            {/*PRODUCTS*/}
                            <Flex direction={'column'} w={'100%'} bg={'white'} minH={'100vh'} flex={10}>
                                <Box p={2} maxH={'30vw'} alignSelf={'end'}>
                                    <FormControl htmlFor={'filter-product-name'}>
                                        <Input
                                            onChange={(e) => {
                                                const value = e.target.value;
                                                if (value.length == 0) {
                                                    setFilteredProducts([...products]);
                                                    return;
                                                }
                                                const filtered = products.filter(p => {
                                                    return compareTwoStrings(value, p.name) > .25;

                                                })
                                                setFilteredProducts([...filtered]);
                                            }}
                                            borderRadius={'sm'} size={'sm'}/>
                                        <FormHelperText>Filter Product by name or
                                            shop name</FormHelperText>
                                    </FormControl>
                                </Box>
                                <Box borderRadius={'10px'} bg={'white'} p={5} minH={'100vh'}>
                                    <SimpleGrid minChildWidth='200px' spacing='20px'>
                                        {
                                            filteredProducts && filteredProducts.map((product, i) => (
                                                <ProductEntry key={i} {...product}/>
                                            ))
                                        }
                                    </SimpleGrid>
                                </Box>
                            </Flex>
                            {/*    END OF PRODUCRS*/}
                        </Flex>
                    </Box>
                    {/*MAIN*/}


                </Box>
            </Box>
        </>
    )
        ;
};

export default ProductsPage;