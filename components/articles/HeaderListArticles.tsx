'use client';

import Image from 'next/image';
import Navbar from '../navbar/Navbar';
import FilterCategory from './FilterCategory';
import SearchBar from './SearchBar';

interface stateProps {
  search: string;
  setSearch: (val: string) => void;
  allArticle: Articles[];
}

const HeaderListArticles = ({ search, setSearch, allArticle }: stateProps) => {
  return (
    <div className="relative w-full h-[560px] md:h-[500px] overflow-hidden ">
      {/* Navbar */}
      <div className="md:absolute static top-0 text-white z-20 w-full">
        <Navbar srcExt="/mainLogoWhite.svg" profileNameArticlesIsMd="text-white" />
      </div>

      <Image src={'/articles/Image-header-articles.png'} width={320} height={213} alt="header-imnage" className="w-full h-full object-cover absolute" />

      <div className="bg-blue-600 opacity-[86%] z-10 w-full h-[560px] md:h-[500px]"></div>

      {/* Header Articles */}
      <div className="absolute md:top-0 top-24 w-full h-full flex justify-center items-center px-[20px]  ">
        <div className="h-full md:h-[276px] w-[337px] md:w-[730px] text-white text-center justify-center items-center ">
          <p className="font-[700] text-[14px] md:text-[16px]">Blog genzet</p>
          <h2 className="text-[36px] md:text-[48px] font-[500] text-center">The Journal : Design Resources, Interviews, and Industry News</h2>
          <p className="font-[400] text-[20px] md:text-[24px] ">Your daily dose of design insights!</p>

          {/* searchBar */}
          <div className="flex justify-center">
            <div className="mt-[40px] w-full md:w-[608px] flex  flex-col md:flex-row gap-2 justify-center items-center py-[10px] bg-blue-500 rounded-[12px] px-[10px]">
              <FilterCategory allArticle={allArticle} />
              <SearchBar value={search} onChange={(val) => setSearch(val)} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeaderListArticles;
