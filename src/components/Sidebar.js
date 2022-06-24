import React, {useState} from 'react'
import {
    Flex,
    Text,
    IconButton,
    Button,
    MenuList,
    Divider,
    Menu, MenuButton, MenuItem
    ,
    Avatar,
    Heading, useColorModeValue, AccordionItem, Accordion, AccordionButton, Box, AccordionIcon, AccordionPanel
} from '@chakra-ui/react'
import {
    FiMenu,
    FiHome,
    FiCalendar,
    FiUser,
    FiDollarSign,
    FiBriefcase,
    FiSettings,
} from 'react-icons/fi'
import {IoPawOutline} from 'react-icons/io5'
import {
    ChevronDownIcon,
} from '@chakra-ui/icons';
import NavItem from "./NavItem";
import {BiExit} from "react-icons/all";
import {useHistory} from "react-router-dom";


// let navItems = [
//     {icon: FiHome, title: "Dashboard", description: "This is the description for the dashboard.", active: true},
//     {icon: FiCalendar, title: "Calendar", description: "This is the description for the dashboard.", active: false},
//     {icon: FiUser, title: "Clients", description: "This is the description for the dashboard.", active: false},
//     {icon: IoPawOutline, title: "Animals", description: "This is the description for the dashboard.", active: false},
//     {icon: FiDollarSign, title: "Stocks", description: "This is the description for the dashboard.", active: false},
//     {icon: FiBriefcase, title: "Reports", description: "This is the description for the dashboard.", active: false},
//     {icon: FiSettings, title: "Settings", description: "This is the description for the dashboard.", active: false},
// ]
const Sidebar = () => {
    const history = useHistory();
    const [navSize, setNavSize] = useState('large');
    const [navItems, setNavItems] = useState([
        {
            path: '/dashboard',
            icon: FiHome,
            title: "Dashboard",
            description: "This is the description for the dashboard.",
            active: true,
            children: []
        },
        {
            icon: FiCalendar, title: "Product", description: "T", active: false, children: [
                {
                    title: 'All Products',
                    path: '/dashboard/products'
                },
                {
                    title: 'All Products',
                    path: '/dashboard/products'
                },
                {
                    title: 'All Products',
                    path: '/dashboard/products'
                },
                {
                    title: 'All Products',
                    path: '/dashboard/products'
                }
            ]
        },
        {icon: FiCalendar, title: "Calendar", description: "This is the description for the dashboard.", active: false},
        {icon: FiUser, title: "Clients", description: "This is the description for the dashboard.", active: false},
        {
            icon: IoPawOutline,
            title: "Animals",
            description: "This is the description for the dashboard.",
            active: false
        },
        {icon: FiDollarSign, title: "Stocks", description: "This is the description for the dashboard.", active: false},
        {icon: FiBriefcase, title: "Reports", description: "This is the description for the dashboard.", active: false},
        {icon: FiSettings, title: "Settings", description: "This is the description for the dashboard.", active: false},
    ]);
    return (
        <Flex
            top={0}
            zIndex={999}
            borderRightWidth="1px"
            borderRightColor={useColorModeValue('gray.200', 'gray.700')}
            transition="all 0.3s"
            bg={'white'}
            bgColor={'white'}
            pos="sticky"
            // left="5"
            h="100vh"

            // maxH={'100vh'}
            // marginTop="2.5vh"
            boxShadow="0 4px 12px 0 rgba(0, 0, 0, 0.05)"
            // borderRadius={navSize === "small" ? "15px" : "30px"}
            w={navSize === "small" ? "75px" : "200px"}
            flexDir="column"
            justifyContent="space-between"
        >
            <Flex
                css={{
                    '&::-webkit-scrollbar': {
                        width: '4px',
                    },
                    '&::-webkit-scrollbar-track': {
                        width: '6px',
                    },
                    '&::-webkit-scrollbar-thumb': {
                        background: 'transparent',
                        borderRadius: '24px',
                    },
                }}
                overflowY={'scroll'}
                p="5%"
                flexDir="column"
                w="100%"
                alignItems={navSize === "small" ? "center" : "flex-start"}
                as="nav"
            >
                <IconButton
                    background="none"
                    mt={5}
                    _hover={{background: 'none'}}
                    icon={<FiMenu/>}
                    onClick={() => {
                        if (navSize === "small")
                            setNavSize("large")
                        else
                            setNavSize("small")
                    }}
                />

                {/*<NavItem*/}
                {/*    active*/}
                {/*    navSize={navSize} icon={FiHome} title="Dashboard"*/}
                {/*    description="This is the description for the dashboard."/>*/}
                {/*<NavItem*/}
                {/*    navSize={navSize} icon={FiCalendar} title="Calendar"/>*/}
                {/*<NavItem navSize={navSize} icon={FiUser} title="Clients"/>*/}
                {/*<NavItem navSize={navSize} icon={IoPawOutline} title="Animals"/>*/}
                {/*<NavItem navSize={navSize} icon={FiDollarSign} title="Stocks"/>*/}
                {/*<NavItem navSize={navSize} icon={FiBriefcase} title="Reports"/>*/}
                {/*<NavItem navSize={navSize} icon={FiSettings} title="Settings"/>*/}
                {
                    navItems.map((item, i) => (
                        <NavItem
                            path={item.path}
                            children={item.children}
                            onClick={() => {
                                let map = navItems.map((navItem, index) =>
                                    index === i
                                        ? ({
                                            ...navItem,
                                            active: true
                                        })
                                        : ({
                                            ...navItem,
                                            active: false
                                        }))
                                setNavItems(map);
                            }}
                            key={i} navSize={navSize} icon={item.icon} title={item.title}
                            description={item.description}
                            active={item.active}
                        />

                    ))
                }
            </Flex>

            <Flex
                p="5%"
                flexDir="column"
                w="100%"
                alignItems={navSize === "small" ? "center" : "flex-start"}
                mb={2}
            >
                <Divider display={navSize === "small" ? "none" : "flex"}/>

                <Menu>
                    <MenuButton

                        aria-label='Options'
                        variant='none'
                        as={IconButton} rightIcon={<ChevronDownIcon/>}>
                        <Flex
                            // mt={4}
                            align="center">
                            <Avatar size="sm" src="avatar-1.jpg"/>
                            <Flex flexDir="column"
                                // ml={4}
                                  display={navSize === "small" ? "none" : "flex"}>
                                <Heading as="h3" size="sm">Sylwia Weller</Heading>
                                <Text color="gray">Admin</Text>
                            </Flex>
                        </Flex>
                    </MenuButton>
                    <MenuList>
                        <MenuItem>Create a Copy</MenuItem>
                        <MenuItem>Mark as Draft</MenuItem>
                        <MenuItem>Delete</MenuItem>
                        <MenuItem>Attend a Workshop</MenuItem>
                        <MenuItem
                            onClick={() => history.push('/')}
                            icon={<BiExit/>}>Exit</MenuItem>

                    </MenuList>
                </Menu>
            </Flex>
        </Flex>
    )
};

export default Sidebar;