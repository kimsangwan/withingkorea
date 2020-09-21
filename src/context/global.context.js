import { createContext } from 'react';

const GlobalContext = createContext({
  onChangeGlobal: () => {},
  modal: '(0)',
});

export default GlobalContext;
