import React, { FC } from "react";
import { Box, Input } from "zmp-ui";
import { useNavigate } from '../../router'

export const Inquiry: FC = () => {
  const navigate = useNavigate();
  return (
    <Box p={4} className="bg-white">
      <Input.Search
        onFocus={() => navigate("/search")}
        placeholder="Tìm nhanh đồ uống, món mới ..."
      />
    </Box>
  );
};
