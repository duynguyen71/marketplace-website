import {
    CloseButton,
    Flex,
    Link,
    Select,
    useColorModeValue
} from '@chakra-ui/react'
import {CartProductMeta} from './CartProductMeta'
import {PriceTag} from './PriceTag'
import {
    NumberInput,
    NumberInputField,
    NumberInputStepper,
    NumberIncrementStepper,
    NumberDecrementStepper,
} from '@chakra-ui/react'
import {shoppingCartAction} from "../../actions/shoppingCartAction";

const QuantitySelect = (props) => {
    return (

        <NumberInput maxW={100} step={1} defaultValue={props.qty || 1} min={1} max={20}
                     onChange={(valueStr, valueNum) => {
                         shoppingCartAction.updateCartItemQty(props.id, valueNum);
                     }}>
            <NumberInputField/>
            <NumberInputStepper>
                <NumberIncrementStepper/>
                <NumberDecrementStepper/>
            </NumberInputStepper>
        </NumberInput>
    )
}

export const CartItem = (props) => {
    const {
        id,
        isGiftWrapping,
        name,
        description,
        imageUrl,
        currency,
        price,
        onChangeQuantity,
        modelName,
        qty,
    } = props;
    return (
        <Flex
            direction={{
                base: 'column',
                md: 'row',
            }}
            justify="space-between"
            align="center"
        >
            <CartProductMeta
                name={name}
                description={description}
                image={imageUrl}
                isGiftWrapping={isGiftWrapping}
                modelName={modelName}
            />

            {/* Desktop */}
            <Flex
                width="full"
                justify="space-between"
                display={{
                    base: 'none',
                    md: 'flex',
                }}
            >
                <QuantitySelect
                    {...props}

                />
                <PriceTag price={price} currency={currency}/>
                <CloseButton
                    aria-label={`Delete ${name} from cart`} onClick={() => {
                    shoppingCartAction.removeItem(props.id);
                }}/>
            </Flex>

            {/* Mobile */}
            <Flex
                mt="4"
                align="center"
                width="full"
                justify="space-between"
                display={{
                    base: 'flex',
                    md: 'none',
                }}
            >
                <Link fontSize="sm" textDecor="underline">
                    Delete
                </Link>
                <QuantitySelect
                    value={qty}
                    onChange={(e) => {
                        onChangeQuantity?.(+e.currentTarget.value)
                    }}
                />
                <PriceTag price={price} currency={currency}/>
            </Flex>
        </Flex>
    )
}