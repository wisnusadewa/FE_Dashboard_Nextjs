import { Search } from 'lucide-react';
import { ChangeEvent } from 'react';
import { Input } from '../ui/input';

interface searchBarParams {
  value: string;
  onChange: (value: string) => void;
}

const SearchBar = ({ value, onChange }: searchBarParams) => {
  // handleChange
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value);
  };

  //   console.log('value search bar?:', value);

  return (
    <div className="relative flex justify-center items-center w-full md:w-[400px] h-[40px]">
      <span className="absolute left-2 text-slate-400 ">
        <Search />
      </span>
      <Input onChange={handleChange} value={value} placeholder="Search articles" className="bg-white pl-8 text-black" />
    </div>
  );
};

export default SearchBar;
