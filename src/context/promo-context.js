import React, {useState} from "react";
const defaultValues = {
  isBlackFridayEnabled: true,
  isGiftEnabled: true,
}

const blackFridayStartedAt = new Date(Date.UTC(2022, 10, 20, 21, 0, 0));
const blackFridayFinishedAt = new Date(Date.UTC(2022, 11, 4, 21, 0, 0));

export const PromoContext = React.createContext(defaultValues);

export const PromoProvider = ({ children }) => {
  const now = new Date();
  const [isBlackFridayEnabled] = useState( now >= blackFridayStartedAt && now <= blackFridayFinishedAt);

  return (
    <PromoContext.Provider
      value={{
        isBlackFridayEnabled: isBlackFridayEnabled,
        isGiftEnabled: isBlackFridayEnabled
      }}
    >
      {children}
    </PromoContext.Provider>
  )
}
