import React, { useCallback, useEffect, useState } from "react";
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
import { AddIcon, DeleteIcon, EditIcon } from "@chakra-ui/icons";
import Cropper from "react-easy-crop";
import { isImage } from "../../../utities/ValidationUtil";

const ImgSelector = ({ index, handleSelectedImage, path }) => {
  const [selectFile, setSelectFile] = useState(null);
  const [showAction, setShowAction] = useState(false);
  const [onEdit, setEdit] = useState(false);
  const getPath = (file) => {
    if (file) {
      let path = (window.URL || window.webkitURL)?.createObjectURL(file);
      return path;
    }
    return null;
  };
  useEffect(() => {
    console.log("render image selector");
  }, [setSelectFile]);

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

              {selectFile && (
                <AspectRatio ratio={1}>
                  <Image
                    fit={"cover"}
                    align={"center"}
                    src={getPath(selectFile) || null}
                  />
                </AspectRatio>
              )}
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
                <Icon onClick={() => setEdit(true)} as={EditIcon} />
                <Icon onClick={() => setSelectFile(null)} as={DeleteIcon} />
              </Flex>
            </Box>
          )}
          <Input
            onChange={(e) => {
              let file = e.target.files[0];
              setSelectFile(file);
              if (isImage(file)) {
                handleSelectedImage(file, index);
              }
            }}
            id={index}
            display={"none"}
            visibility={"none"}
            type={"file"}
          />
        </Box>
      </Box>
      {onEdit && <EditImageBox path={getPath(selectFile)} setEdit={setEdit} />}
    </>
  );
};

const EditImageBox = ({ path, setEdit }) => {
  const [crop, setCrop] = useState({
    x: 0,
    y: 0,
  });
  const [zoom, setZoom] = useState(1);
  const onCropComplete = useCallback((croppedArea, croppedAreaPixels) => {
    console.log(croppedArea, croppedAreaPixels);
  }, []);
  return (
    <Box
      transform={"translate(50%,-50%)"}
      zIndex={100001}
      boxSize={{ base: "sm", md: "md", lg: "lg" }}
      bg={"gray.300"}
      position={"fixed"}
      top={"50%"}
      right={"50%"}
    >
      <Flex
        justifyContent={"space-between"}
        h={"100%"}
        alignContent={"space-between"}
        p={5}
        w={"100%"}
        direction={"column"}
      >
        <Flex w={"100%"}>
          <Box flex={9} position={"relative"}>
            <AspectRatio ratio={1}>
              {/*<Image*/}
              {/*    fit={'cover'}*/}
              {/*    align={'center'}*/}
              {/*    src={path}/>*/}
              <Cropper
                image={path}
                crop={crop}
                zoom={zoom}
                aspect={1 / 1}
                onCropChange={setCrop}
                onCropComplete={onCropComplete}
                onZoomChange={setZoom}
              />
            </AspectRatio>
          </Box>
          <Box flex={3}>Crop</Box>
        </Flex>
        <HStack spacing={2} alignSelf={"end"} align={"end"}>
          <Button>Save</Button>
          <Button onClick={() => setEdit(false)}>Cancel</Button>
        </HStack>
      </Flex>
    </Box>
  );
};

export default ImgSelector;
