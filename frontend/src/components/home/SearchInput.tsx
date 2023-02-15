import Image from 'next/image';
import { useRouter } from 'next/router';
import { FormEvent, useState } from 'react';

import sizes from '@/utils/constants/sizes';
import searchIcon from '@/assets/home/header/search.svg';

function SearchInput() {
  const router = useRouter();
  const [searchValue, setSearchValue] = useState('');

  const onSearch = (e: FormEvent) => {
    e.preventDefault();
    router.push(`/profile/${searchValue}`);
  };
  return (
    <form
      className="flex justify-between w-[100%] border-8 border-black bg-[white] px-3"
      onSubmit={onSearch}
    >
      <input
        type="text"
        value={searchValue}
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
