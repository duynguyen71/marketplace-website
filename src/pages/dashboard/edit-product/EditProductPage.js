import React, {useState} from "react";
import {useEffect, useMemo} from "react";
import {useSelector} from "react-redux";
import {useHistory, useParams} from "react-router-dom";
import AdminProductAction from "../../../actions/AdminProductAction";
import {
    Flex,
    Text,
    FormControl,
    Input,
    HStack,
    VStack,
} from "@chakra-ui/react";
import SaveProductBottomBar from "../components/SaveProductBottomBar";

const EditProductPage = () => {
    const history = useHistory();
    //get product id on param
    const {productId} = useParams();

    const productState = useSelector(
        (state) => state.adminProductReducer.product
    );

    const [product, setProduct] = useState();
    useMemo(() => setProduct(productState), [productState]);

    useEffect(async () => {
        try {
            await getProductDetails();

        } catch (e) {
            history.goBack();
            return;
        }
        document.title = 'Edit | ' + product?.name;
    }, []);

    const getProductDetails = async () => {
        try {
            await AdminProductAction.getProduct(productId);
        } catch (e) {
        }
    };

    const updateProductReducerState = (product) => {
        AdminProductAction.updateProduct(product);
    };

    const onSave = () => {
        alert('onSave')
    }
    const onSaveAndHide = () => {
        alert('onSaveAndHide')

    }
    const onCancel = () => {
        history.goBack();
    }
    return (
        <Flex direction="column" p="5" background="gray.100">
            <Flex bg={'white'} p={5} direction={'column'}>
                <Text>{product?.name}</Text>
                <FormControl>
                    <Input
                        onChange={(e) => {
                            setProduct((prev) => ({
                                ...prev,
                                name: e.target.value,
                            }));
                        }}
                        value={product?.name}
                    />
                </FormControl>
                {/*    BOTTOM ACTION BAR*/}
                {/*    BOTTOM ACTION BAR*/}
            </Flex>
            <SaveProductBottomBar onSave={onSave} onCancel={onCancel} onSaveAndHide={onSaveAndHide}/>

        </Flex>
    );
};

export default EditProductPage;
