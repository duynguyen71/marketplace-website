import React, {useEffect, useState} from 'react';
import {AspectRatio, Box, Image, SimpleGrid, Text} from "@chakra-ui/react";
import {useHistory} from "react-router-dom";
import categoryService from "../../service/category.service";

const Categories = () => {
    const history = useHistory();
    const [categories, setCategories] = useState();
    useEffect(async () => {
        const data = await categoryService.getCategories();
        setCategories(data);
    })
    return (
        <>
            <SimpleGrid columns={10} gap={2} justifyItems={'center'}>
                {
                    categories && categories.map((category, i) => (
                        <Box
                            key={i}
                            onClick={() => history.push(`/products/${category.name}`)}
                            cursor={'pointer'}
                            textAlign={'center'} key={i} borderRadius={'md'}
                            position={'relative'}>
                            <AspectRatio borderRadius={'md'} w={'100px'} ratio={1}>
                                <Image
                                    borderRadius={'md'}
                                    src='https://images.pexels.com/photos/792345/pexels-photo-792345.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940'
                                    alt='Segun Adebayo'/>
                            </AspectRatio>
                            <Text
                                alignItems={'center'}
                                alignSelf={'center'}
                                w={'100%'} fontWeight={'bold'}
                                position={'absolute'}
                                bottom={'0'}>{category.name}</Text>

                        </Box>
                    ))
                }
            </SimpleGrid>
        </>
    );
};

export default Categories;