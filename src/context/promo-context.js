import React from "react";
const defaultValues = {
  isGiftEnabled: false,
  isChristmasEnabled: false,
}

const christmasStartedAt = new Date(Date.UTC(2022, 11, 11, 21, 0, 0));
const christmasFinishedAt = new Date(Date.UTC(2023, 0, 8, 21, 0, 0));

export const PromoContext = React.createContext(defaultValues);

export const PromoProvider = ({ children }) => {
  const now = new Date();
  const isChristmasEnabled = now >= christmasStartedAt && now <= christmasFinishedAt;

  return (
    <PromoContext.Provider
      value={{
        isGiftEnabled: isChristmasEnabled,
        isChristmasEnabled: isChristmasEnabled
      }}
    >
      {children}
    </PromoContext.Provider>
  )
}
