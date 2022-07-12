import React, {useRef, useState} from "react";
import {useEffect, useMemo} from "react";
import {useSelector} from "react-redux";
import {useHistory, useParams} from "react-router-dom";
import AdminProductAction from "../../../actions/AdminProductAction";
import {
    Flex,
    Text,
    FormControl,
    Input,
    HStack,
    VStack,
    Wrap,
    Divider,
    Box,
    FormHelperText,
    Textarea,
    Icon,
    SimpleGrid,
    GridItem,
    Button,
    InputGroup,
    TableContainer, Table, Thead, Tr, Th, Tbody, Td, ButtonGroup, FormLabel,
} from "@chakra-ui/react";
import SaveProductBottomBar from "../components/SaveProductBottomBar";
import productService from "../../../service/product.service";
import ImgSelector from "../components/ImgSelector";
import SelectedCategories from "../../../components/SelectedCategory";
import {AddIcon, EditIcon} from "@chakra-ui/icons";
import ProductAttrSelect from "../../../components/ProductAttrSelect";
import {IoIosRemoveCircleOutline, TiDeleteOutline} from "react-icons/all";
import QuickScrollInto from "../create_product/QuickScrollInto";
import {productNewAction} from "../../../actions/product-new.action";
import {shopService} from "../../../service/shopService";
import SavedImageSelector from "../components/SavedImageSelector";

const EditProductPage = () => {
    const history = useHistory();
    //get product id on param
    const {productId} = useParams();
    //ref
    const productBasicDetailRef = useRef(null);
    const productAttributeRef = useRef(null);
    const productVariantTableRef = useRef(null);
    const desRef = useRef(null);
    const productNameRef = useRef(null);
    //product detail
    const [product, setProduct] = useState({
        variants: [],
    });
    //error state
    const [descriptionErr, setDescriptionErr] = useState("");
    const [productBrandErr, setProductBrandErr] = useState("");
    const [productNameErr, setProductNameErr] = useState("");
    const [variantPriceErr, setVariantPriceErr] = useState({
        index: "",
        message: "",
    });
    const [variantStockErr, setVariantStockErr] = useState({
        index: "",
        message: "",
    });
    //default state
    const [images, setImages] = useState(new Array(4));
    const [savedImages, setSavedImages] = useState([]);
    const [columns, setColumns] = useState(["Variant", "Price", "Stock", "SKU"]);

    const [brands, setBrands] = useState([]);

    useEffect(async () => {
        await shopService.getProductDetail(productId).then(data => {
            setProduct(data);
            console.log(data);
            document.title = 'Edit | ' + data?.name;
            setSavedImages(data.images || []);
        });
        productService.getBrands().then(data => setBrands(data.data));
    }, []);
    const [variantOption, setVariantOption] = useState({
        price: "",
        stock: "",
        sku: "",
    });
    const applyVariantOption = () => {
        let models = product.models;
        models = models.map((item) => ({
            ...item,
            price: variantOption.price,
            stock: variantOption.stock,
            sku: variantOption.sku,
            status: 1,
        }));
        let tmp = product;
        tmp = {
            ...tmp,
            models: models,
        };
        setProduct(tmp);
    };
    const checkProductValid = (product) => {
        if (!product.name || product.name.length < 10) {
            setProductNameErr("Product name must be at least 10 characters");
            scrollIntoView(productNameRef);
            return false;
        }
        if (product.description.length < 40) {
            setDescriptionErr("Description must be at least 40 characters");
            scrollIntoView(desRef);
            return false;
        }
        if (!product.brand) {
            setProductBrandErr("Please select a brand");
            scrollIntoView(productAttributeRef);
            return false;
        }
        for (let i = 0; i < product.models.length; i++) {
            const model = product.models[i];
            if (!model.price) {
                setVariantPriceErr({
                    index: i,
                    message: "price is not valid",
                });

                scrollIntoView(productVariantTableRef);
                return false;
            }
            if (!model.stock) {
                setVariantStockErr({
                    index: i,
                    message: "stock is not valid",
                });
                scrollIntoView(productVariantTableRef);

                return false;
            }
        }
        return true;
    };
    const scrollIntoView = (myRef) => {
        myRef.current.scrollIntoView();
    };

    const onSave = async () => {
        if (checkProductValid(product)) {
            let filteredImages = images.filter(item => item != null);
            let productTmp = {...product};
            productTmp = {
                ...productTmp,
                images: [...filteredImages]
            }
            setProduct(productTmp);
            try {
                const resp = await productNewAction.saveProduct(productTmp);
                history.goBack();
                return;
            } catch (e) {
                console.log('Failed save product', e);
            } finally {
                console.log(product);
            }
        }
    }
    const onSaveAndHide = () => {
        alert('onSaveAndHide')

    }
    const onCancel = () => {
        history.goBack();
    }
    const getAllVariations = (variants) => {
        let rs = [];
        if (variants[0] && variants[0].options !== undefined) {
            for (let i = 0; i < variants[0].options.length; i++) {
                //check models
                let modelName = variants[0].options[i].name;
                if (!modelName) {
                    continue;
                }
                let model = {
                    name: modelName,
                    variantIndexes: [i],
                };
                if (
                    variants[1] !== undefined &&
                    variants[1].options !== undefined &&
                    variants[1].options.length > 0
                ) {
                    for (let j = 0; j < variants[1].options.length; j++) {
                        model = {
                            name: modelName + variants[1].options[j].name,
                            variantIndexes: [i, j],
                        };
                        let m = getModelByVariantIndexes(model);
                        if (m) {
                            model = {
                                ...m,
                                name:
                                    variants[0].options[i].name +
                                    "," +
                                    variants[1].options[j].name,
                                variantIndexes: [i, j],
                            };
                        }
                        rs.push(model);
                    }
                } else {
                    let m = getModelByVariantIndexes(model);
                    if (m) {
                        model = {
                            ...m,
                            name: variants[0].options[i].name,
                            variantIndexes: [i],
                        };
                    }
                    rs.push(model);
                }
            }
        }
        return rs;
    };

    const getModelByVariantIndexes = (model) => {
        for (const m of product.models) {
            let a = m.id || m.variantIndexes;
            let b = model.id || model.variantIndexes;
            if (
                a.length === b.length &&
                a.every((value, index) => value === b[index])
            ) {
                return {...m};
            }
        }
        return null;
    };

    return (
        <Flex w="100%" bgColor="gray.100">
            <Flex
                flex={9}
                direction={"column"}
                w={"100%"}
                alignItems={"center"}
                justifyContent={"center"}
            >
                {/* PRODUCT BASIC INFO */}
                <VStack
                    ref={productBasicDetailRef}
                    bg={"white"}
                    p={5}
                    w={"100%"}
                    align={"start"}
                >
                    <Text letterSpacing="2" fontWeight="medium" fontSize="20px">
                        Product basic info
                    </Text>

                    <VStack align={"start"}>
                        <Text>Product Images</Text>
                        <Wrap>
                            {savedImages && savedImages.map((item, i) => (
                                <SavedImageSelector key={item.id} image={item} handleSelectedImage={() => {
                                }}/>
                            ))}
                        </Wrap>
                        <Wrap>
                            {[1, 1, 1, 1, 1, 1, 1, 1].map((item, i) => (
                                <ImgSelector
                                    path={""}
                                    handleSelectedImage={async (file, index) => {
                                        const fileUploadResp = await productService.saveFile(file);
                                        setImages(prev => [...prev, fileUploadResp]);
                                    }}
                                    index={i}
                                />
                            ))}
                        </Wrap>
                    </VStack>
                    <Divider py={5}/>
                    <Box h="5"/>
                    <Flex
                        direction={"column"}
                        align={"start"}
                        alignItems={"start"}
                        w={"100%"}
                    >
                        <Flex alignItems={"start"} w={"100%"}>
                            {/* PRODUCT NAME */}
                            <Text flex={2}>Product Name</Text>
                            <FormControl flex={12}>
                                <Input
                                    ref={productNameRef}
                                    onChange={(e) => {
                                        const nameChange = e.target.value;
                                        setProductNameErr("");
                                        if (!nameChange || nameChange.length < 10) {
                                            setProductNameErr(
                                                "Product name must at least 10 characters"
                                            );
                                        }
                                        let temp = product;
                                        temp = {
                                            ...temp,
                                            name: nameChange,
                                        };
                                        setProduct(temp);
                                    }}
                                    value={product.name || ""}
                                    w={"100%"}
                                    id="email"
                                />
                                {productNameErr && (
                                    <FormHelperText color="red">{productNameErr}</FormHelperText>
                                )}
                            </FormControl>
                        </Flex>
                        <Box h="3"/>
                        <Flex alignItems={"start"} w={"100%"}>
                            <Text flex={2}>Description</Text>
                            <FormControl flex={12}>
                                {/* PRODUCT DESCRIPTION */}
                                <Textarea
                                    ref={desRef}
                                    onChange={(e) => {
                                        setDescriptionErr("");
                                        let temp = product;
                                        temp = {
                                            ...temp,
                                            description: e.target.value,
                                        };
                                        if (e.target.value?.length < 40) {
                                            setDescriptionErr(
                                                "Product name must be at least 40 characters"
                                            );
                                        }
                                        setProduct(temp);
                                    }}
                                    value={product.description || ""}
                                    w={"100%"}
                                    id="email"
                                />
                                {descriptionErr && (
                                    <FormHelperText color="red.500">
                                        {descriptionErr}
                                    </FormHelperText>
                                )}
                            </FormControl>
                        </Flex>
                        {/*selected ategory*/}
                        <Flex direction={"column"} py={5}>
                            <Text letterSpacing="2" fontWeight="medium" fontSize="20px">
                                Selected Category
                            </Text>
                            <Flex py="3" alignItems={"center"}>
                                <SelectedCategories selectedCategories={[]}/>
                                <Box w={3}/>
                                <Icon as={EditIcon}/>
                            </Flex>
                        </Flex>
                        {/* selected category*/}
                    </Flex>
                </VStack>
                <Box h={3}/>

                {/*//PRODUCT ATTRS*/}
                <Flex
                    ref={productAttributeRef}
                    p={"5"}
                    bg={"white"}
                    w={"100%"}
                    direction={"column"}
                >
                    <Text letterSpacing="2" fontWeight="medium" fontSize="20px">
                        Product Detail
                    </Text>
                    <Text>
                        Fill in attribute information to increase product visibility See the guide to adding attributes.
                    </Text>
                    <SimpleGrid spacing={5} columns={2} minChildWidth={100}>
                        <GridItem py={5} maxW={300}>
                            {/* BRAND ID */}
                            {product && <ProductAttrSelect
                                err={productBrandErr}
                                selectedItem={product.brand && product.brand.id || null}
                                onChange={(item) => {
                                    setProductBrandErr("");
                                    let tmp = product;
                                    tmp = {
                                        ...tmp,
                                        brandId: item.id,
                                        brand: item,
                                    };
                                    setProduct(tmp);
                                }}
                                placeHolder={"Please select"}
                                name={"Brand"}
                                items={brands || []}
                            />}
                        </GridItem>
                    </SimpleGrid>
                </Flex>
                {/*//PRODUCT MODELS*/}
                <Box h={3}/>
                <Flex
                    justifyContent="start"
                    p={"5"}
                    bg={"white"}
                    w={"100%"}
                    direction={"column"}
                >
                    <Text letterSpacing="2" fontWeight="medium" fontSize="20px">
                        Product Models
                    </Text>
                    {(product.variants && product.variants.length > 0 && product.variants[0].name) ? (
                        <Flex py={3} alignItems={'center'} justifyContent={'start'}>
                            <FormControl>
                                <FormLabel fontWeight={'normal'} htmlFor='minPrice'>Min price</FormLabel>
                                <Input
                                    size={'sm'}

                                    value={product?.minPrice || ''}
                                    onChange={(e) => {
                                        let value = e.target.value;
                                        setProduct((prev) => ({...prev, minPrice: value ? parseFloat(value) : 0}))
                                    }}
                                    id='minPrice' type='number'/>
                                {/*<FormHelperText>We'll never share your email.</FormHelperText>*/}
                            </FormControl>
                            <Box w={10}/>
                            <FormControl>
                                <FormLabel fontWeight={'normal'} htmlFor='maxPrice'>Max price</FormLabel>
                                <Input
                                    size={'sm'}

                                    value={product?.maxPrice || ''}
                                    onChange={(e) => {
                                        let value = e.target.value;
                                        setProduct((prev) => ({...prev, maxPrice: value ? parseFloat(value) : 0}))
                                    }}
                                    id='maxPrice' type='number'/>
                                {/*<FormHelperText>We'll never share your email.</FormHelperText>*/}
                            </FormControl>
                        </Flex>) : (
                        <Flex py={3} direction={'column'} alignItems={'center'} justifyContent={'start'}>
                            <FormControl>
                                <FormLabel fontWeight={'normal'} htmlFor='minPrice'>Standard price</FormLabel>
                                <Input
                                    size={'sm'}
                                    value={product?.standardPrice || ''}
                                    onChange={(e) => {
                                        let value = e.target.value;
                                        let parseValue = value ? parseFloat(value) : 0;
                                        setProduct((prev) => ({
                                            ...prev,
                                            standardPrice: parseValue,
                                            salesPrice: parseValue
                                        }))
                                    }}
                                    id='minPrice' type='number'/>
                                {/*<FormHelperText>We'll never share your email.</FormHelperText>*/}
                            </FormControl>
                            <Box w={10}/>
                            <FormControl>
                                <FormLabel fontWeight={'normal'} htmlFor='maxPrice'>Sales Price</FormLabel>
                                <Input
                                    size={'sm'}
                                    value={product?.salesPrice || ''}
                                    onChange={(e) => {
                                        let value = e.target.value;
                                        setProduct((prev) => ({...prev, salesPrice: value ? parseFloat(value) : 0}))
                                    }}
                                    id='maxPrice' type='number'/>
                                {/*<FormHelperText>We'll never share your email.</FormHelperText>*/}
                            </FormControl> <FormControl>
                            <FormLabel fontWeight={'normal'} htmlFor='maxPrice'>Stock</FormLabel>
                            <Input
                                size={'sm'}
                                value={product?.stock || ''}
                                onChange={(e) => {
                                    let value = e.target.value;
                                    setProduct((prev) => ({...prev, stock: value ? parseInt(value) : 0}))
                                    console.log(product.stock);
                                }}
                                id='maxPrice' type='number'/>
                            {/*<FormHelperText>We'll never share your email.</FormHelperText>*/}
                        </FormControl>
                        </Flex>
                    )}
                    {(product && (!product.variants || product.variants.length <= 0)) && (
                        <Flex py="3" alignItems={"center"}>
                            <Text>Add Attribute</Text>
                            <Box w="3"/>
                            <Button
                                p="0"
                                m="0"
                                fontWeight={"default"}
                                onClick={() => {
                                    let temp = {...product};
                                    temp = {
                                        ...temp,
                                        variants: [
                                            {
                                                name: "",
                                                options: [
                                                    {
                                                        name: "",
                                                    },
                                                ],
                                            },
                                        ],
                                    };
                                    setProduct({...temp});
                                }}
                                variant={"outline"}
                                alignItems={"center"}
                                textAlign={"center"}
                                rightIcon={<AddIcon/>}
                                size={"sm"}
                                w={300}
                            >
                                Them nhom phan loai hang
                            </Button>
                        </Flex>
                    )}
                    {product &&
                    product.variants.length > 0 && product.variants.map((variant, variantIndex) => (
                        <Flex py={2} key={variantIndex} direction={"column"}>
                            <Flex alignItems={"center"} align={"start"}>
                                <Text maxW={100} minW={100}>
                                    Variant Name
                                </Text>
                                <FormControl maxW="300">
                                    <Input
                                        size={"sm"}
                                        // VARIANT NAME
                                        onChange={(e) => {
                                            let productTemp = {...product};
                                            let variantTemps = [...productTemp.variants];
                                            variantTemps = variantTemps.map((variantTemp, o) =>
                                                o === variantIndex
                                                    ? {
                                                        ...variantTemp,
                                                        name: e.target.value,
                                                    }
                                                    : variantTemp
                                            );

                                            const models = getAllVariations(variantTemps);
                                            productTemp = {
                                                ...productTemp,
                                                models: [...models],
                                                variants: [...variantTemps],
                                            };
                                            setProduct({...productTemp});
                                        }}
                                        value={variant.name}
                                        maxW={300}
                                        placeholder={"size,color,..."}
                                    />
                                </FormControl>
                                <Box
                                    onClick={() => {
                                        let temp = product;
                                        let variantTemps = temp.variants;
                                        variantTemps = variantTemps.filter(
                                            (v, vi) => vi !== variantIndex
                                        );
                                        const models = getAllVariations(variantTemps);
                                        temp = {
                                            ...temp,
                                            variants: variantTemps,
                                            models: models,
                                        };
                                        setProduct(temp);
                                    }}
                                    cursor="pointer"
                                    p={1}
                                    bg={"gray.200"}
                                >
                                    <Icon as={TiDeleteOutline}/>
                                </Box>
                            </Flex>
                            <Box h={1}/>
                            <HStack mt={2} align={"start"} spacing={0}>
                                <Text minW={100}>Variant Value</Text>
                                <VStack p={0} m={0} align="start">
                                    {variant.options &&
                                    variant.options.map((option, optionIndex) => (
                                        <Flex alignItems={"center"} key={optionIndex}>
                                            <FormControl>
                                                {/*VARIANT OPTION CHANGE*/}
                                                <Input
                                                    size={"sm"}
                                                    onChange={(e) => {
                                                        const name = e.target.value;
                                                        let productTemp = {...product};
                                                        let variantTemps = [...productTemp.variants];
                                                        variantTemps = variantTemps.map(
                                                            (variant, index) => {
                                                                if (index === variantIndex) {
                                                                    let optionTemps = [...variant.options];
                                                                    optionTemps[optionIndex] = {
                                                                        ...optionTemps[optionIndex],
                                                                        name: name,
                                                                    };
                                                                    return {
                                                                        ...variant,
                                                                        options: [...optionTemps],
                                                                    };
                                                                }
                                                                return variant;
                                                            }
                                                        );

                                                        const models = getAllVariations(variantTemps);
                                                        productTemp = {
                                                            ...productTemp,
                                                            variants: [...variantTemps],
                                                            models: [...models],
                                                            removedOptions: [...productTemp.removedOptions || [], option.id && option.id]
                                                        };
                                                        setProduct({...productTemp});
                                                    }}
                                                    value={option.name || ""}
                                                    maxW={300}
                                                />
                                            </FormControl>
                                            {/*ICON DELETE*/}
                                            <Box p={1} bg={"gray.200"}>
                                                <Icon
                                                    onClick={() => {
                                                        let productTemp = {...product};
                                                        let variantTemps = [...productTemp.variants];
                                                        variantTemps = variantTemps.map((variant, i) =>
                                                            i === variantIndex
                                                                ? {
                                                                    ...variant,
                                                                    options: variant.options.filter(
                                                                        (option, oIndex) =>
                                                                            oIndex !== optionIndex
                                                                    ),
                                                                }
                                                                : variant
                                                        );
                                                        const models = getAllVariations(variantTemps);
                                                        productTemp = {
                                                            ...productTemp,
                                                            variants: [...variantTemps],
                                                            models: [...models],
                                                            removedOptions: [...productTemp.removedOptions || [], option.id && option.id]
                                                        };
                                                        setProduct({...productTemp});
                                                    }}
                                                    as={IoIosRemoveCircleOutline}
                                                />
                                            </Box>
                                        </Flex>
                                    ))}
                                    <Button
                                        fontWeight="default"
                                        onClick={() => {
                                            let temp = product;
                                            temp = {
                                                ...temp,
                                                variants: temp.variants.map((v, index) =>
                                                    index === variantIndex
                                                        ? {
                                                            ...v,
                                                            options: [...v.options, ""],
                                                        }
                                                        : v
                                                ),

                                            };

                                            setProduct(temp);
                                        }}
                                        size={"sm"}
                                        variant={"outline"}
                                        rightIcon={<AddIcon/>}
                                    >
                                        Them phan loai hang
                                    </Button>
                                </VStack>
                            </HStack>

                            {/*    TABLE*/}
                        </Flex>
                    ))}
                    {(product.variants.length <= 1) &&
                    product.variants[0]?.options?.length > 0 &&
                    product.variants[0].options[0]?.name && (
                        <Button
                            maxW={100}
                            onClick={() => {
                                let temp = {...product};
                                temp = {
                                    ...temp,
                                    variants: [
                                        ...temp.variants,
                                        {
                                            name: "",
                                            options: [],
                                        },
                                    ],
                                };
                                setProduct(temp);

                            }}
                            fontWeight={"default"}
                            size={"sm"}
                            variant={"outline"}
                            rightIcon={<AddIcon/>}
                        >
                            Them
                        </Button>
                    )}
                </Flex>
                <Flex p={5} direction={"column"} bg={"white"} w={"100%"}>
                    <HStack py={5} spacing={2}>
                        <Text>Quick Edit</Text>
                        <InputGroup size={"sm"}>
                            <Input
                                value={variantOption.price || ""}
                                onChange={(e) => {
                                    setVariantOption((prev) => ({
                                        ...prev,
                                        price: parseInt(e.target.value),
                                    }));
                                }}
                                placeholder={"Price"}
                            />
                            <Input
                                value={variantOption.stock || ""}
                                onChange={(e) => {
                                    setVariantOption((prev) => ({
                                        ...prev,
                                        stock: parseInt(e.target.value),
                                    }));
                                }}
                                placeholder={"Stock"}
                            />
                            <Input
                                value={variantOption.sku || ""}
                                onChange={(e) => {
                                    setVariantOption((prev) => ({
                                        ...prev,
                                        sku: e.target.value,
                                    }));
                                }}
                                placeholder={"SKU"}
                            />
                        </InputGroup>
                        <Button
                            onClick={() => {
                                if (variantOption.price && variantOption.stock) {
                                    applyVariantOption();
                                }
                                // TODO : show err
                            }}
                            size={"sm"}
                            textStyle={{
                                fontSize: 10,
                            }}
                            colorScheme={"orange"}
                            variant={"solid"}
                        >
                            Apply
                        </Button>
                    </HStack>
                    <TableContainer ref={productVariantTableRef}>
                        <Table>
                            <Thead bg="gray.200">
                                <Tr bg="gray.200">
                                    {columns.map((c, index) => (
                                        <Th>{c}</Th>
                                    ))}
                                </Tr>
                            </Thead>

                            {product &&
                            product.models &&
                            product.variants[0] != undefined &&
                            product.variants[0].options && (
                                <Tbody>
                                    {product.models.map((model, modelIndex) => (
                                        <Tr key={modelIndex}>
                                            <Td bg="gray.100">{model.name}</Td>
                                            <Td>
                                                {/* VARIANT PRICE */}
                                                <FormControl>
                                                    <Input
                                                        borderWidth={
                                                            variantPriceErr.index === modelIndex && 0.5
                                                        }
                                                        borderColor={
                                                            (variantPriceErr.index === modelIndex &&
                                                                "red.500") ||
                                                            "gray.200"
                                                        }
                                                        onChange={(e) => {
                                                            setVariantPriceErr({
                                                                index: "",
                                                                message: "",
                                                            });
                                                            let temp = product;
                                                            let modelTemps = temp.models;
                                                            modelTemps = modelTemps.map((model, i) =>
                                                                i === modelIndex
                                                                    ? {
                                                                        ...model,
                                                                        price: parseInt(e.target.value),
                                                                    }
                                                                    : model
                                                            );
                                                            temp = {
                                                                ...temp,
                                                                models: modelTemps,
                                                            };
                                                            setProduct(temp);

                                                        }}
                                                        size={"sm"}
                                                        value={model.price || ""}
                                                    />
                                                </FormControl>
                                            </Td>
                                            <Td>
                                                <FormControl>
                                                    <Input
                                                        borderWidth={
                                                            variantStockErr.index === modelIndex && 0.5
                                                        }
                                                        borderColor={
                                                            (variantStockErr.index === modelIndex &&
                                                                "red.500") ||
                                                            "gray.200"
                                                        }
                                                        onChange={(e) => {
                                                            setVariantStockErr({
                                                                index: "",
                                                                message: "",
                                                            });
                                                            let temp = product;
                                                            let modelTemps = temp.models;
                                                            modelTemps = modelTemps.map((model, i) =>
                                                                i === modelIndex
                                                                    ? {
                                                                        ...model,
                                                                        stock: parseInt(e.target.value) || "",
                                                                    }
                                                                    : model
                                                            );
                                                            temp = {
                                                                ...temp,
                                                                models: modelTemps,
                                                            };
                                                            setProduct(temp);
                                                        }}
                                                        size={"sm"}
                                                        value={model.stock || ""}
                                                    />
                                                </FormControl>
                                            </Td>
                                            <Td>
                                                <FormControl>
                                                    <Input
                                                        onChange={(e) => {
                                                            let temp = product;
                                                            let modelTemps = temp.models;
                                                            modelTemps = modelTemps.map((model, i) =>
                                                                i === modelIndex
                                                                    ? {
                                                                        ...model,
                                                                        sku: e.target.value,
                                                                    }
                                                                    : model
                                                            );
                                                            temp = {
                                                                ...temp,
                                                                models: modelTemps,
                                                            };
                                                            setProduct(temp);

                                                        }}
                                                        size={"sm"}
                                                        value={model.sku || ""}
                                                    />
                                                </FormControl>
                                            </Td>
                                        </Tr>
                                    ))}
                                </Tbody>
                            )}
                        </Table>
                    </TableContainer>
                </Flex>
                <Box h={3} bg={"white"}></Box>
                <Flex
                    boxShadow={"0px -2px 4px #f2f2f2"}
                    bg={"white"}
                    w={"100%"}
                    p={5}
                    position={"sticky"}
                    bottom={0}
                    justifyContent={"end"}
                    alignItems={"center"}
                >
                    <ButtonGroup size={"sm"} colorScheme={"green"} variant={"solid"}>
                        <Button variant={"outline"}>Cancel</Button>
                        <Button
                            onClick={() => {
                                // checkProductValid(product);
                            }}
                        >
                            Save & Hide
                        </Button>
                        <Button
                            onClick={() => {
                                onSave();
                                // handleSaveProduct();
                            }}
                        >
                            Save
                        </Button>
                    </ButtonGroup>
                </Flex>
                <Box minH={"20vh"}></Box>
            </Flex>
            <Box w="2"/>
            {/* BOTTOM ACTION BUTTON*/}
            <Flex flex="3" position="relative" direction="column" w={"100%"}>
                <VStack
                    position="sticky"
                    top="0"
                    left="0"
                    align="start"
                    bg="white"
                    p="5"
                    spacing="2"
                >
                    <QuickScrollInto
                        name={"Product basic info"}
                        myRef={productBasicDetailRef}
                    />{" "}
                    <QuickScrollInto name={"Attribute"} myRef={productAttributeRef}/>

                </VStack>

            </Flex>
            {/* BOTTOM ACTION BUTTON*/}
        </Flex>

    );

};

export default EditProductPage;
