import sizes from '@/utils/constants/sizes';

function SearchInput() {
  return (
    <input
      type="text"
      className={`w-[100%] h-[${sizes.searchInputHeight}px] px-2`}
      placeholder="Enter a name here..."
    />
  );
}

export default SearchInput;
