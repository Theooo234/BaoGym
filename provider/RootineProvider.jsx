import { createContext, useEffect, useState } from "react";

const RootineContext = createContext({
  rootine: {},
  addRootine: () => {},
  updateRootine: () => {},
  setRootine: () => {},
});

export function RootineProvider({ children }) {
  const [rootine, setRootine] = useState();
    console.log("New rootine", rootine)

  const updateRootine = (rootine) => {
    const newRootine = {...rootine};
    console.log("New rootine", rootine)

    setRootine(newRootine);
  }

  const addRootine = async (evenement) => {
    // TODO: ajouter rootine à la base de données
  };

  useEffect(() => {
    // const fetchData = async () => {
    //   await getRootines();
    // };

    // fetchData();
  }, []);

  return (
    <RootineContext.Provider
      value={{
        rootine,
        addRootine,
        updateRootine,
        setRootine
      }}
    >
      {children}
    </RootineContext.Provider>
  );
}
export default RootineContext;
