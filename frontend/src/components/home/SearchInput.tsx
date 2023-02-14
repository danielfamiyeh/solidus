import Image from 'next/image';
import { FormEvent, useState } from 'react';

import sizes from '@/utils/constants/sizes';
import searchIcon from '@/assets/home/header/search.svg';

function SearchInput() {
  const [searchValue, setSearchValue] = useState('');
  const [searchInputType, setSearchInputType] = useState('address');

  const onSearch = (e: FormEvent) => {
    e.preventDefault();
  };
  return (
    <form
      className="flex justify-between w-[100%] border-8 border-black bg-[white] px-3"
      onSubmit={onSearch}
    >
      <input
        type="text"
        placeholder="Paste user address..."
        onChange={({ target: { value } }) => setSearchValue(value)}
        className={`w-[100%] h-[${sizes.searchInputHeight}px] py-3 px-2 rounded-md mr-8`}
      />

      <button className="hover:opacity-50 active:opacity-25">
        <Image width={32} height={32} alt="Search icon" src={searchIcon} />
      </button>
    </form>
  );
}

type SearchInputType = 'address' | 'name';

export default SearchInput;
