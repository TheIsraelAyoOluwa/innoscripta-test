import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import {
  getAllGuardianData,
  getAllNewsApiData,
  getAllNewsApiSourceData,
  getAllTheNewsApiData,
  getAllTheNewsApiSourceData,
} from "./services/newsServices";
import SelectInput from "./components/common/SelectInput";
import { NEWS_API_CATEGORY } from "./constants/staticData";
import DatePicker from "./components/common/DatePicker";
import { Button } from "./components/ui/button";
import { QUERY_KEYS } from "./constants/queryKeys";
import { NewsCard } from "./components/NewsCard";
import Typography from "./libs/typography";
import { NewsCardSkeleton } from "./components/NewsCardSkeleton";
import { Header } from "./components/Header";

function App() {
  const [data, setData] = useState({
    query: "bitcoin",
    from: "",
    sortBy: "",
    category: "",
    source: "",
    to: "",
  });

  const refresh = () => {
    setData({
      query: "bitcoin",
      from: "",
      sortBy: "",
      category: "",
      source: "",
      to: "",
    });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setData({ ...data, query: e.target.value });
  };

  const {
    data: newsData1,
    refetch: refetchNews,
    isFetching: fetching1,
  } = useQuery({
    queryKey: [QUERY_KEYS.ALL_NEWS_API],
    queryFn: () => getAllNewsApiData(data),
  });

  const {
    data: newsData2,
    refetch: refetchTheNews,
    isFetching: fetching2,
  } = useQuery({
    queryKey: [QUERY_KEYS.ALL_THE_NEWS_API],
    queryFn: () => getAllTheNewsApiData(data),
  });

  const {
    data: newsData3,
    refetch: refetchGuardian,
    isFetching: fetching3,
  } = useQuery({
    queryKey: [QUERY_KEYS.GUARDIAN_NEWS],
    queryFn: () => getAllGuardianData(data),
  });

  const newsData = [
    ...(newsData1 ?? []),
    ...(newsData2 ?? []),
    ...(newsData3 ?? []),
  ];

  const { data: newsDataSource1, isFetching: fetchingSource1 } = useQuery({
    queryKey: [QUERY_KEYS.NEWS_API_SOURCE],
    queryFn: () => getAllNewsApiSourceData(data),
  });

  const { data: newsDataSource2, isFetching: fetchingSource2 } = useQuery({
    queryKey: [QUERY_KEYS.THE_NEWS_API_SOURCE, data.category],
    queryFn: () => getAllTheNewsApiSourceData(),
  });

  const sourceDone = [...(newsDataSource1 ?? []), ...(newsDataSource2 ?? [])];

  const handleSearchFilters = () => {
    refetchTheNews();
    refetchGuardian();
    refetchNews();
  };

  const isLoading =
    fetching1 || fetching2 || fetching3 || fetchingSource1 || fetchingSource2;


  return (
    <div className="">
      <Header onRefresh={refresh} />

      <div className="w-[80%] mx-auto py-6 space-y-6">
        <div className="flex md:flex-row flex-col items-center space-x-4 space-y-4  md:space-y-0">
          <div className="border-[1px] h-[50px] md:w-[50%] w-[100%] px-4 flex items-center rounded-3xl ">
            <input
              type="text"
              value={data.query}
              onChange={handleInputChange}
              className=" w-[100%] h-[90%] outline-none"
            />
          </div>

          <Button type="button" className="w-[100%] md:w-auto  " onClick={handleSearchFilters}>
            Fetch data Again
          </Button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
          <SelectInput
            options={NEWS_API_CATEGORY || []}
            value={data.category}
            onChange={(value: string) =>
              setData({ ...data, source: "", category: value })
            }
            placeholder="Select Category"
            label="Category"
          />

          <SelectInput
            options={sourceDone || []}
            value={data.source}
            onChange={(val) => setData({ ...data, source: val })}
            placeholder="Select Source"
            label="Source"
          />

          <DatePicker
            value={data.from ? new Date(data.from) : undefined}
            label="From"
            onChange={(val) =>
              setData({
                ...data,
                from: val ? val.toISOString().split("T")[0] : "",
              })
            }
          />

          <DatePicker
            value={data.to ? new Date(data.to) : undefined}
            label="To"
            onChange={(val) =>
              setData({
                ...data,
                to: val ? val.toISOString().split("T")[0] : "",
              })
            }
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6 place-items-center">
          {isLoading ? (
            <>
              {Array.from({ length: 8 }).map((_, i) => (
                <NewsCardSkeleton key={i} />
              ))}
            </>
          ) : (
            <>
              {newsData?.length ? (
                <>
                  {newsData.map((item, index) =>
                    item ? (
                      <NewsCard
                        key={`news-item-${index}`}
                        title={item.title}
                        description={item.description}
                        imageUrl={item.imageUrl}
                        index={index}
                      />
                    ) : null
                  )}
                </>
              ) : (
                <Typography.SubText className="text-center text-gray-500 mt-8">
                  No news found. Try adjusting your filters.
                </Typography.SubText>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
