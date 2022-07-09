import React, {useEffect, useState} from 'react';
import {useParams} from "react-router-dom";
import {shopService} from "../../../service/shopService";
import {Flex} from "@chakra-ui/react";

const ShopDetail = () => {
    const [shopDetail, setShopDetail] = useState(null);
    const {id} = useParams();
    useEffect(() => {
        shopService.getShopDetail().then((data) => {
            setShopDetail(data);
        })
    })
    return (
        <Flex w={'100%'} direction={'column'}>

        </Flex>
    );
};

export default ShopDetail;