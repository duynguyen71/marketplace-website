import React from 'react';
import {Box, Center, CircularProgress, Flex} from "@chakra-ui/react";

const LoadingWidget = (props) => {
    const {isLoading = false} = props;
    return (
        <>
            {
                isLoading &&
                <Flex zIndex={10000} alignItems={'center'} justifyContent={'center'} position={'absolute'}
                      minH={'100vh'} top={'0%'}
                      minH={'100vh'} minW={'100vw'} bg={'gray.100'} opacity={.4}>
                    <CircularProgress isIndeterminate color='green.300'/>
                </Flex>
            }
        </>
    );
};

export default LoadingWidget;