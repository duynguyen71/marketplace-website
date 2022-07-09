import React, {useEffect, useState} from 'react';
import {
    AspectRatio, Avatar,
    Box, Button,
    Center,
    Circle, Container, Divider,
    Flex, FormControl, FormHelperText, FormLabel, Grid, GridItem,
    Heading,
    HStack, IconButton,
    Image, Input, InputGroup, InputLeftAddon, InputRightAddon, SimpleGrid, Skeleton, Spacer,
    Square,
    Stack,
    Text,
    VStack
} from "@chakra-ui/react";
import Slider from 'react-slick';
import {AddIcon, CheckIcon, MinusIcon, PhoneIcon, StarIcon} from "@chakra-ui/icons";
import {AiOutlineHeart, AiOutlineShoppingCart, BsSubtract} from "react-icons/all";
import {useHistory, useParams} from "react-router-dom";
import productService from "../../../service/product.service";
import {shoppingCartAction} from "../../../actions/shoppingCartAction";
import RatingStarts from "../../../components/RatingStarts";
import userService from '../../../service/user.service';
import {shopService} from "../../../service/shopService";
import dateFormat from "dateformat";
import {formatPrice} from "../../../components/Public/PriceTag";

const ProductDetailPage = () => {
    const {shopId, productId} = useParams();
    const history = useHistory();
    const [shopDetail, setShopDetail] = useState(null);
    const [sliderSetting, setSliderSetting] = useState({
        // dots: true,
        infinite: false,
        slidesToShow: 12,
        slidesToScroll: 1,
        vertical: true,
        arrows: false,
        verticalSwiping: true,
        beforeChange: function (currentSlide, nextSlide) {
            console.log("before change", currentSlide, nextSlide);
        },
        afterChange: function (currentSlide) {
            console.log("after change", currentSlide);
        }
    })
    const [productDetail, setProductDetail] = useState({
        models: [],
        variants: [],
        stock: 0,
        images: [],
        salesPrice: 0,
        standardPrice: 0,
        minPrice: 0,
        maxPrice: 0
    });
    const [selectProduct, setSelectProduct] = useState({
        qty: 1,
    });
    const [defaultVariants, setDefaultVariants] = useState([]);
    const [selectedModelNames, setSelectedModelNames] = useState([]);
    const [isLoading, setLoading] = useState(false);
    const [imageIndex, setImageIndex] = useState(0);
    const [feedbacks, setFeedbacks] = useState([]);
    const initFeedback = {
        comment: '',
        rating: null,
    };
    const [myFeedback, setMyFeedbacks] = useState(initFeedback)
    const initPurchaseQuantity = {
        maxPurchaseQuantity: '',
        modelId: '',
        price: '',
        standardPrice: 0,
        minPrice: 0,
        maxPrice: 0,
        salesPrice: 0,
        priceBeforeDiscount: 0,
        productId: productId,
        shopId: shopId,
        stock: '',
        modelName: '',


    }
    const [purchaseQuantity, setPurchaseQuantity] = useState(null);
    useEffect(async () => {
        document.title = "ProductsPage Details"
        console.log(shopId, '', productId)

        setLoading(true)
        getProductFeedbacks();
        await getProductDetail();

    }, []);

    //gewt product detail
    const getProductDetail = async () => {
        try {
            const data = await productService.getProductDetail(productId);
            setProductDetail(prev => ({...prev, ...data}));
            setDefaultVariants(data.variants || []);

            shopService.getShopDetail(data.shop.id).then(s => {
                console.log(s);
                setShopDetail(s);
            });
        } catch (e) {
            console.log("Failed to get product with id : ", productId);
        }
        setLoading(false);
    }

    const getProductFeedbacks = () => {
        productService.getProductFeedbacks(productId).then(data => {
            setFeedbacks(data)
            console.log('get feedbacks', data);
        });
    }

    //add product to cart
    const addProductToCart = () => {
        let qty = selectProduct.qty;
        if (productDetail.models.length > 0) {
            let maxQty = purchaseQuantity.maxPurchaseQuantity;
            if (qty <= 0 || qty > maxQty || !purchaseQuantity.modelId) {
                return;
            }
            console.log('purchase quantity', purchaseQuantity);
            shoppingCartAction.addItem({
                ...purchaseQuantity,
                name: productDetail.name,
                id: productDetail.id,
                salesPrice: purchaseQuantity.salesPrice || productDetail.salesPrice || 0,
                standardPrice: purchaseQuantity.standardPrice || productDetail.standardPrice || 0
            }, qty);
        } else {
            shoppingCartAction.addItem({...productDetail, id: productDetail.id}, qty);
        }

    }

    //get_purchase_quantities_for_selected_model
    const getModelByVariantOption = async (names) => {
        if (names.length === defaultVariants.length) {
            let modelName = '';
            for (let i = 0; i < names.length; i++) {
                if (i >= 0 && i != (names.length - 1)) {
                    modelName += names[i] + ',';
                } else {
                    modelName += names[i];
                }
            }
            //
            for (let i = 0; i < productDetail.models.length; i++) {
                let model = productDetail.models[i];
                if (modelName.toLowerCase() === model.name.toLowerCase()) {
                    try {
                        const resp = await productService.getPurchaseQuantity(shopId, productId, model.id, selectProduct.qty);
                        const data = resp.data;
                        setPurchaseQuantity(prev => ({
                            ...prev,
                            // maxPurchaseQuantity: data.maxPurchaseQuantity,
                            // modelId: data.modelId,
                            // price: data.price,
                            // priceBeforeDiscount: data.priceBeforeDiscount,
                            // stock: data.stock,
                            // modelName: data.modelName
                            ...data,
                        }))
                        console.log('purchase quantity', data);
                        return;
                    } catch (e) {
                        setPurchaseQuantity(prevState => ({
                            ...prevState,
                            stock: 0,
                        }))
                    }
                    return;
                } else {
                    setPurchaseQuantity(initPurchaseQuantity);
                }
            }
        }
    }

    const submitFeedback = async (e) => {
        let comment = myFeedback.comment;
        let rating = myFeedback.rating;
        if (!myFeedback || !rating || !comment) {
            return;
        }
        const data = await userService.saveFeedback(productId, rating, comment);
        setFeedbacks((prev) => ([data, ...prev]));
        setMyFeedbacks(initFeedback);
    }

    return (
        <Flex direction={'column'} minH={'100vh'} bg={'white'} bgColor={'gray.100'}>
            <Flex w={'100%'}>
                <Box flex={5} w={'100%'} bg={'white'}>
                    <VStack align={'start'} p={10} w={'100%'} bg={'white'}>
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
                        {/*PRICE*/}
                        {
                            productDetail.variants.length > 0 ? (
                                    (purchaseQuantity == null || purchaseQuantity.stock == 0) ?
                                        <HStack pt={4} spacing={2}>
                                            <Text
                                                fontSize={'x-large'}
                                                color={'red.800'}>

                                                {formatPrice(productDetail.minPrice) || 0}{' '}{"-"}{' '}
                                            </Text>
                                            <Text fontSize={'x-large'}>
                                                {formatPrice(productDetail.maxPrice) || 0}
                                            </Text>
                                        </HStack> : (<HStack pt={4} spacing={2}>
                                            <Text
                                                fontSize={'x-large'}
                                                color={'red.800'}>
                                                {formatPrice(purchaseQuantity.salesPrice) || 0}
                                            </Text>
                                        </HStack>)

                                ) :
                                (<HStack pt={4} spacing={2}>
                                    {productDetail.salesPrice !== productDetail.standardPrice && <Text
                                        fontSize={'x-large'}
                                        color={'red.800'}>
                                        {formatPrice(productDetail.standardPrice) || 0}{' '}{"-"}{' '}
                                    </Text>}
                                    <Text fontSize={'x-large'}>
                                        {formatPrice(productDetail.salesPrice) || 0}
                                    </Text>
                                </HStack>)

                        }

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

                            <Text fontWeight={'medium'}
                                  fontSize={16}> {(purchaseQuantity && purchaseQuantity.stock) ? purchaseQuantity.stock : productDetail.stock} {'stock available'}</Text>
                        </HStack>
                        {/*QUANTITY*/}
                        <Flex justifyContent={'space-between'} alignItems={'end'} w={'100%'}
                              align={'start'}>
                            <VStack align={'start'} maxW={'200px'}>
                                <Text>Quantity</Text>
                                <InputGroup>
                                    <InputLeftAddon
                                        onClick={() => {
                                            if (productDetail.models.length > 0) {
                                                if (!purchaseQuantity.stock && purchaseQuantity.stock == 0) {
                                                    return;
                                                }
                                                setSelectProduct((prevState => (
                                                    {
                                                        ...prevState,
                                                        qty: prevState.qty < purchaseQuantity.stock ? (prevState.qty + 1) : prevState.qty
                                                    }
                                                )))
                                            } else {
                                                setSelectProduct((prevState => (
                                                    {
                                                        ...prevState,
                                                        qty: prevState.qty >= 2 ? prevState.qty - 1 : 0
                                                    }
                                                )))
                                            }
                                        }}
                                        cursor={'pointer'} children={<MinusIcon/>}
                                    />
                                    <Input
                                        onChange={(e) => {
                                            // if (productDetail.models.length === 0 || (!purchaseQuantity.stock && purchaseQuantity.stock == 0)) {
                                            //     return;
                                            // }
                                            let parseValue = 1;
                                            if (e.target.value) {
                                                parseValue = parseInt(e.target.value);
                                            }
                                            setSelectProduct((prevState => (
                                                {
                                                    ...prevState,
                                                    qty: parseValue
                                                }
                                            )));

                                        }}
                                        value={selectProduct.qty || 0} type='number'/>
                                    <InputRightAddon
                                        onClick={() => {
                                            if (productDetail.models.length > 0) {
                                                if (!purchaseQuantity.stock && purchaseQuantity.stock == 0) {
                                                    return;
                                                }
                                                setSelectProduct((prevState => (
                                                    {
                                                        ...prevState,
                                                        qty: prevState.qty < purchaseQuantity.stock ? (prevState.qty + 1) : prevState.qty
                                                    }
                                                )))
                                            } else {
                                                setSelectProduct((prevState => (
                                                    {
                                                        ...prevState,
                                                        qty: prevState.qty + 1,
                                                        // qty: prevState.qty < purchaseQuantity.stock ? (prevState.qty + 1) : prevState.qty
                                                    }
                                                )))
                                            }

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

                        {/*BUTTON ADD TO CART*/}
                        <Flex>
                            <Button
                                onClick={() => addProductToCart()}
                                colorScheme={'blue'}
                                variant={'solid'}
                                aria-label={''} rightIcon={<AiOutlineShoppingCart/>}>
                                Add to cart
                            </Button>
                        </Flex>
                        {/*END OF BUTTON ADD TO CART*/}

                        {/*DESCRIPTION*/}
                        <Divider/>
                        {/*END OF DESCRIPTION*/}
                        <Skeleton isLoaded={true}>
                            <Text>
                                {productDetail.description}
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
                                {productDetail && productDetail.images && (< Box
                                    backgroundPosition="center"
                                    backgroundRepeat="no-repeat"
                                    backgroundSize="cover"
                                    backgroundImage={`${productDetail.images[imageIndex] !== undefined ? ('http://localhost:8080/api/v1/public/files/' + productDetail.images[imageIndex].image.name) : 'http://localhost:8080/api/v1/public/files/no-image'}`}
                                />)}

                            </AspectRatio>
                        </Box>
                        <Box flex={2} maxH={'50vh'}>
                            <Slider {...sliderSetting}  >
                                {
                                    productDetail.images.map((item, i) => (
                                        <AspectRatio key={i} ratio={1} maxW={'100px'} onClick={() => {
                                            setImageIndex(i);
                                        }}>
                                            <Image
                                                src={`http://localhost:8080/api/v1/public/files/${item.image.name}`}
                                                alt={'image'}/>
                                        </AspectRatio>
                                    ))
                                }
                            </Slider>
                        </Box>
                    </Flex>
                </Box>
            </Flex>
            <Box w={'100%'} h={2}/>
            <Box bg={'white'}>
                {/*SHOP DETAILS*/}
                {shopDetail && (<Flex px={10} py={4} alignItems={'center'} justifyContent={'space-between'}>
                    <VStack>
                        <Avatar
                            src={`http://localhost:8080/api/v1/public/files/${shopDetail.avt}`}
                            alt={'shop name'} size={'md'}/>
                        <Text fontSize={'16px'} fontWeight={'medium'}>{shopDetail.name}</Text>
                    </VStack>
                    <SimpleGrid pl={10} spacing={10} columns={3}>
                        <HStack>
                            <Text fontSize={'12'} color={'gray.600'}>Products</Text>
                            <Text color={'tomato'}>{shopDetail.productCount || 0}</Text>
                        </HStack>
                        <HStack>
                            <Text fontSize={'12'} color={'gray.600'}>Joined</Text>
                            <Text color={'tomato'}>{dateFormat(shopDetail.createDate, 'dd/mm/yyyy')}</Text>
                        </HStack> <HStack>
                        <Text fontSize={'12'} color={'gray.600'}>Joined</Text>
                        <Text color={'tomato'}>12</Text>
                    </HStack> <HStack>
                        <Text fontSize={'12'} color={'gray.600'}>Joined</Text>
                        <Text color={'tomato'}>12</Text>
                    </HStack> <HStack>
                        <Text fontSize={'12'} color={'gray.600'}>Joined</Text>
                        <Text color={'tomato'}>12</Text>
                    </HStack> <HStack>
                        <Text fontSize={'12'} color={'gray.600'}>Joined</Text>
                        <Text color={'tomato'}>12</Text>
                    </HStack>

                    </SimpleGrid>
                    <Spacer/>
                    <Flex>
                        <Button
                            onClick={() => history.push(`/shop/${shopDetail.id}`)}
                            size={'sm'} colorScheme={'orange'} variant={'outline'}>View Shop</Button>
                    </Flex>
                </Flex>)}
            </Box>
            {/*FEEDBACKS*/}
            <Box w={'100%'} h={2}/>
            <Flex bg={'white'} w={'100%'} p={10} direction={'column'} alignItems={'start'} justifyContent={'start'}>
                <Text>Feedbacks</Text>
                <Divider my={5}/>
                <Flex direction={'column'} w={'100%'} justifyContent={'start'} alignItems={'start'}>
                    <Flex w={'100%'} justifyContent={'start'} alignItems={'start'}>
                        <FormControl w={'60%'}>
                            {/*<FormLabel htmlFor='feedback'>Your feedback</FormLabel>*/}
                            <Input value={myFeedback.comment || ''}
                                   onChange={(e) => setMyFeedbacks((prev) => ({...prev, comment: e.target.value}))}
                                   id='feedback' type='text' size={'sm'}/>
                            <FormHelperText>We'll never share your email.</FormHelperText>
                        </FormControl>
                        <Box w={5}/>
                        <Button colorScheme={'orange'} size={'sm'} onClick={submitFeedback}
                                vaiant={'solid'}>Submit</Button>
                    </Flex>
                    <Box py={2}/>
                    <RatingStarts onClick={(i) => setMyFeedbacks((prev) => ({...prev, rating: (i++)}))}
                                  starts={myFeedback.rating || 0}/>
                </Flex>
                <Divider my={5}/>
                <Text> {JSON.stringify(myFeedback)}</Text>
                {feedbacks.map((item, i) => (
                    <Flex key={item.id || i} w={'100%'} direction={'column'} justifyContent={'start'} py={2}>
                        <Flex alignItems={'start'}>
                            <Avatar size='md' name='Ryan Florence' src='https://bit.ly/ryan-florence'/>
                            <Flex w={'100%'} px={2} direction={'column'}>
                                <Text fontSize={12}
                                      fontWeight={'normal'}>{item.user.username || item.user.email || ''}</Text>
                                <Text fontSize={14} fontWeight={'medium'}>{item.comment}</Text>
                                <RatingStarts starts={item.rating} onClick={() => {
                                }}/>
                            </Flex>
                        </Flex>
                        <Divider pt={2} w={'30%'}/>
                    </Flex>
                ))}

            </Flex>
            {/*END OF FEEDBACKS*/}
            {/*RELATED PRODUCT*/}
            <Box p={10} w={'100%'} bg={'white'}>
                <Flex w={'100%'} justifyContent={'start'}>
                    <Heading fontSize={'xx-large'}>Related Products</Heading>
                    <HStack>

                    </HStack>
                </Flex>
            </Box>
        </Flex>
    );
};

export default ProductDetailPage;