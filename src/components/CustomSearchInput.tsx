import { useDispatch, useSelector } from "react-redux";

import { setSearch } from "../redux/actions";
import type { RootState } from "../redux/store";

export const SearchInput = () => {
  const search = useSelector((state: RootState) => state.search);
  const dispatch = useDispatch();

  return (
    <div className="relative">
      <input
        type="text"
        className="h-[72px] w-full shadow-[10px_10px_35px_0px_rgba(0,0,0,0.45)] pl-8 rounded-md"
        placeholder="Find the items you're looking for"
        value={search}
        onChange={(e) => dispatch(setSearch(e.target.value))}
      />
      <svg
        className="absolute right-8 top-1/2 -translate-y-1/2 w-5 h-5 text-white"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M21 21l-4.35-4.35A7.5 7.5 0 104.5 4.5a7.5 7.5 0 0012.15 12.15z"
        />
      </svg>
    </div>
  );
};
