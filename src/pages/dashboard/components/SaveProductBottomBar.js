import React from 'react';
import {Button, ButtonGroup, Flex} from "@chakra-ui/react";

const SaveProductBottomBar = ({onCancel,onSave,onSaveAndHide}) => {
    return (
        <>
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
                    <Button
                        onClick={() => {
                            onCancel();
                        }}
                        variant={"outline"}>Cancel</Button>
                    <Button
                        onClick={() => {
                            onSaveAndHide();
                        }}
                    >
                        Save & Hide
                    </Button>
                    <Button
                        onClick={() => {
                            onSave();
                        }}
                    >
                        Save
                    </Button>
                </ButtonGroup>
            </Flex>
        </>
    );
};

export default SaveProductBottomBar;