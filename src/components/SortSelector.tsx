import { Button, Menu, MenuButton, MenuItem, MenuList } from "@chakra-ui/react";
import { BsChevronDown } from "react-icons/bs";

interface Props {
  onSelectSortOrder: (sortOrder: string | null) => void;
  sortOrder: string | null;
}

const SortSelector = ({ onSelectSortOrder, sortOrder }: Props) => {
  const sortOrders = [
    { value: "posted", label: "등록순" },
    { value: "released", label: "발매일(최신곡)" },
    { value: "views", label: "조회수" },
    //youtube 조회순 이런것도 좋겠다.
    { value: "likes", label: "좋아요" },
  ];

  const currentSortOrder = sortOrders.find((order) => order.value === sortOrder);

  return (
    <Menu>
      <MenuButton as={Button} rightIcon={<BsChevronDown />}>
        정렬 : {currentSortOrder?.label}
      </MenuButton>
      <MenuList>
        <MenuItem onClick={() => onSelectSortOrder(null)} key={0}>
          기본값(등록순)
        </MenuItem>
        {sortOrders.map((order) => (
          <MenuItem onClick={() => onSelectSortOrder(order.value)} key={order.value} value={order.value}>
            {order.label}
          </MenuItem>
        ))}
      </MenuList>
    </Menu>
  );
};

export default SortSelector;
