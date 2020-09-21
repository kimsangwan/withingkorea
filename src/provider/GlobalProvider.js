import React, { useState } from 'react';
import GlobalContext from '../context/global.context';

const GlobalProvider = ({ children }) => {
  const onChangeGlobal = (values) => {
    setOption({
      ...option,
      ...values,
    });
  };
  const initialState = {
    onChangeGlobal,
    testData: 'asdasd',
    modal: 0,

    id: '',
  };
  const [option, setOption] = useState(initialState);

  return (
    <GlobalContext.Provider value={option}>{children}</GlobalContext.Provider>
  );
};
export default GlobalProvider;
