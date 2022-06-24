import React, { useEffect } from "react";
import {
  Box,
  Flex,
  Select,
  Text,
  FormControl,
  FormHelperText,
} from "@chakra-ui/react";

const ProductAttrSelect = ({
  name,
  items,
  placeHolder,
  onChange,
  selectedItem,
  err,
}) => {
  return (
    <div>
      <Flex alignItems={"start"}>
        <Text>{name || ""}</Text>
        <Box w={2} />
        <FormControl>
          <Select
            isInvalid={err}
            defaultValue={selectedItem && (selectedItem || "")}
            value={selectedItem && (selectedItem || "")}
            onChange={(e) => {
              const value = e.target.value;
              if (!value) {
                return;
              }
              for (let i = 0; i < items.length; i++) {
                const item = items[i];
                if (item.id === parseInt(value)) {
                  onChange(item);
                  return;
                }
              }
            }}
            placeholder={placeHolder || "Please select"}
          >
            {items &&
              items.map((item, i) => (
                <option key={i} value={item.id}>
                  {item.name}
                </option>
              ))}
          </Select>
          {err && (
            <FormHelperText p="0" m="0" color="red.500">
              {err}
            </FormHelperText>
          )}
        </FormControl>
      </Flex>
    </div>
  );
};

export default ProductAttrSelect;
