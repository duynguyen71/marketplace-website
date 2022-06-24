import React, {useEffect, useState} from 'react';
import {
    AspectRatio,
    Box, Button,
    Center,
    Circle, Divider,
    Flex,
    Heading,
    HStack, IconButton,
    Image, Input, InputGroup, InputLeftAddon, InputRightAddon, Skeleton,
    Square,
    Stack,
    Text,
    VStack
} from "@chakra-ui/react";
import Slider from 'react-slick';
import {AddIcon, CheckIcon, MinusIcon, PhoneIcon, StarIcon} from "@chakra-ui/icons";
import {AiOutlineHeart, BsSubtract} from "react-icons/all";
import {useParams} from "react-router-dom";
import productService from "../../../service/product.service";

const setting = {
    // dots: true,
    // infinite: true,
    slidesToShow: 4,
    slidesToScroll: 2,
    vertical: true,
    arrows: false,
    verticalSwiping: true,
    beforeChange: function (currentSlide, nextSlide) {
        console.log("before change", currentSlide, nextSlide);
    },
    afterChange: function (currentSlide) {
        console.log("after change", currentSlide);
    }
}
const ProductDetailPage = () => {
    const {shopId, productId} = useParams();
    const [productDetail, setProductDetail] = useState({});
    const [selectProduct, setSelectProduct] = useState({
        qty: 1
    });
    const [defaultVariants, setDefaultVariants] = useState([]);
    const [selectedModelNames, setSelectedModelNames] = useState([]);
    const [isLoading, setLoading] = useState(false);
    const [availableStock, setAvailableStock] = useState(0);

    const [displayImg, setDisplayImg] = useState({});

    const initPurchaseQuantity = {
        maxPurchaseQuantity: '',
        modelId: '',
        price: '',
        priceBeforeDiscount: '',
        productId: productId,
        shopId: shopId,
        stock: '',
    }
    const [purchaseQuantity, setPurchaseQuantity] = useState(initPurchaseQuantity);
    useEffect(async () => {
        document.title = "ProductsPage Details"
        console.log(shopId, '', productId)
        setLoading(true)
        await getProductDetail();
    }, []);

    const getProductDetail = async () => {
        console.log('get product detail')
        try {
            const resp = await productService.getProductDetail(productId);
            let productDetail = resp.data;
            setProductDetail(productDetail);
            setDefaultVariants(productDetail.variants || []);
            console.log(productDetail);
        } catch (e) {
            console.log("Failed to get product with id : ", productId);
        }
        setLoading(false);
    }

    //get_purchase_quantities_for_selected_model
    const getModelByVariantOption = async (names) => {
        if (names.length === defaultVariants.length) {
            let modelName = '';
            for (let i = 0; i < names.length; i++) {
                modelName += names[i];
            }
            for (let i = 0; i < productDetail.models.length; i++) {
                let model = productDetail.models[i];
                if (modelName.toLowerCase() === model.name.toLowerCase()) {
                    //gui len server
                    try {
                        const resp = await productService.getPurchaseQuantity(shopId, productId, model.id, selectProduct.qty);
                        const data = resp.data;
                        setPurchaseQuantity(prev => ({
                            ...prev,
                            maxPurchaseQuantity: data.maxPurchaseQuantity,
                            modelId: data.modelId,
                            price: data.price,
                            priceBeforeDiscount: data.priceBeforeDiscount,
                            stock: data.stock,
                        }))
                    } catch (e) {
                        setPurchaseQuantity(initPurchaseQuantity);
                        console.log("FAiled to get quantity")
                    }
                } else {
                    setPurchaseQuantity(initPurchaseQuantity);

                }
            }
        }
    }


    return (
        <Box minH={'100vh'} bg={'white'} bgColor={'gray.100'}>
            <Flex w={'100%'} minH={'100vh'}>
                <Box flex={5} w={'100%'} bg={'white'}>
                    <VStack align={'start'} spacing={5} p={10} w={'100%'} bg={'white'}>
                        <VStack spacing={2} w={'100%'}>
                            <HStack spacing={2} w={'100%'} alignItems={'center'}>
                                <Text color={'blue.500'}>Rating</Text>
                                <HStack spacing={1} alignItems={'center'}>
                                    {[1, 2, 3, 4, 5].map((item, i) => (
                                        <StarIcon key={i} color={i < 3 ? 'orange.200' : 'gray.200'}/>
                                    ))}
                                </HStack>
                            </HStack>
                        </VStack>
                        {/*PRODUCT NAME*/}
                        <Heading fontSize={'xx-large'} textColor={'gray.700'}>{productDetail.name}</Heading>
                        <HStack spacing={2}>
                            <Text
                                fontSize={'x-large'}
                                color={'gray.800'}>
                                ${productDetail.minPrice}{' '}{"-"}{' '}
                            </Text>
                            <Text fontSize={'x-large'}
                            >
                                ${productDetail.maxPrice}
                            </Text>
                        </HStack>
                        <Text textColor={'gray.500'}>Lorem ipsum dolor sit amet.</Text>
                        {/*COLOR && SIZE*/}
                        <Flex w={'100%'} justifyContent={'space-between'} alignItem={'center'}>
                            {
                                !isLoading
                                && defaultVariants && defaultVariants.map((variant, variantIndex) =>
                                    <VStack align={'start'} key={variantIndex}>
                                        {/*variant name*/}
                                        <Text textTransform={'capitalize'}>{variant.name}</Text>
                                        <HStack>
                                            {
                                                variant.options.map((option, i) => <Button
                                                    onClick={async () => {
                                                        setSelectProduct(prev => ({
                                                            ...prev,
                                                            qty: 1
                                                        }))
                                                        let temp = [...selectedModelNames];
                                                        temp[variantIndex] = option;
                                                        setSelectedModelNames([...temp]);
                                                        await getModelByVariantOption(temp);
                                                    }}
                                                    cursor={'pointer'}
                                                    _hover={
                                                        {
                                                            'backgroundColor': 'black',
                                                            'textColor': 'white'
                                                        }
                                                    }
                                                    backgroundColor={selectedModelNames[variantIndex] === option ? 'black' : 'white'}
                                                    textColor={selectedModelNames[variantIndex] === option ? 'white' : 'black'}
                                                    borderWidth={1}
                                                    borderColor={'gray'}
                                                    key={i}>
                                                    {option}
                                                </Button>)
                                            }
                                        </HStack>
                                    </VStack>
                                )
                            }

                        </Flex>
                        {/*END OF COLOR && SIZE*/}
                        {/*STOCK AVAILABLE*/}
                        <HStack>
                            {
                                purchaseQuantity &&
                                <Text>{purchaseQuantity.stock
                                    ? purchaseQuantity.stock
                                    : '0'} {' stock available'}</Text>
                            }
                        </HStack>
                        {/*QUANTITY*/}
                        <Flex justifyContent={'space-between'} alignItems={'end'} w={'100%'}
                              align={'start'}>
                            <VStack align={'start'} maxW={'200px'}>
                                <Text>Quantity</Text>
                                <InputGroup>
                                    <InputLeftAddon
                                        onClick={() => {
                                            setSelectProduct((prevState => (
                                                {
                                                    ...prevState,
                                                    qty: prevState.qty >= 2 ? prevState.qty - 1 : 0
                                                }
                                            )))
                                        }}
                                        cursor={'pointer'} children={<MinusIcon/>}
                                    />
                                    <Input
                                        onChange={(e) => {
                                            if (!purchaseQuantity.stock && purchaseQuantity.stock == 0) {
                                                return;
                                            }
                                            if (e.target.value >= 1) {
                                                setSelectProduct((prevState => (
                                                    {
                                                        ...prevState,
                                                        qty: parseInt(e.target.value)
                                                    }
                                                )));

                                            }
                                        }}
                                        value={selectProduct.qty} type='number'/>
                                    <InputRightAddon
                                        onClick={() => {
                                            if (!purchaseQuantity.stock && purchaseQuantity.stock == 0) {
                                                return;
                                            }
                                            setSelectProduct((prevState => (
                                                {
                                                    ...prevState,
                                                    qty: prevState.qty < purchaseQuantity.stock ? (prevState.qty + 1) : prevState.qty
                                                }
                                            )))
                                        }}
                                        cursor={'pointer'} children={<AddIcon/>}
                                    />
                                </InputGroup>
                            </VStack>
                            <Button
                                colorScheme={'blue'}
                                variant={'outline'}
                                aria-label={''} rightIcon={<AiOutlineHeart/>}>
                                Add to favorite
                            </Button>
                        </Flex>
                        {/*END OF QUANTITY*/}
                        {/*DESCRIPTION*/}
                        <Divider/>
                        {/*END OF DESCRIPTION*/}
                        <Skeleton isLoaded={true}>
                            <Text>
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                                Nullam sit amet turpis vitae est porta feugiat.
                                Nunc in sapien interdum, condimentum arcu eget, tempus urna.
                                Quisque vel erat in est fermentum posuere nec eu urna.
                            </Text>
                        </Skeleton>
                    </VStack>
                </Box>
                <Box flex={7} bg={'white'}>
                    <Flex w={'100%'} p={10}>
                        <Box flex={10}>

                            {/*
                            PRODUCT IMAGE*/}
                            <AspectRatio ratio={1} maxH={'500px'}>
                                <Box
                                    backgroundPosition="center"
                                    backgroundRepeat="no-repeat"
                                    backgroundSize="cover"
                                    backgroundImage={'https://images.pexels.com/photos/4066296/pexels-photo-4066296.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500'}
                                />


                            </AspectRatio>
                        </Box>
                        <Box flex={2}>
                            <Slider {...setting}>
                                {
                                    [1, 2, 3, 4, 5, 1, 1, 1, 1, 1, 1, 1, 1].map((item, i) => (
                                        <AspectRatio key={i} ratio={1} maxW={'100px'}>
                                            <Image
                                                src={'https://images.pexels.com/photos/3210711/pexels-photo-3210711.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500'}
                                                alt={'sub image'}/>
                                        </AspectRatio>
                                    ))
                                }

                            </Slider>
                        </Box>
                    </Flex>
                </Box>
            </Flex>
            {/*RELATED PRODUCT*/}
            <Box p={10} w={'100%'} bg={'white'}>
                <Flex w={'100%'} justifyContent={'start'}>
                    <Heading fontSize={'xx-large'}>Related Products</Heading>
                    <HStack>

                    </HStack>
                </Flex>
            </Box>
        </Box>
    );
};

export default ProductDetailPage;