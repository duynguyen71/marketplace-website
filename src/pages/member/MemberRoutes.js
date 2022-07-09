import React from 'react';
import {Route, Switch, useLocation} from "react-router-dom";
import Purchase from "./purchase/Purchase";
import MyAccount from "./account/MyAccount";
import {Box, Drawer, DrawerContent, Flex, IconButton, Text, useColorModeValue, useDisclosure} from "@chakra-ui/react";
import HeaderWithBanner from "../../components/Public/HeaderWithBanner";
import * as PropTypes from "prop-types";
import {FiCalendar, FiHome, FiMenu} from "react-icons/fi";
import NavItem from "../../components/NavItem";




const MemberRoutes = () => {
    const {isOpen, onOpen, onClose} = useDisclosure();

    return (
        <Flex direction={'column'} minH={'100vh'} bg={'gray.100'} w={'100%'}>
            <HeaderWithBanner/>
            <Flex p={10} w={'100%'} justifyContent={'center'}>
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
                <Switch>
                    <Route
                        exact
                        path={"/user/purchase"}
                        component={(props) => <Purchase {...props} />}
                    />
                    <Route
                        exact
                        path={"/user/account"}
                        component={(props) => <MyAccount {...props} />}
                    />
                </Switch>
            </Flex>

        </Flex>
    );
};

export default MemberRoutes;

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
            {LinkItems.map((link) => {
                console.log(link);
                return <NavItem key={link.name} icon={link.icon} path={link.path} title={link.title}/>
            })}
        </Box>
    );
};
const LinkItems = [
    {
        path: '/user/account',
        icon: FiHome,
        title: "Account",
        description: "This is the description for the dashboard.",
        active: true,
        children: []
    },
    {
        icon: FiCalendar, title: "Purchase", description: "T", active: false, path: '/user/purchase',

    },

]