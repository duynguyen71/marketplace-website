import React from 'react';
import {Box, Flex, Stack, Text, VStack} from "@chakra-ui/react";
import BasicStatistics from "../../../components/StatsCard";
import {FeedbackCard, feedbacks} from "../../../components/FeedbackCard";

const DashboardMain = () => {
    return (
        <>
            <Flex direction={'column'} w={'100%'} minH={'100vh'}>
                {/*Section 1*/}
                <BasicStatistics/>
                {/*Section 2*/}
                <Stack pt={5} spacing={2} w={'100%'} direction={{base: 'column', md: 'row'}}>
                    <Box w={'100%'} p={{base: 1, md: 4}} bg={'white'} flex={7}>
                        <VStack align={'start'} w={'100%'}>
                            <Text> Todo List</Text>
                        </VStack>
                    </Box>
                    <Box maxH={300} overflowY={'scroll'} p={{base: 1, md: 4}} flex={3} bg={'white'}>
                        <Text>Feedbacks</Text>
                        <VStack pt={5} spacing={5}>
                            {
                                feedbacks.map((item, i) => (
                                    <FeedbackCard key={i} name={item.name} role={item.role} content={item.content}
                                                  avatar={item.avatar} index={i}/>
                                ))
                            }
                        </VStack>
                    </Box>
                </Stack>
                {/*<Heading>Content</Heading>*/}
                {/*Section 3*/}
                <Box minH={'100vh'} bg={'white'} mt={5}>
                    HIHI
                </Box>
            </Flex>
        </>
    );
};

export default DashboardMain;