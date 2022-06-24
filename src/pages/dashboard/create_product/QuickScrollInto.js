import React from "react";
import { Text } from "@chakra-ui/react";
const QuickScrollInto = ({ myRef, name }) => {
  return (
    <Text
      cursor={"pointer"}
      _hover={{
        textDecoration: "underline",
      }}
      onClick={() => {
        myRef.current.scrollIntoView();
      }}
    >
      {name}
    </Text>
  );
};

export default QuickScrollInto;
