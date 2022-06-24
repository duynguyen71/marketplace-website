import React, { useEffect, useRef, useState } from "react";
import {
  Box,
  Button,
  Divider,
  Flex,
  FormControl,
  FormHelperText,
  HStack,
  Icon,
  Input,
  ListItem,
  OrderedList,
  Text,
  UnorderedList,
  VStack,
  Wrap,
  WrapItem,
} from "@chakra-ui/react";
import ImgSelector from "../components/ImgSelector";
import categoryService from "../../../service/category.service";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { productNewAction } from "../../../actions/product-new.action";
import SelectedCategories from "../../../components/SelectedCategory";

const CreateProductCategory = () => {
  const history = useHistory();
  const [step, setStep] = useState(1);
  const [categories, setCategories] = useState([]);
  const [productNameErr, setProductNameErr] = useState("");
  const [product, setProduct] = useState({
    name: "Product name name name",
    status: 0,
    active: 1,
    categoryPaths: [],
  });

  const updateCategoryPaths = (paths) => {
    let temp = product;
    temp = {
      ...temp,
      categoryPaths: [...paths],
    };

    setProduct({ ...temp });
  };

  const getPath = (file) => {
    let path = (window.URL || window.webkitURL).createObjectURL(file);
    return path;
  };
  const [showAction, setShowAction] = useState(false);
  const [selectedCategoryIndexes, setSelectedCategoriesIndex] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const getCategoryChildren = (categories, id) => {
    for (let i = 0; i < categories.length; i++) {
      let category = categories[i];
      if (category.id === id) {
        return category.children;
      }
    }
    return null;
  };

  const productReducerState = useSelector(
    (state) => state.productNewReducer,
    () => true
  );
  useEffect(async () => {
    await getCategories();

    const { product, selectedCategories } = productReducerState;
    setProduct(product);
    setSelectedCategories([...selectedCategories]);
    let map = selectedCategories.map((item) => item.id);
    setSelectedCategoriesIndex([...map]);
  }, []);

  const getCategories = async () => {
    const resp = await categoryService.getCategories();
    setCategories(resp);
    console.log(resp);
  };
  const handleNext = () => {
    if (!isProductNameValid()) {
      setProductNameErr("Product name must at least 10 characters");
    }
    if (
      !product.categoryPaths ||
      product.categoryPaths.length <= 0 ||
      haveChildren(selectedCategories[selectedCategories.length - 1])
    ) {
      return;
    }
    productNewAction.setProduct({
      ...product,
    });
    productNewAction.setSelectedCategories([...selectedCategories]);
    history.push("/dashboard/product-new/detail");
  };
  const isProductNameValid = () => {
    if (!product.name || product.name.length < 10) {
      return false;
    }
    return true;
  };
  const haveChildren = (category) => {
    if (!category || !category.children || category.children.length === 0) {
      return false;
    }
    return true;
  };
  return (
    <Box bg={"gray.100"}>
      <Flex
        direction={"column"}
        w={"100%"}
        bg={"white"}
        minH={"100vh"}
        p={{ base: 2, md: 5 }}
      >
        <Box>
          <Text fontSize={"x-large"}>Add new product</Text>
          <Text fontSize={"small"} color={"gray.600"}>
            Please choose valid product category
          </Text>
        </Box>
        <Divider w={"100%"} my={5} />
        <Box>
          <FormControl>
            <Input
              value={product.name}
              borderColor={productNameErr ? "red" : "gray.200"}
              focusBorderColor={productNameErr && "red"}
              onChange={(e) => {
                let value = e.target.value;
                setProduct((prev) => ({
                  ...prev,
                  name: value,
                }));
                if (value.length < 10) {
                  setProductNameErr("Product name must at least 10 characters");
                } else {
                  setProductNameErr("");
                }
              }}
              placeholder={"Product name"}
            />
            {productNameErr && (
              <FormHelperText color={"red"} textColor={"red"}>
                {productNameErr}
              </FormHelperText>
            )}
          </FormControl>
        </Box>
        <Divider w={"100%"} my={5} />
        {/*{step > 1 &&*/}
        <Box bg={"gray.100"} p={5}>
          <Box bg={"white"} p={5}>
            <HStack align={"start"} spacing={5}>
              <VStack align={"start"}>
                {categories &&
                  categories.map((category, index) => (
                    <Text
                      textDecoration={
                        selectedCategoryIndexes[0] === category.id &&
                        "underline"
                      }
                      key={category.id}
                      cursor={"pointer"}
                      _hover={{
                        textDecoration: "underline",
                      }}
                      onClick={() => {
                        setSelectedCategories([category]);
                        let paths = [category.id];
                        setSelectedCategoriesIndex(paths);
                        updateCategoryPaths(paths);
                      }}
                    >
                      {category.name}
                      {category.children && category.children.length > 0
                        ? " (" + category.children.length + ") "
                        : ""}
                    </Text>
                  ))}
              </VStack>
              {selectedCategories &&
                selectedCategories.map((category, index) => (
                  <VStack align={"start"} key={category.id}>
                    {category.children &&
                      category.children.map((child) => (
                        <Text
                          textDecoration={
                            selectedCategoryIndexes[index + 1] &&
                            child.id === selectedCategoryIndexes[index + 1] &&
                            "underline"
                          }
                          cursor={"pointer"}
                          _hover={{
                            textDecoration: "underline",
                          }}
                          onClick={() => {
                            console.log("click");
                            let temp = selectedCategories;
                            let i = index + 1;
                            let indexesTemp = selectedCategoryIndexes;
                            //da co o vi tri index +1
                            if (temp[i] !== undefined) {
                              temp[i] = child;
                              indexesTemp[i] = child.id;
                            } else {
                              temp.push(child);
                              indexesTemp.push(child.id);
                            }
                            if (
                              child.children == null ||
                              child.children.length === 0
                            ) {
                              indexesTemp.splice(i + 1, Infinity);
                              temp.splice(i + 1, Infinity);
                            }
                            setSelectedCategoriesIndex([...indexesTemp]);
                            setSelectedCategories([...temp]);
                            updateCategoryPaths([...indexesTemp]);
                            // }
                          }}
                          key={child.id}
                        >
                          {child.name}
                          {child.children && child.children.length > 0
                            ? " (" + child.children.length + ") "
                            : ""}
                        </Text>
                      ))}
                  </VStack>
                ))}
            </HStack>
          </Box>
        </Box>
        {/*}*/}
        {/*SELECTED CATEGORY*/}
        <VStack align={"start"} pt={5}>
          <Text>Selected Category</Text>
          <SelectedCategories selectedCategories={selectedCategories} />
        </VStack>
        <Divider w={"100%"} my={5} />
        <Flex
          alignItems={"center"}
          justifyContent={"end"}
          w={"100%"}
          align={"end"}
        >
          <Button
            disabled={
              !isProductNameValid() ||
              haveChildren(selectedCategories[selectedCategories.length - 1])
            }
            onClick={() => handleNext()}
            alignSelf={"end"}
            variant={"solid"}
            colorScheme={"orange"}
          >
            Next
          </Button>
        </Flex>
      </Flex>
    </Box>
  );
};
export default CreateProductCategory;
