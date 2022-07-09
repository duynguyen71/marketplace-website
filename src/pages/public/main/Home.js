import React, {useEffect} from 'react';
import {
    Box,
    Flex,
    Heading,
    HStack,
    Icon,
    Image,
    Skeleton,
    Stack,
    Grid,
    Badge,
    GridItem,
    useColorModeValue,
    VStack,
    Text,
    Button,
    IconButton,
    CloseButton,
    InputGroup,
    InputLeftElement,
    Input,
    AspectRatio,
    SimpleGrid
} from "@chakra-ui/react";
import {Link, Route, Switch} from "react-router-dom";
import {AiOutlineShopping, AiOutlineShoppingCart, FaArrowRight} from "react-icons/all";
import SimpleThreeColumns from "../../../components/Feature";
import Footer from "../../../components/Footer";
import HeaderWithBanner from "../../../components/Public/HeaderWithBanner";
import HomeMain from "../../../components/Public/HomeMain";
import Checkout from "../checkout/Checkout";
import ProductsPage from "../product/ProductsPage";
import ProductDetailPage from "../product/ProductDetailPage";
import ShoppingCart from "../cart/ShoppingCart";
import Login from "../login/Login";
import Register from "../register/Register";
import ShopDetail from "../shop/ShopDetail";

const Home = () => {
    useEffect(() => {
        document.title = "Sheppo | Home"
    }, []);
    return (
        <Flex direction={'column'}>
            <HeaderWithBanner/>
            <Box minH={'100vh'}>
                <Switch>
                    <Route path={'/checkout'} component={props => <Checkout {...props}/>}/>
                    <Route path={'/cart'} component={props => <ShoppingCart {...props}/>}/>
                    {/*<Route path={'/product-details/:id'} component={props => <ProductDetailPage {...props}/>}/>*/}
                    <Route path={'/products/:category'} component={props => <ProductsPage {...props}/>}/>
                    <Route path={'/products'} component={props => <ProductsPage {...props}/>}/>
                    <Route path={'/shop/:shopId/products/:productId'}
                           component={props => <ProductDetailPage {...props}/>}/>
                    <Route path={'/shop/:id'} component={ShopDetail}/>
                    <Route path={'/'} component={props => <HomeMain {...props}/>}/>
                </Switch>
            </Box>
            {/*Footer*/}
            <Footer/>
        </Flex>
    );
};

export default Home;