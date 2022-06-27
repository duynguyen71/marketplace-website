import {
    Box,
    chakra,
    SimpleGrid,
    Stat,
    StatLabel,
    StatNumber,
    useColorModeValue,
} from '@chakra-ui/react';
import {useEffect, useState} from "react";
import {shopService} from "../../../service/shopService";
import {OrderStatus} from "../../../constants/order-staus";


function StatsCard(props) {
    const {status, count} = props;
    return (
        <Stat
            cursor={'pointer'}
            px={{base: 2, md: 4}}
            py={4}
            border={'1px solid'}
            borderColor={'gray.200'}
            rounded={'md'}>
            <StatLabel fontWeight={'normal'} isTruncated>
                {status}
            </StatLabel>
            <StatNumber fontSize={'1xl'} fontWeight={'medium'}>
                {count}
            </StatNumber>
        </Stat>
    );
}

export default function BasicOrderStatusStatistics() {
    const [statics, setStatics] = useState({
        0: 0,
        1: 0,
        2: 0,
        3: 0,
        4: 0,
    });
    useEffect(() => {
        shopService.getOrderStatus().then(data => {
            let temp = {...statics};
            for (let i = 0; i < data.length; i++) {
                const o = data[i];
                const status = o.status;
                if (temp.hasOwnProperty(o.status)) {
                    temp[`${status}`] = o.count;
                }
            }
            setStatics(temp);
        });
    }, []);

    return (
        <Box maxW="4xl" mx={'auto'} px={{base: 2, sm: 12, md: 17}} py={2}>
            <SimpleGrid columns={{base: 1, md: 6}} spacing={{base: 2, lg: 8}}>
                <StatsCard status={'To Pay'} count={statics[`${OrderStatus.TO_PAY}`]}/>
                <StatsCard status={'To Ship'} count={statics[OrderStatus.TO_SHIP]}/>
                <StatsCard status={'To Receive'} count={statics[OrderStatus.TO_RECEIVE]}/>
                <StatsCard status={'Completed'} count={statics[OrderStatus.COMPLETED]}/>
                <StatsCard status={'Cancelled'} count={statics[OrderStatus.CANCELLED]}/>
            </SimpleGrid>
        </Box>
    );
}