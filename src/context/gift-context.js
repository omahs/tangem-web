import React, {useEffect, useState} from "react";
import {getGeoCode} from "../lib/tangem";
const defaultValues = {
  isGiftEnabled: false,
}

export const GiftContext = React.createContext(defaultValues);

export const GeoProvider = ({ children }) => {
  const [isGiftEnabled, setIsGiftEnabled] = useState(false);
  const [loaded, setLoaded] = useState(false);
  useEffect(() => {
    if (loaded) {
      return function empty() {}
    }

    async function getData() {
      try {
        const notOver = new Date(Date.UTC(2022, 9, 26, 21, 0, 0)) > new Date();
        if (notOver) {
          const result = await getGeoCode();
          setIsGiftEnabled(result === 'ru' );
        }
      } finally {
        setLoaded(false);
      }
    }

    getData();
  }, [loaded])

  return (
    <GiftContext.Provider
      value={{
        isGiftEnabled: isGiftEnabled
      }}
    >
      {children}
    </GiftContext.Provider>
  )
}