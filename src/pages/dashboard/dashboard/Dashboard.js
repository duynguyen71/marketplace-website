import React, {useEffect, useMemo, useState} from "react";
import Sidebar from "../../../components/Sidebar";
import {
    Box,
    Flex,
    Heading,
    HStack,
    Stack,
    Text,
    VStack,
} from "@chakra-ui/react";
import SidebarWithHeader from "../../../components/SidebarWithHeader";
import {Route, Switch} from "react-router-dom";
import Product from "../product/Product";
import DashboardMain from "./DashboardMain";
import CreateProductCategory from "../create_product/CreateProductCategory";
import CreateProductDetail from "../create_product/CreateProductDetail";
import EditProductPage from "../edit-product/EditProductPage";
import {useGlobalFilter, usePagination, useSortBy, useTable} from "react-table";

const Dashboard = () => {
    useEffect(() => {
        document.title = 'Dashboard |'
        return () => {

        }
    }, [])

    return (
        <>
            <SidebarWithHeader>
                <Switch>
                    <Route
                        exact
                        path={"/dashboard/products"}
                        component={(props) => <Product {...props} />}
                    />
                    <Route
                        exact
                        path={"/dashboard/products/:productId"}
                        component={(props) => <EditProductPage {...props} />}
                    />
                    <Route
                        exact
                        path={"/dashboard/product-new/category"}
                        component={(props) => <CreateProductCategory {...props} />}
                    />
                    <Route
                        exact
                        path={"/dashboard/product-new/detail"}
                        component={(props) => <CreateProductDetail {...props} />}
                    />
                    <Route
                        exact
                        path={"/dashboard"}
                        component={(props) => <DashboardMain {...props} />}
                    />
                </Switch>
            </SidebarWithHeader>
        </>
    );
};

export default Dashboard;
