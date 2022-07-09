import React, {useEffect, useMemo, useState} from "react";
import {
    useTable,
    useSortBy,
    useGlobalFilter,
    usePagination,
} from "react-table";
import mockdata from "../../../data/MOCK_DATA.json";
import {
    Table,
    Tbody,
    Td,
    Tfoot,
    Th,
    Thead,
    Tr,
    chakra,
    Flex,
    Box,
    Input,
    Button,
    HStack,
    Heading,
    Text,
    Icon,
    VStack,
} from "@chakra-ui/react";
import {AddIcon, TriangleDownIcon, TriangleUpIcon} from "@chakra-ui/icons";
import dateFormat, {masks} from "dateformat";
import {
    AiFillEye,
    AiFillLike,
    BiSkipPrevious,
    FcNext,
    FcPrevious,
} from "react-icons/all";
import {useHistory, Link as RLink} from "react-router-dom";
import AdminProductService from "../../../service/admin-product.service";

const Product = () => {
    const [products, setProducts] = useState([]);
    const data = useMemo(() => products, [setProducts]);

    const columns = useMemo(
        () => [
            //hidden column
            {
                Header: "A",
                Footer: "A",
                accessor: "name",
            },
            //
            {
                Header: "ID",
                Footer: "ID",
                accessor: "id",
                isNumeric: true
            },
            {
                Header: "Name",
                Footer: "Name",
                accessor: (d) => (
                    <Flex alignItems={'start'} justifyContent={'start'}>
                        <Flex direction={'column'} alignItems={'start'} justifyContent={'start'}>
                            <Text fontWeight={'medium'} maxW={'100px'} isTruncated>{d.name}</Text>
                            {/*<Flex alignItems={'start'} justifyContent={'start'} spacing={2} align={"start"}>*/}
                            {/*    <Flex justifyContent={'start'} alignItem={'center'}>*/}
                            {/*        /!*<Icon color={"blue"} as={AiFillLike}/>*!/*/}
                            {/*        <Text>100</Text>*/}
                            {/*    </Flex>*/}
                            {/*    <Flex justifyContent={'start'} alignItems={'center'}>*/}
                            {/*        /!*<Icon color={"blue"} as={AiFillEye}/>*!/*/}
                            {/*        <Text>100</Text>*/}
                            {/*    </Flex>*/}
                            {/*</Flex>*/}
                        </Flex>
                    </Flex>
                ),
            },
            {
                Header: "Price",
                Footer: "Price",
                accessor: (d) => (
                    (d.models != null && d.models.length) > 0 ? (<Flex alignItems={'start'} justifyContent={'start'}>
                        <Text>
                            {d.minPrice || 0}
                        </Text>
                        <Text>
                            {'-'} {d.maxPrice || 0}
                            {" vnd"}
                        </Text>
                    </Flex>) : (<Flex alignItems={'start'} justifyContent={'start'}>

                        <Text>
                            {d.salesPrice || d.standardPrice}
                            {" vnd"}
                        </Text>
                    </Flex>)
                ),
            },
            {
                Header: "Solid",
                Footer: "Solid",
                accessor: "solid",
                isNumeric: true,
            },
            {
                Header: "Stock",
                Footer: "Stock",
                accessor: "stock",
            },
            {
                Header: "Models",
                Footer: "Models",
                accessor: (d) => (
                    <Flex direction={'column'} alignItems={'start'} justifyContent={'start'}>
                        {d.models.map((model, index) => (
                            <Text key={index}>{model.name}</Text>
                        ))}
                    </Flex>
                ),
            },
            {
                Header: "Create Date",
                Footer: "Price",
                accessor: "createDate",
                Cell: ({value}) => {
                    let formatedDate = dateFormat(value, "dd/MM/yyyy");
                    return formatedDate;
                },
            },
            {
                Header: "Action",
                Footer: "Action",
                accessor: (d) => (
                    <VStack>
                        <Text textDecoration={"underline"} color={"blue"}>
                            <RLink to={`/dashboard/products/${d.id}`}>Edit</RLink>
                        </Text>
                        <Text textDecoration={"underline"} color={"blue"}>
                            <RLink to={"/"}>View</RLink>
                        </Text>
                    </VStack>
                ),
            },
        ],
        [setProducts]
    );

    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        footerGroups,
        // rows,
        prepareRow,
        //filter
        state,
        setGlobalFilter,
        //pagination
        page,
        nextPage,
        previousPage,
        canNextPage,
        canPreviousPage,
        pageOptions,
    } = useTable(
        {
            initialState: {
                hiddenColumns: ["name"],
            },
            columns: columns,
            data: products,
        },
        useGlobalFilter,
        useSortBy,
        usePagination
    );
    const {globalFilter, pageIndex} = state;
    // const [filter, setFilter] = useState(null);
    const history = useHistory();

    const getProducts = async () => {
        try {
            let resp = await AdminProductService.getProducts();
            console.log(resp);
            setProducts(resp.data);
        } catch (e) {
            console.log("Failed to get products");
        }
    };

    useEffect(async () => {
        await getProducts();
    }, []);
    return (
        <Box>
            <Flex direction={"column"} w={"100%"}>
                <Box w={"100%"} mb={5}>
                    <Flex justifyContent={"flex-end"} w={"100%"}>
                        <Button
                            onClick={() => history.push("/dashboard/product-new/category")}
                            rightIcon={<AddIcon/>}
                            size={"sm"}
                            colorScheme={"teal"}
                        >
                            Add new product
                        </Button>
                    </Flex>
                </Box>
                {/*FILTER INPUT*/}
                <Box py={4}>
                    <Flex w={"100%"} justifyContent={"space-between"}>
                        <Text fontSize={"x-large"}>
                            Page {pageIndex + 1} of {pageOptions.length}
                        </Text>
                        <HStack>
                            <Text>Filter</Text>
                            <Input
                                size={"sm"}
                                borderColor={"blue.500"}
                                bg={"white"}
                                value={globalFilter || ""}
                                onChange={(e) => setGlobalFilter(e.target.value)}
                            />
                        </HStack>
                    </Flex>
                </Box>
                {/*FILTER INPUT*/}

                {/*PRODUCT TABLE*/}
                <Box bg={'white'} p={4} borderRadius={'md'}>
                    {products && (
                        <Table
                            // variant="striped"
                            // colorScheme="blue"
                            // size={"md"}
                            {...getTableProps()}
                        >
                            <Thead>
                                {headerGroups.map((headerGroup) => (
                                    <Tr {...headerGroup.getHeaderGroupProps()}>
                                        {headerGroup.headers.map((column) => (
                                            <Th
                                                isNumeric={column.isNumeric}
                                                {...column.getHeaderProps(column.getSortByToggleProps())}
                                            >
                                                {column.render("Header")}
                                                <chakra.span pl="4">
                                                    {column.isSorted ? (
                                                        column.isSortedDesc ? (
                                                            <TriangleDownIcon aria-label="sorted descending"/>
                                                        ) : (
                                                            <TriangleUpIcon aria-label="sorted ascending"/>
                                                        )
                                                    ) : null}
                                                </chakra.span>
                                            </Th>
                                        ))}
                                    </Tr>
                                ))}
                            </Thead>
                            <Tbody {...getTableBodyProps()}>
                                {page.map((row) => {
                                    prepareRow(row);
                                    return (
                                        <Tr cursor={"pointer"} {...row.getRowProps()}>
                                            {row.cells.map((cell) => (
                                                <Td {...cell.getCellProps()}>{cell.render("Cell")}</Td>
                                            ))}
                                        </Tr>
                                    );
                                })}
                            </Tbody>
                            <Tfoot>
                                {footerGroups.map((footerGroup) => (
                                    <Tr {...footerGroup.getFooterGroupProps()}>
                                        {footerGroup.headers.map((column) => (
                                            <Td {...column.getFooterProps()}>
                                                {column.render("Footer")}
                                            </Td>
                                        ))}
                                    </Tr>
                                ))}
                            </Tfoot>
                        </Table>
                    )}
                </Box>
                <HStack mt={5} alignSelf={"end"}>
                    <Button
                        size={"sm"}
                        colorScheme={"teal"}
                        disabled={!canPreviousPage}
                        alignSelf={"end"}
                        onClick={() => previousPage()}
                        leftIcon={<FcPrevious/>}
                    >
                        Prev
                    </Button>
                    <Button
                        size={"sm"}
                        colorScheme={"teal"}
                        disabled={!canNextPage}
                        alignSelf={"end"}
                        rightIcon={<FcNext/>}
                        onClick={() => nextPage()}
                    >
                        Next
                    </Button>
                </HStack>
            </Flex>
        </Box>
    );
};

export default Product;
