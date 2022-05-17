import 'styles/globals.scss';
import { AppProps } from 'next/app';

import '98.css';

const App = ({ Component, pageProps }: AppProps) => {
    return <Component {...pageProps} />;
};

export default App;
