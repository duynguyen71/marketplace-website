import React, {useEffect, useReducer, useState} from 'react';
import {
    AspectRatio,
    Avatar,
    Box, Button,
    Flex,
    FormControl, FormHelperText,
    Icon,
    IconButton,
    Image, Input,
    Skeleton,
    Text,
    Textarea, useDisclosure,
    VStack
} from "@chakra-ui/react";
import {AddIcon, EditIcon} from "@chakra-ui/icons";
import {shopService} from "../../../service/shopService";
import authenticateReducer from "../../../reducers/authentication.reducer";
import {useHistory} from "react-router-dom";
import {useSelector} from "react-redux";
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
} from '@chakra-ui/react';
import {isImage} from "../../../utities/ValidationUtil";
import productService from "../../../service/product.service";
import LoadingWidget from "../../../components/LoadingWidget";

const ShopDecor = () => {
    const history = useHistory();
    const {isOpen, onOpen, onClose} = useDisclosure();
    const [shop, setShop] = useState({name: '', description: '', avt: '', banner: '',});
    const {user} = useSelector((state) => state.authenticateReducer, () => true);
    const [selectedAvtFile, setSelectedAvtFile] = useState(null);
    const [selectedBgFile, setSelectedBgFile] = useState(null);
    const [isLoading, setLoading] = useState(false);
    useEffect(() => {
        shopService.getShopDetail(user.shop.id).then(data => setShop({...data}));
    }, [])


    const handleUpdate = async () => {
        setLoading(true);
        let shopTemp = {...shop};
        if (selectedAvtFile != null) {
            const resp = await productService.saveFile(selectedAvtFile);
            const fileUpload = resp.data;
            shopTemp = {
                ...shopTemp,
                avt: fileUpload.name
            }
            console.log(fileUpload);
        }
        if (selectedBgFile != null) {
            const resp = await productService.saveFile(selectedBgFile);
            const fileUpload = resp.data;
            shopTemp = {
                ...shopTemp,
                banner: fileUpload.name
            }
        }
        const data = await shopService.updateShop(shopTemp);
        onClose();
        setLoading(false);

    }
    const getPath = (file) => {
        if (file) {
            let path = (window.URL || window.webkitURL)?.createObjectURL(file);
            return path;
        }
        return null;
    };
    return (
        <Flex w={'100%'} direction={'column'}>

            <Box
                w={'100%'}
                position={'relative'}
            >
                <Box
                    bg={'gray.300'}
                    w={'100%'}
                    maxH="250px"
                    minH="250px">
                    <Image
                        bg={'gray'}
                        src={selectedBgFile ? getPath(selectedBgFile) : ('http://localhost:8080/api/v1/public/files/' + shop.banner)}
                        alt="Lovely Image"
                        fallback={<Skeleton/>}
                        maxH="250px"
                        w={'100%'}

                        minW="300px"
                        objectFit="cover"
                        flex="1"
                    />
                </Box>
                <Box position={'absolute'} top={5} left={5} boxShadow={'md'} bg={'white'} borderRadius={'md'}
                     minW={'200px'} py={2}>
                    <VStack>
                        <Avatar
                            src={selectedAvtFile ? getPath(selectedAvtFile) : ('http://localhost:8080/api/v1/public/files/' + shop.avt)}
                            alt={'shop avt'} size={'xl'}/>
                        <Text>{shop.name}</Text>
                    </VStack>
                </Box>
                <IconButton onClick={onOpen} size={'xs'} aria-label={''} icon={<EditIcon/>} position={'absolute'}
                            top={8} left={8}/>
                {/*edit bg*/}
                <label htmlFor={'shop-bg'}>
                    <Box position={'absolute'} bottom={8}
                         right={8}>
                        <EditIcon/>
                    </Box>
                </label>
                <Input
                    id={'shop-bg'}
                    onChange={(e) => {
                        let file = e.target.files[0];
                        if (isImage(file)) {
                            setSelectedBgFile(file);
                        }

                    }}

                    display={"none"}
                    visibility={"none"}
                    type={"file"}
                />
            </Box>
            <Box p={4} bg={'white'} my={4}>
                {/*<FormControl>*/}
                <Textarea value={shop.description || ''} onChange={(e) => {
                    setShop((prev) => ({
                        ...prev,
                        description: e.target.value
                    }))
                }}/>
                {/*</FormControl>*/}
            </Box>
            <Button
                colorScheme={'green'}
                alignSelf={'end'}
                onClick={handleUpdate}
                size={'md'} variant={'solid'}>Update</Button>
            <Modal isOpen={isOpen} onClose={onClose} isCentered size={'xl'}>
                <ModalOverlay/>
                <ModalContent>
                    <ModalHeader>Modal Title</ModalHeader>
                    <ModalCloseButton/>
                    <ModalBody>
                        <Flex alignItems={'center'} w={'100%'} direction={'column'}>
                            <FormControl htmlFor={'shop-name'}>
                                <Input value={shop.name}
                                       id={'shop-name'}
                                       onChange={(e) => {
                                           setShop(prev => ({...prev, name: e.target.value}))
                                       }}/>
                                <FormHelperText>Shop name</FormHelperText>
                            </FormControl>
                            <Box h={4}/>
                            <label htmlFor='shop-avt'>
                                {selectedAvtFile ?
                                    <Avatar
                                        alt={'shop avt'}
                                        size={'xl'}
                                        src={getPath(selectedAvtFile)}

                                    />
                                    : <Avatar alt={'shop avt'} size={'xl'}/>}
                            </label>
                            <Input
                                id={'shop-avt'}
                                onChange={(e) => {
                                    let file = e.target.files[0];
                                    if (isImage(file)) {
                                        setSelectedAvtFile(file);
                                    }

                                }}

                                display={"none"}
                                visibility={"none"}
                                type={"file"}
                            />

                        </Flex>
                    </ModalBody>

                    <ModalFooter>
                        <Button colorScheme='blue' mr={3} onClick={onClose}>
                            Close
                        </Button>
                        <Button
                            onClick={onClose}
                            variant='ghost'>OK</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>

            <LoadingWidget isLoading={isLoading}/>
        </Flex>
    );

};

export default ShopDecor;