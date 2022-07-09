import React, {useEffect, useState} from 'react';
import {
    Box, Button,
    Divider,
    Flex,
    HStack,
    Input, Radio, RadioGroup,
    Tab,
    TabList,
    TabPanel,
    TabPanels,
    Tabs,
    Text,
    VStack
} from "@chakra-ui/react";
import {useSelector} from "react-redux";
import {
    FormControl,
    FormLabel,
    FormErrorMessage,
    FormHelperText,
} from '@chakra-ui/react'
import {authAction} from "../../../actions/auth.action";

const MyAccount = () => {

    const {user} = useSelector(state => state.authenticateReducer, () => true);
    const [userState, setUserState] = useState({});
    useEffect(() => {
        setUserState(user);
    }, [user]);
    return (
        <Flex direction={'column'} bg={'white'} borderRadius={'xs'} p={5} m={0} w={'100%'} flex={10}
              position={'relative'}>
            <VStack align={'start'} alignItems={'start'}>
                <Text fontWeight={'medium'}>My Profile</Text>
                <Text color={'gray.400'}>Manage and protect your account</Text>
            </VStack>
            <Divider/>
            <Box height={'5vh'}/>
            <VStack align={'start'} alignItems={'start'}>
                <HStack>
                    <Text fontWeight={'medium'}>Username</Text>
                    <Text textColor={'gray.400'}>{userState.username || ''}</Text>
                </HStack>

                <FormControl py={5}>
                    <FormLabel fontWeight={'medium'} htmlFor='fullName'>Name</FormLabel>
                    <Input
                        defaultValue={userState.fullName || ""}
                        onChange={(e) => {
                            let temp = {...userState, fullName: e.target.value};
                            setUserState(temp);
                            // authAction.updateUserDetail(temp);
                        }}
                        size={'sm'} id='fullName' type={'text'}/>

                </FormControl>{userState.shop && <FormControl>
                <FormLabel fontWeight={'medium'} htmlFor='shop-name'>Shop Name</FormLabel>
                <Input
                    defaultValue={userState.shopName || ""}
                    onChange={(e) => {
                        let temp = {...userState, shopName: e.target.value};
                        setUserState(temp);
                        // authAction.updateUserDetail(temp);
                    }}
                    size={'sm'} id='shop-name' type={'text'}/>

            </FormControl>}
                <FormControl as='fieldset'>
                    <FormLabel fontWeight={'medium'} as='legend'>Gender</FormLabel>
                    <RadioGroup onChange={(v) => {
                        let temp = {...user, gender: parseInt(v)};
                        setUserState(temp);
                        // authAction.updateUserDetail(temp);
                    }} defaultValue={user.gender.toString() || '3'}>
                        <HStack spacing='24px'>
                            <Radio value='1'>Male</Radio>
                            <Radio value='2'>FeMale</Radio>
                            <Radio value='3'>Other</Radio>
                        </HStack>
                    </RadioGroup>
                </FormControl>
            </VStack>
            <HStack alignSelf={'end'}>
                <Button
                    onClick={async () => {
                        console.log('update user detail');
                        await authAction.saveUserDetail(userState);
                    }}
                    variant={'solid'} colorScheme={'orange'} size={'md'} alignSelf={'end'}>Save</Button>
            </HStack>

        </Flex>
    )
        ;
};

export default MyAccount;