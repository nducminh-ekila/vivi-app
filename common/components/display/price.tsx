import React, { FC } from "react";

export const DisplayPrice: FC<{ children: number }> = ({ children }) => {
  const symbol = '$';
    return (
      <>
        {children.toLocaleString()}
        {symbol}
      </>
    );
  }
