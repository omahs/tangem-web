import React from "react";
const defaultValues = {
  isBlackFridayEnabled: false,
  isGiftEnabled: false,
}

const blackFridayStartedAt = new Date(Date.UTC(2022, 10, 20, 21, 0, 0));
const blackFridayFinishedAt = new Date(Date.UTC(2022, 11, 11, 21, 0, 0));

export const PromoContext = React.createContext(defaultValues);

export const PromoProvider = ({ children }) => {
  const now = new Date();

  return (
    <PromoContext.Provider
      value={{
        isBlackFridayEnabled: now >= blackFridayStartedAt && now <= blackFridayFinishedAt,
        isGiftEnabled: now >= blackFridayStartedAt && now <= blackFridayFinishedAt
      }}
    >
      {children}
    </PromoContext.Provider>
  )
}
