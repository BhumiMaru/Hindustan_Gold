import { createContext, useContext, useState } from "react";
import { toast } from "react-toastify";
import { getData, postData } from "../../utils/api";
import { ENDPOINTS } from "../../constants/endpoints";

export const GetQuoteContext = createContext();

// Get Quote custom hook
export const useGetQuote = () => {
  return useContext(GetQuoteContext);
};

// Get Quote Provider
export const GetQuoteProvider = ({ children }) => {
  const [search, setSearch] = useState("");
  const [quote, setQuote] = useState([]);
  const [quoteData, setQuoteData] = useState(null); // create get quote
  const [pagination, setPagination] = useState({
    currentPage: 1,
    perPage: 10,
    total: 0,
  });

  //   Get Quote List
  const getQuoteList = async ({ page = 1, perPage = 10 } = {}) => {
    try {
      const params = { search, page, per_page: perPage };
      const res = await getData(ENDPOINTS.GETQUOTE.LIST, params);
      const apiData = res.data;
      setQuote(apiData.data || []);
      setPagination({
        currentPage: apiData.current_page || 1,
        perPage: apiData.per_page || perPage,
        total: apiData.total || 0,
      });
    } catch (error) {
      toast.error("Error during Get Quote List");
      console.error("Get Quote List PIRequest error:", error);
    }
  };

  // GET QUOTE CREATE
  const getQuoteCreate = async (payload) => {
    try {
      const res = await postData(ENDPOINTS.GETQUOTE.CREATE, payload);
      if (res?.status) {
        console.log("res", res.data);
        setQuoteData(res.data);
        toast.success(res.message || "Get Quote Create successful!");
        // getPIRequest();
      }
      return res.data;
    } catch (error) {
      toast.error("Error during Get Quote Create");
      console.error("Get Quote Create PIRequest error:", error);
    }
  };

  return (
    <GetQuoteContext.Provider
      value={{
        search,
        setSearch,
        quote,
        setQuote,
        quoteData,
        setQuoteData,
        pagination,
        setPagination,
        getQuoteCreate,
        getQuoteList,
      }}
    >
      {children}
    </GetQuoteContext.Provider>
  );
};
