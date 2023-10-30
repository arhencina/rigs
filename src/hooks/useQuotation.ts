import { create } from "zustand";

interface IQuotationState {
  quotation: IProduct[];
  setQuotation: (newValue: IProduct[]) => void;
}

const useQuotation = create<IQuotationState>()((set) => ({
  quotation: [],
  setQuotation: (newValue) => set({ quotation: newValue }),
}));

export default useQuotation;
