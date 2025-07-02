import { useEffect, useState, useRef } from "react";
import { useSearchParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import type { RootState } from "../redux/store";
import {
  setItems,
  setSearch,
  toggleFilter,
  incrementPage,
} from "../redux/actions";

import useDebounce from "../hooks/useDebounce";

import type { Item } from "../models/Item";
import type { PricingOptionTypes } from "../models/pricing";
import { PricingOption } from "../models/pricing";

import { Header } from "../components/Header";
import { ProductCard } from "../components/ProductCard";
import { Filters } from "../components/Filters";
import { SearchInput } from "../components/CustomSearchInput";

const PAGE_SIZE = 16;

export const Home = () => {
  const dispatch = useDispatch();
  const { allItems, search, filters, minPrice, maxPrice, page } = useSelector(
    (state: RootState) => state
  );
  const [searchParams] = useSearchParams();
  const observerRef = useRef<HTMLDivElement | null>(null);

  const [loading, setLoading] = useState(false);

  const debouncedSearch = useDebounce(search, 300);

  useEffect(() => {
    const search = searchParams.get("search") ?? "";
    const filtersRaw = searchParams.get("filters") ?? "";
    const filters = filtersRaw
      .split(",")
      .map((f) => parseInt(f))
      .filter((f) => !isNaN(f));

    dispatch(setSearch(search));
    filters.forEach((f) => dispatch(toggleFilter(f as PricingOptionTypes)));
  }, []);

  useEffect(() => {
    setLoading(true);
    fetch("https://closet-recruiting-api.azurewebsites.net/api/data")
      .then((res) => res.json())
      .then((json) => {
        // Parsing data according to the types defined
        const validated: Item[] = json.map((item: any) => ({
          id: item.id,
          title: item.title,
          creator: item.creator,
          imagePath: item.imagePath,
          price: item.price,
          pricingOption: item.pricingOption,
        }));
        dispatch(setItems(validated));
      })
      .catch((err) => {
        console.error("Fetch error:", err);
      })
      .finally(() => setLoading(false));
  }, []);

  const filteredData = allItems.filter((item) => {
    const matchesFilter =
      filters.length === 0 || filters.includes(item.pricingOption);

    const matchesSearch =
      item.title.toLowerCase().includes(debouncedSearch.toLowerCase()) ||
      item.creator.toLowerCase().includes(debouncedSearch.toLowerCase());

    const matchesPrice =
      item.pricingOption !== PricingOption.Paid ||
      (item.price >= minPrice && item.price <= maxPrice);

    return matchesFilter && matchesSearch && matchesPrice;
  });

  const paginatedData = filteredData.slice(0, page * PAGE_SIZE);
  const hasMore = paginatedData.length < filteredData.length;

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        // the pagination condition checks if data is available otherwise the observer sees the ref immediately and moves to page 2
        if (entries[0].isIntersecting && paginatedData.length >= PAGE_SIZE) {
          setTimeout(() => {
            dispatch(incrementPage());
          }, 600); // ← delay scroll trigger by 600ms
        }
      },
      { threshold: 1.0 }
    );

    const node = observerRef.current;
    if (node) observer.observe(node);
    return () => {
      if (node) observer.unobserve(node);
    };
  }, [paginatedData.length]);

  useEffect(() => {
    const params = new URLSearchParams();
    if (search) params.set("search", search);
    if (filters.length) params.set("filters", filters.join(","));
    window.history.replaceState({}, "", `/?${params.toString()}`);
  }, [search, filters]);

  return (
    <div className="flex flex-col w-full gap-10">
      <Header />
      <main className="flex flex-col gap-8 p-8">
        <SearchInput />
        <Filters />
        <div className="grid grid-cols-1 xl:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 gap-8">
          {paginatedData.map((item) => (
            <ProductCard key={item.id} item={item} />
          ))}
        </div>
        {/* Loader */}
        <div
          ref={observerRef}
          className="h-12 mt-8 flex justify-center items-center"
        >
          {loading || hasMore ? (
            <span className="text-md text-[#69d79b]">Loading...</span>
          ) : (
            <span className="text-md text-[#69d79b]">No more content</span>
          )}
        </div>
      </main>
    </div>
  );
};
