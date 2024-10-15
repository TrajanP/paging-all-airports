import Homepage from '../components/pages/Homepage';
import { MyContextProvider } from './context/MyContext';

export default function Home() {
  return (
    <div>
      {/* <MyContextProvider> */}
          <Homepage></Homepage>
      {/* </MyContextProvider> */}
    </div>
  );
}
