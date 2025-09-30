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
  const [quoteItems, setQuoteItems] = useState([]);
  const [pagination, setPagination] = useState({
    currentPage: 1,
    perPage: 10,
    total: 0,
  });
  const [itemType, setItemType] = useState("all");
  const [department, setDepartment] = useState("all");
  const [createdBy, setCreatedBy] = useState("all");
  const [status, setStatus] = useState("all");
  const [dateRange, setDateRange] = useState({ start: "", end: "" });

  //   Get Quote List
  const getQuoteList = async ({
    search = "",
    pi_type = itemType,
    department_id = department,
    order_by = createdBy,
    status: statusParam = status,
    pi_date_start_date = dateRange.start,
    pi_date_end_date = dateRange.end,
    page = pagination.currentPage,
    perPage = pagination.perPage || 10, // ✅ single default
  } = {}) => {
    try {
<<<<<<< Updated upstream
      const params = {
        search,
        pi_type: pi_type !== "all" ? pi_type : undefined,
        department_id: department_id !== "all" ? department_id : undefined,
        order_by: order_by !== "all" ? order_by : undefined,
        status: statusParam !== "all" ? statusParam : undefined,
        pi_date_start_date: pi_date_start_date || undefined,
        pi_date_end_date: pi_date_end_date || undefined,
        page,
        per_page: perPage,
      };

=======
      const params = { search, page, per_page: perPage };
>>>>>>> Stashed changes
      const res = await postData(ENDPOINTS.GETQUOTE.LIST, params);
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
  // const getQuoteCreate = async (payload) => {
  //   try {
  //     const res = await postData(ENDPOINTS.GETQUOTE.CREATE, payload);
  //     if (res?.status) {
  //       console.log("res", res.data);
  //       setQuoteData(res.data);
  //       toast.success(res.message || "Get Quote Create successful!");
  //       // getPIRequest();
  //     }
  //     return res.data;
  //   } catch (error) {
  //     toast.error("Error during Get Quote Create");
  //     console.error("Get Quote Create PIRequest error:", error);
  //   }
  // };

  // ---------------- GET QUOTE CREATE ----------------
  const getQuoteCreate = async (payload) => {
    try {
      const res = await postData(ENDPOINTS.GETQUOTE.CREATE, payload);
      if (res?.status) {
        const newId = res.data.id;
        toast.success(res.message || "Get Quote Create successful!");

        // Immediately fetch details of the new quote
        await getQuoteDetails(newId);
      }
      return res;
    } catch (error) {
      toast.error("Error during Get Quote Create");
      console.error("Get Quote Create error:", error);
    }
  };

  // ---------------- GET QUOTE DETAILS ----------------
  const getQuoteDetails = async (id) => {
    try {
      const res = await getData(`${ENDPOINTS.GETQUOTE.DETAILS}?id=${id}`);
      if (res?.status) {
        setQuoteData(res.data);
        setQuoteItems(res.data);
        console.log("ddddd", res.data);
      }
      return res;
    } catch (error) {
      toast.error("Error fetching Get Quote Details");
      console.error("Get Quote Details error:", error);
    }
  };

  return (
    <GetQuoteContext.Provider
      value={{
        search,
        setSearch,
        itemType,
        setItemType,
        department,
        setDepartment,
        createdBy,
        setCreatedBy,
        status,
        setStatus,
        quote,
        setQuote,
        quoteData,
        setQuoteData,
        quoteItems,
        setQuoteItems,
        pagination,
        dateRange,
        setDateRange,
        setPagination,
        getQuoteCreate,
        getQuoteList,
        getQuoteDetails,
      }}
    >
      {children}
    </GetQuoteContext.Provider>
  );
};
