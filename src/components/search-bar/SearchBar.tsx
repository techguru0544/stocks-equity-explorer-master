import { useState } from 'react';
import { Combobox, InputBase, useCombobox } from '@mantine/core';
import { useDebouncedValue, useShallowEffect } from '@mantine/hooks';
import { useGetSearchStocksQuery } from '@/services/stocks.service';
import { useNavigate } from 'react-router-dom';
import { DynamicDataObject, LabelValueOptionType } from '@/types/common';
import { IconSearch } from '@tabler/icons-react';

const SearchBar = () => {
  const [filterOptions, setFilterOptions] = useState<[]>([]);
  const navigate = useNavigate();
  const combobox = useCombobox({
    onDropdownClose: () => combobox.resetSelectedOption()
  });

  const [value, setValue] = useState<string | null>(null);
  const [search, setSearch] = useState('');
  const [debounced] = useDebouncedValue(search, 200);

  const { data, isFetching } = useGetSearchStocksQuery({
    keywords: debounced,
    function: 'SYMBOL_SEARCH'
  });

  useShallowEffect(() => {
    setFilterOptions(
      data?.bestMatches?.map((item: DynamicDataObject) => {
        return {
          value: item?.['1. symbol'],
          label: item?.['2. name']
        };
      })
    );
  }, [isFetching]);

  const options = filterOptions?.map((item: LabelValueOptionType, i) => (
    <Combobox.Option value={item?.['value']} key={i}>
      {item?.['label']}
    </Combobox.Option>
  ));

  return (
    <Combobox
      store={combobox}
      withinPortal={false}
      onOptionSubmit={val => {
        setValue(val);
        setSearch(val);
        navigate(`/stock/${val}`);
        combobox.closeDropdown();
      }}
    >
      <Combobox.Target>
        <InputBase
          size="xl"
          radius={'md'}
          leftSection={<IconSearch />}
          value={search}
          onChange={event => {
            combobox.openDropdown();
            combobox.updateSelectedOptionIndex();
            setSearch(event.currentTarget.value);
          }}
          onClick={() => combobox.openDropdown()}
          onFocus={() => combobox.openDropdown()}
          onBlur={() => {
            combobox.closeDropdown();
            setSearch(value || '');
          }}
          placeholder="Search value"
          rightSectionPointerEvents="none"
        />
      </Combobox.Target>

      <Combobox.Dropdown>
        <Combobox.Options>
          {options?.length > 0 ? (
            options
          ) : (
            <Combobox.Empty>Nothing found</Combobox.Empty>
          )}
        </Combobox.Options>
      </Combobox.Dropdown>
    </Combobox>
  );
};

export default SearchBar;
