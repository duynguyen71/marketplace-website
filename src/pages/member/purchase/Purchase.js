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

import OrderData from "./OrderData";
import {OrderStatus} from "../../../constants/order-staus";


const Purchase = () => {

    useEffect(() => {
    }, []);

    return (
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
                    <TabPanel w={'100%'} m={0} bg={'gray.100'} p={0}>
                        <OrderData type={null}/>
                    </TabPanel>
                    <TabPanel>
                        <OrderData type={OrderStatus.TO_PAY}/>
                    </TabPanel>
                    <TabPanel>
                        <OrderData type={OrderStatus.TO_SHIP}/>

                    </TabPanel>
                    <TabPanel>
                        <OrderData type={OrderStatus.TO_RECEIVE}/>

                    </TabPanel>
                    <TabPanel>
                        <OrderData type={OrderStatus.COMPLETED}/>

                    </TabPanel>
                    <TabPanel>
                        <OrderData type={OrderStatus.CANCELLED}/>
                    </TabPanel>
                </TabPanels>
            </Tabs>
        </Flex>
    );
};

export default Purchase;


