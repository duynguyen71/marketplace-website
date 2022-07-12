import React, {useCallback, useEffect, useState} from "react";
import {
    AspectRatio,
    Box,
    Button,
    Flex,
    HStack,
    Icon,
    Image,
    Input,
    Text,
} from "@chakra-ui/react";
import {AddIcon, DeleteIcon, EditIcon} from "@chakra-ui/icons";
import Cropper from "react-easy-crop";
import {isImage} from "../../../utities/ValidationUtil";

const SavedImageSelector = ({index, handleSelectedImage, image}) => {
    const [selectFile, setSelectFile] = useState(null);
    const [showAction, setShowAction] = useState(false);

    useEffect(() => {
    }, [setSelectFile]);

    console.log(image);
    return (
        <>
            <Box
                onMouseEnter={() => {
                    setShowAction(true);
                }}
                onMouseLeave={() => {
                    setShowAction(false);
                }}
            >
                <Box position={"relative"}>
                    <label htmlFor={index}>
                        <Box
                            key={index}
                            position={"relative"}
                            borderStyle={"dashed"}
                            borderWidth={"2px"}
                            boxSize={"120"}
                        >
                            {!selectFile && (
                                <Icon
                                    color={"gray.400"}
                                    transform={"translate(-50%,-50%)"}
                                    top={"50%"}
                                    left={"50%"}
                                    position={"absolute"}
                                    as={AddIcon}
                                />
                            )}

                            <AspectRatio ratio={1}>
                                <Image
                                    boxSize='100px'
                                    objectFit='cover'
                                    alt={image.name || ''}
                                    src={`http://localhost:8080/api/v1/public/files/${image.image.name}`}
                                />
                            </AspectRatio>
                        </Box>
                    </label>
                    {showAction && (
                        <Box
                            zIndex={1000000}
                            bg={"gray.100"}
                            w={"100%"}
                            position={"absolute"}
                            bottom={0}
                            align={"center"}
                        >
                            <Flex justifyContent={"space-around"} w={"90%"} p={1}>
                                <Icon onClick={() => setSelectFile(null)} as={DeleteIcon}/>
                            </Flex>
                        </Box>
                    )}
                    <Input
                        onChange={(e) => {
                            let file = e.target.files[0];
                            setSelectFile(file);
                            if (isImage(file)) {
                                console.log('is image');
                                handleSelectedImage(file, index);
                            } else {
                                console.log('not image');
                            }
                        }}
                        id={index}
                        display={"none"}
                        visibility={"none"}
                        type={"file"}
                    />
                </Box>
            </Box>

        </>
    );
};


export default SavedImageSelector;
