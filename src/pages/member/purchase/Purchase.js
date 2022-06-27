import React, {useEffect, useState} from 'react';
import {
    Container, TabsTabList, Tab, TabPanels, TabPanel, TabList, Tabs, Flex, Box, IconButton,
    CloseButton,
    Icon,
    useColorModeValue,
    Link,
    Drawer,
    DrawerContent,
    Text,
    useDisclosure,
    BoxProps,
    FlexProps,
} from "@chakra-ui/react";
import {
    FiHome,
    FiTrendingUp,
    FiCompass,
    FiStar,
    FiSettings,
    FiMenu,
} from 'react-icons/fi';
import SidebarWithHeader from "../../../components/SidebarWithHeader";
import {IconType} from 'react-icons';
import {ReactText} from 'react';
import userService from '../../../service/user.service';

import HeaderWithBanner from "../../../components/Public/HeaderWithBanner";
import OrderData from "./OrderData";
import {OrderStatus} from "../../../constants/order-staus";


const LinkItems = [
    {name: 'Home', icon: FiHome},
    {name: 'Trending', icon: FiTrendingUp},
    {name: 'Explore', icon: FiCompass},
    {name: 'Favourites', icon: FiStar},
    {name: 'Settings', icon: FiSettings},
];


const Purchase = (callbackfn, thisArg) => {
    const {isOpen, onOpen, onClose} = useDisclosure();

    useEffect(() => {
    }, []);

    return (
        <Flex direction={'column'} minH={'100vh'} bg={'gray.100'} w={'100%'}>
            <HeaderWithBanner/>
            <Flex p={10} w={'100%'} justifyContent={'center'} alignItems={'start'}>
                {/*TAB BAR*/}
                <Flex w={'100%'} flex={2}>
                    <Box minH="100vh" bg={useColorModeValue('gray.100', 'gray.900')}>
                        <SidebarContent
                            onClose={() => onClose}
                            display={{base: 'none', md: 'block'}}
                        />
                        <Drawer
                            autoFocus={false}
                            isOpen={isOpen}
                            placement="left"
                            onClose={onClose}
                            returnFocusOnClose={false}
                            onOverlayClick={onClose}
                            size="full">
                            <DrawerContent>
                                <SidebarContent onClose={onClose}/>
                            </DrawerContent>
                        </Drawer>
                        {/* mobilenav */}
                        <MobileNav display={{base: 'flex', md: 'none'}} onOpen={onOpen}/>
                        <Box ml={{base: 0, md: 60}} p="4">
                        </Box>
                    </Box>
                </Flex>
                {/*TAB BAR*/}
                <Flex bg={'gray.200'} p={0} m={0} w={'100%'} flex={10} position={'relative'}>
                    <Tabs position={'relative'} isFitted p={0} align={'center'} isLazy w={'100%'}>
                        <TabList bg={'white'} w={'100%'}>
                            <Tab>All</Tab>
                            <Tab>To Pay</Tab>
                            <Tab>To Ship</Tab>
                            <Tab>To Receive</Tab>
                            <Tab>Completed</Tab>
                            <Tab>Cancelled</Tab>
                        </TabList>
                        <Box height={10} bg={'gray.100'}/>
                        <TabPanels w={'100%'} m={0} p={0}>
                            {/* initially mounted */}
                            <TabPanel w={'100%'} m={0} bg={'gray.100'} p={0}>
                                <OrderData type={null}/>)
                            </TabPanel>
                            {/* initially not mounted */}
                            <TabPanel>
                                <OrderData type={OrderStatus.TO_PAY}/>)
                            </TabPanel>
                            <TabPanel>
                                <OrderData type={OrderStatus.TO_SHIP}/>)

                            </TabPanel>
                            <TabPanel>
                                <OrderData type={OrderStatus.TO_RECEIVE}/>)

                            </TabPanel>
                            <TabPanel>
                                <OrderData type={OrderStatus.COMPLETED}/>)

                            </TabPanel>
                            <TabPanel>
                                <OrderData type={OrderStatus.CANCELLED}/>)
                            </TabPanel>
                        </TabPanels>
                    </Tabs>
                </Flex>

            </Flex>
        </Flex>
    );
};

export default Purchase;


const SidebarContent = ({onClose, ...rest}) => {
    return (
        <Box
            pt={4}
            bg={useColorModeValue('white', 'gray.900')}
            borderRight="1px"
            borderRightColor={useColorModeValue('gray.200', 'gray.700')}
            w={{base: 'full', md: 60}}
            pos="fixed"
            h="full"
            {...rest}>
            {/*<Flex h="20" alignItems="center" mx="8" justifyContent="space-between">*/}
            {/*    <CloseButton display={{base: 'flex', md: 'none'}} onClick={onClose}/>*/}
            {/*</Flex>*/}
            {LinkItems.map((link) => (
                <NavItem key={link.name} icon={link.icon}>
                    {link.name}
                </NavItem>
            ))}
        </Box>
    );
};
const NavItem = ({icon, children, ...rest}) => {
    return (
        <Link href="#" style={{textDecoration: 'none'}} _focus={{boxShadow: 'none'}}>
            <Flex
                align="center"
                p="4"
                mx="4"
                borderRadius="lg"
                role="group"
                cursor="pointer"
                _hover={{
                    bg: 'tomato',
                    color: 'white',
                }}
                {...rest}>
                {icon && (
                    <Icon
                        mr="4"
                        fontSize="16"
                        _groupHover={{
                            color: 'white',
                        }}
                        as={icon}
                    />
                )}
                {children}
            </Flex>
        </Link>
    );
};

const MobileNav = ({onOpen, ...rest}) => {
    return (
        <Flex
            ml={{base: 0, md: 60}}
            px={{base: 4, md: 24}}
            height="20"
            alignItems="center"
            bg={useColorModeValue('white', 'gray.900')}
            borderBottomWidth="1px"
            borderBottomColor={useColorModeValue('gray.200', 'gray.700')}
            justifyContent="flex-start"
            {...rest}>
            <IconButton
                variant="outline"
                onClick={onOpen}
                aria-label="open menu"
                icon={<FiMenu/>}
            />

            <Text fontSize="2xl" ml="8" fontFamily="monospace" fontWeight="bold">
                Logo
            </Text>
        </Flex>
    );
};