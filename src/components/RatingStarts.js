import React, {useMemo} from 'react';
import {HStack} from "@chakra-ui/react";
import {StarIcon} from "@chakra-ui/icons";

const RatingStarts = ({starts,onClick}) => {


    // const arrayStarts = useMemo(() => ([...Array(starts)]), [starts])
    return (
        <>
            <HStack spacing={1} alignItems={'center'}>
                {[...Array(5)].map((item, i) => (
                    <StarIcon onClick={()=>onClick(i)} key={i} color={i < starts ? 'orange.200' : 'gray.200'}/>
                ))}
            </HStack>
        </>
    );
};

export default RatingStarts;