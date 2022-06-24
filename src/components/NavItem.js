import React from 'react'
import {
    Flex,
    Text,
    Icon,
    Link,
    Menu,
    MenuButton,
    MenuList,
    MenuItem,
    MenuDivider,
    Popover,
    PopoverTrigger,
    Button,
    PopoverArrow,
    PopoverBody,
    PopoverContent,
    PopoverHeader,
    PopoverCloseButton
} from '@chakra-ui/react';
import {Link as RLink} from 'react-router-dom';
import NavHoverBox from "./NavHoverBox";


export default function NavItem({icon, title, description, active, navSize, onClick, children, path}) {
    return (
        <Flex
            mt={'0.75rem'}
            // mt={30}
            flexDir="column"
            w="100%"
            alignItems={navSize == "small" ? "center" : "flex-start"}
        >


            <Menu placement="right">
                {!path && <Link
                    backgroundColor={active && "#AEC8CA"}
                    p={3}
                    borderRadius={8}
                    _hover={{textDecor: 'none', backgroundColor: "#AEC8CA"}}
                    w={navSize == "large" && "100%"}
                >
                    <MenuButton w="100%" onClick={onClick}>
                        <Flex>
                            <Icon as={icon} fontSize="xl" color={active ? "#82AAAD" : "gray.500"}/>
                            <Text ml={5} display={navSize == "small" ? "none" : "flex"}>{title}</Text>
                        </Flex>
                    </MenuButton>
                </Link>}
                {path &&
                <Link
                    // onClick={onClick}
                    backgroundColor={active && "#AEC8CA"}
                    p={3}
                    borderRadius={8}
                    _hover={{textDecor: 'none', backgroundColor: "#AEC8CA"}}
                    w={navSize == "large" && "100%"}
                >
                    <RLink to={path}>
                        <MenuButton w="100%" onClick={onClick}
                        >
                            <Flex>
                                <Icon as={icon} fontSize="xl" color={active ? "#82AAAD" : "gray.500"}/>
                                <Text ml={5} display={navSize == "small" ? "none" : "flex"}>{title}</Text>
                            </Flex>
                        </MenuButton>
                    </RLink>

                </Link>
                }
                {
                    children && children.length > 0 && <MenuList
                        py={0}
                        // border="none"
                        w={200}
                        // h={200}
                        borderColor={'gray.400'}
                        ml={5}
                    >

                        {
                            children.map((child, i) => (
                                <>
                                    <RLink key={i} to={child.path}>
                                        <MenuItem>
                                            {child.title}
                                        </MenuItem>
                                    </RLink>
                                    {/*<MenuDivider/>*/}
                                </>

                            ))
                        }
                        {/*<RLink to="/dashboard/products">*/}
                        {/*    <MenuItem>*/}
                        {/*        BHdfh*/}
                        {/*    </MenuItem>*/}
                        {/*</RLink>*/}
                        {/*<MenuItem>Open Closed Tab</MenuItem>*/}
                        {/*<MenuItem>Open File</MenuItem>*/}
                        {/*<NavHoverBox title={title} icon={icon} description={description}/>*/}
                    </MenuList>
                }
            </Menu>
        </Flex>
    )
}