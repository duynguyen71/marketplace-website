import React from 'react';
import {
    IconButton,
    Avatar,
    Box,
    CloseButton,
    Flex,
    HStack,
    VStack,
    Icon,
    useColorModeValue,
    Link,
    Text,
    useDisclosure,
    BoxProps,
    FlexProps,
    Menu,
    MenuButton,
    MenuDivider,
    MenuItem,
    MenuList, Heading,

} from '@chakra-ui/react';
import {
    FiHome,
    FiTrendingUp,
    FiCompass,
    FiStar,
    FiSettings,
    FiMenu,
    FiBell,
    FiChevronDown,
} from 'react-icons/fi';
import Sidebar from "./Sidebar";
import {useDispatch, useSelector} from "react-redux";
import {authAction} from "../actions/auth.action";
import {useHistory} from "react-router-dom";
import authenticateReducer from "../reducers/authentication.reducer";

const LinkItems = [
    {name: 'Home', icon: FiHome},
    {name: 'Trending', icon: FiTrendingUp},
    {name: 'Explore', icon: FiCompass},
    {name: 'Favourites', icon: FiStar},
    {name: 'Settings', icon: FiSettings},
];

export default function SidebarWithHeader({children}) {
    const {isOpen, onOpen, onClose} = useDisclosure();
    const {user} = useSelector((state) => state.authenticateReducer);
    return (
        <>
            <Flex zIndex={999} bg={'grey.100'} w={'100%'} minH={'100vh'}>
                <Sidebar w={'100%'}/>
                <MobileNav user={user} onOpen={onOpen} children={children}/>
            </Flex>
        </>
    );
}


const MobileNav = ({onOpen, children, user, ...rest}) => {
    const history = useHistory();
    return (
        <Flex direction={'column'} w={'100%'}>
            <Flex
                position={'relative'}
                zIndex={100}
                bg={'white'}
                bgColor={'white'}
                // bg={'white'}
                w={'100%'}
                // ml={{base: 0, md: 60}}
                // px={{base: 4, md: 4}}
                height="20"
                alignItems="center"
                bg={useColorModeValue('white', '#EDF2F7')}
                borderBottomWidth="1px"
                borderBottomColor={useColorModeValue('#E2E8F0', '#EDF2F7')}
                justifyContent={{base: 'space-between', md: 'flex-end'}}
                {...rest}>
                <IconButton
                    display={{base: 'flex', md: 'none'}}
                    onClick={onOpen}
                    variant="outline"
                    aria-label="open menu"
                    icon={<FiMenu/>}
                />
                <Text
                    color={'red'}
                    display={{base: 'flex', md: 'none'}}
                    fontSize="2xl"
                    fontFamily="monospace"
                    fontWeight="bold">
                    Logo
                </Text>

                <HStack
                    spacing={{base: '0', md: '6'}}
                >
                    <IconButton
                        size="lg"
                        variant="ghost"
                        aria-label="open menu"
                        icon={<FiBell/>}
                    />
                    <Flex alignItems={'center'}>
                        <Menu>
                            <MenuButton
                                // py={2}
                                mr={'10'}
                                transition="all 0.3s"
                                _focus={{boxShadow: 'none'}}>
                                <HStack>
                                    <Avatar
                                        size={'sm'}
                                        src={
                                            'https://images.unsplash.com/photo-1619946794135-5bc917a27793?ixlib=rb-0.3.5&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&s=b616b2c5b373a80ffc9636ba24f7a4a9'
                                        }
                                    />
                                    <VStack
                                        display={{base: 'none', md: 'flex'}}
                                        alignItems="flex-start"
                                        spacing="1px"
                                        ml="2">
                                        <Text fontSize="sm">{user.username || user.email || ''}</Text>
                                        <Text fontSize="xs" color="gray.600">
                                            Admin
                                        </Text>
                                    </VStack>
                                    <Box display={{base: 'none', md: 'flex'}}>
                                        <FiChevronDown/>
                                    </Box>
                                </HStack>
                            </MenuButton>
                            <MenuList
                                bg={useColorModeValue('white', 'gray.900')}
                                borderColor={useColorModeValue('gray.200', 'gray.700')}>
                                <MenuItem>Profile</MenuItem>
                                <MenuItem>Settings</MenuItem>
                                <MenuItem>Billing</MenuItem>
                                <MenuItem onClick={() => history.replace('/')}>Exit</MenuItem>
                                <MenuDivider/>
                                <MenuItem
                                    onClick={() => {
                                        authAction.logout();
                                        history.push('/');
                                    }}
                                >Sign out</MenuItem>
                            </MenuList>
                        </Menu>
                    </Flex>
                </HStack>
            </Flex>
            <Box bg={'#EDF2F7'} p={4} minH={'100vh'}>
                {children}
            </Box>
        </Flex>
    );
};