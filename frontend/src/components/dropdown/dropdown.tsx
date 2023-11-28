/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { useCallback, useEffect, useState } from "react";
import DropdownIcon from "../icons/dropdown-icon";

export type DropdownItemType = {
  text: string,
  data: string,
}

const Dropdown = ({ items, onSelect, initialItem }: {
  items: Array<DropdownItemType>,
  onSelect: (itemData: string) => void,
  initialItem?: () => string | null | undefined,
}): JSX.Element => {
  const [itemText, setItemText] = useState<string | undefined>();
  const [isExpanded, setIsExpanded] = useState<boolean>(false);

  const handleClick = useCallback((item: DropdownItemType) => () => {
    setItemText(item.text);
    onSelect(item.data);
    setIsExpanded(false);
  }, [onSelect]);

  useEffect(() => {
    if (initialItem && initialItem() && items.map(item => item.data).includes(initialItem()!)) {
      const index = items.map(item => item.data).indexOf(initialItem()!);
      setItemText(items[index].text);
    }
  }, [initialItem, items]);

  return <div css={dropdownCss}>
    <div css={inputCss} onClick={() => setIsExpanded(isExpanded => !isExpanded)}>
      <div>
        {itemText && itemText}
      </div>
      <div css={iconCss(isExpanded)}>
        <DropdownIcon />
      </div>
    </div>
    <div css={dropdownListCss(isExpanded)}>
      {items.map(item => (
        <div
          key={item.data}
          onClick={handleClick(item)}
          css={listItemCss}
        >
          {item.text}
        </div>
      ))}
    </div>
  </div>;
};

const dropdownCss = css`
  position: relative;
  cursor: pointer;
  width: 500px;
`;

const inputCss = css`
  height: 40px;
  padding: 5px 8px;
  border: 1px black solid;
  border-radius: 5px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

const iconCss = (isExpanded: boolean) => css`
  transform-origin: 50% 50%;
  ${isExpanded ? "rotate: 180deg;" : ""}
`;

const dropdownListCss = (isExpanded: boolean) => css`
  position: absolute;
  top: 100%;
  left: 0px;
  display: flex;
  flex-direction: column;
  padding: ${isExpanded ? "8px" : "0px"} 0px;
  height: ${isExpanded ? "fit-content" : 0};
  overflow: hidden;
  border: ${isExpanded ? "1px" : "0px"} black solid;
  border-radius: 5px;
  width: 500px;
  background-color: white;
  z-index: 100;
`;

const listItemCss = css`
  padding: 5px 8px;

  &:hover {
    background-color: #f2f5f3;
  }
`;

export default Dropdown;
