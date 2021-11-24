import MyContext from "./global";

const ContextProvider = ({ children }) => {
  return (<MyContext.Provider
  value={{
    customDetails: "customDetails",
    setCustomDetails: "setCustomDetails",
    modalToShow: "modalToShow",
    setModalToShow: "setModalToShow",
  }}
>
  {children}
</MyContext.Provider>)
};

export default ContextProvider
