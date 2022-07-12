import React, {useEffect, useMemo, useState} from 'react';
import {
    Avatar,
    Box, Button, ButtonGroup,
    chakra, Divider,
    Flex,
    HStack,
    Icon, Input, Select,
    Stack,
    Table,
    Tbody,
    Td,
    Text,
    Tfoot,
    Th,
    Thead,
    Tr,
    VStack
} from "@chakra-ui/react";
import BasicStatistics from "../../../components/StatsCard";
import {FeedbackCard, feedbacks} from "../../../components/FeedbackCard";
import {shopService} from "../../../service/shopService";

import BasicOrderStatusStatistics from "./OrderStatsCard";
import {useGlobalFilter, usePagination, useSortBy, useTable} from "react-table";
import {TriangleDownIcon, TriangleUpIcon} from "@chakra-ui/icons";
import dateFormat, {masks} from "dateformat";
import {FcNext, FcPrevious} from "react-icons/all";
import {useHistory} from "react-router-dom";
import RatingStarts from "../../../components/RatingStarts";

const DashboardMain = () => {
        const [orders, setOrders] = useState([]);
        const [sortDirection, setSortDirection] = useState('DESC');
        const history = useHistory();
        const columns = useMemo(() => ([
            {
                Header: "ID",
                Footer: "ID",
                accessor: "id",
                isNumeric: true,
            },
            {
                Header: "Status",
                Footer: "Status",
                // accessor: "status",
                isNumeric: true,
                accessor: (value) => (
                    <Text
                        onClick={() => history.push(`/dashboard/orders/${value.id}`)}
                        isTruncated noOfLines={1}>{value.items[0].status || ''}</Text>
                ),
            }, {
                Header: "Product Name",
                Footer: "Product Name",
                // accessor: "status",
                isNumeric: true,
                accessor: (value) => (
                    <Text
                        onClick={() => history.push(`/dashboard/orders/${value.id}`)}
                        isTruncated noOfLines={1}>{value.items[0].product.name || ''}</Text>
                ),
            },
            {
                Header: "Order Date",
                Footer: "Order Data",
                accessor: "createDate",
                Cell: ({value}) => {
                    return dateFormat(value, "dd/mm/yyyy");

                },
            },
            {
                Header: "Product",
                Footer: "Product",
                accessor: (value) => (
                    <Text
                        onClick={() => history.push(`/dashboard/orders/${value.id}`)}
                        isTruncated noOfLines={1}>{`${value.items.length} Products `}</Text>
                ),
            },
        ]), [setOrders]);
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
                // initialState: {
                //     hiddenColumns: ["name"],
                // },
                columns: columns,
                data: orders,
            },
            useGlobalFilter,
            useSortBy,
            usePagination
        );
        const {globalFilter, pageIndex} = state;


        const [feedbacks, setFeedbacks] = useState([]);
        useEffect(() => {
            document.title = 'Dashboard | Portal'
            shopService.getOrders(sortDirection).then((data) => {
                setOrders(data);
                console.log('orders', data);
            })
            if (feedbacks.length === 0) {
                shopService.getFeedbacks().then(data => {
                    setFeedbacks(data);
                    console.log('get feedbacks', data);
                });
            }

        }, [sortDirection,]);

        return (
            <>
                <Flex direction={'column'} w={'100%'} minH={'100vh'}>
                    {/*Section 1*/}
                    <BasicStatistics/>
                    {/*Section 2*/}
                    <Stack minH={'50vh'} maxH={'50vh'} pt={5} spacing={2} w={'100%'}
                           direction={{base: 'column', md: 'row'}}>
                        <Box overflowY={'scroll'} borderRadius={'md'} w={'100%'} p={{base: 1, md: 4}} bg={'white'} flex={7}>
                            <VStack align={'start'} w={'100%'}>
                                {feedbacks.map((item, i) => (
                                    <Flex key={item.id || i} w={'100%'} direction={'column'} justifyContent={'start'}
                                          py={2}>
                                        <Flex alignItems={'start'}>
                                            <Avatar size='md' name='Ryan Florence'
                                                // src='https://bit.ly/ryan-florence'
                                                    src={(item.user.avt != null && item.user.avt != undefined) ? ('http://localhost:8080/api/v1/public/files/' + item.user.avt) :
                                                        null}

                                            />
                                            <Flex w={'100%'} px={2} direction={'column'}>
                                                <Text fontSize={12}
                                                      fontWeight={'normal'}>{item.user.username || item.user.email || ''}</Text>
                                                <Text fontSize={14} fontWeight={'medium'}>{item.comment}</Text>
                                                <RatingStarts starts={item.rating} onClick={() => {
                                                }}/>
                                            </Flex>
                                        </Flex>
                                        <Divider pt={2} w={'30%'}/>
                                    </Flex>
                                ))}
                            </VStack>
                        </Box>
                        {/*FEEDBACK CARDS*/}
                        <Box overflowY={'scroll'} borderRadius={'md'} p={{base: 1, md: 4}} flex={3} bg={'white'}>
                            <Text>Feedbacks</Text>
                            <Flex direction={'column'} pt={5} spacing={5} alignItems={'start'}>
                                {
                                    feedbacks.map((item, i) => (
                                        <FeedbackCard key={i} name={item.user.name} role={item.role} content={item.comment}
                                                      avatar={item.user.avt} index={i}/>
                                    ))
                                }
                            </Flex>
                        </Box>
                        {/*FEEDBACK CARDS*/}
                    </Stack>
                    {/*<Heading>Content</Heading>*/}
                    {/*New orders*/}
                    <Box bg={'white'} mt={5}>
                        <BasicOrderStatusStatistics/>
                    </Box>

                    <Flex direction={'column'} minH={'100vh'} bg={'white'} mt={5}>
                        <Box bg={'white'} px={4} pt={4} alignSelf={'end'}>
                            <Select
                                size={'sm'}
                                onChange={(e) => {
                                    setSortDirection(e.target.value);
                                    console.log(e.target.value)
                                }}
                                defaultValue={'DESC'}
                            >
                                <option value='DESC'>Newest</option>
                                <option value='ASC'>Oldest</option>

                            </Select>
                        </Box>
                        <Flex direction={'column'} p={4}>
                            <Flex w={"100%"} justifyContent={"space-between"}>
                                <Text fontSize={"x-large"}>
                                    Page {pageIndex + 1} of {pageOptions.length}
                                </Text>
                                <HStack>
                                    <Text>Filter</Text>
                                    <Input
                                        size={"xs"}
                                        borderColor={"blue.500"}
                                        bg={"white"}
                                        value={globalFilter || ""}
                                        borderRadius={'md'}
                                        onChange={(e) => setGlobalFilter(e.target.value)}
                                    />
                                </HStack>
                            </Flex>
                            <Divider/>
                        </Flex>
                        {
                            orders && (
                                <Table
                                    // striped
                                    color={'success'}
                                    variant={'solid'}
                                    colorScheme="tomato"
                                    size={"md"}
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
                            )
                        }
                        <Divider/>
                        <HStack mt={5} alignSelf={"end"} mr={5}>
                            <ButtonGroup size={'sm'} colorScheme={"orange"}
                            >
                                <Button
                                    fontWeight={'normal'}
                                    // disabled={!canPreviousPage}
                                    onClick={() => previousPage()}
                                    leftIcon={<FcPrevious/>}
                                >
                                    Prev
                                </Button>
                                <Button
                                    fontWeight={'normal'}
                                    // disabled={!canNextPage}
                                    rightIcon={<FcNext/>}
                                    onClick={() => nextPage()}
                                >
                                    Next
                                </Button>
                            </ButtonGroup>
                        </HStack>
                    </Flex>
                </Flex>
            </>
        );
    }
;

export default DashboardMain;