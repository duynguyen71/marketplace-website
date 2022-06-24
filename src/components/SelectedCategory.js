import React from "react";
import { HStack, Text } from "@chakra-ui/react";

const SelectedCategories = ({ selectedCategories }) => {
  return (
    <>
      <HStack spacing={2} align={"start"}>
        {selectedCategories &&
          selectedCategories.map((c, i) => {
            return (
              <Text textDecoration="underline" fontSize={"18"} key={c.id}>
                {c.name}{" "}
                {selectedCategories.length - 1 != i &&
                  i < selectedCategories.length - 1 &&
                  ">>"}
              </Text>
            );
          })}
      </HStack>
    </>
  );
};

export default SelectedCategories;
