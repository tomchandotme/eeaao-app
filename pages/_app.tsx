import 'styles/globals.scss';
import { AppProps } from 'next/app';

import '98.css';
import Head from 'next/head';

const App = ({ Component, pageProps }: AppProps) => {
    return (
        <>
            <Head>
                <title>eeaao</title>
                <meta name="description" content="eeaao" />
                <meta name="theme-color" content="#002" />

                <meta charSet="utf-8" />
                <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
                <meta
                    name="viewport"
                    content="width=device-width,initial-scale=1,minimum-scale=1,maximum-scale=1,user-scalable=no"
                />

                <link
                    rel="apple-touch-icon"
                    sizes="180x180"
                    href="/apple-touch-icon.png"
                />
                <link
                    rel="icon"
                    type="image/png"
                    sizes="32x32"
                    href="/favicon-32x32.png"
                />
                <link
                    rel="icon"
                    type="image/png"
                    sizes="16x16"
                    href="/favicon-16x16.png"
                />
                <link rel="manifest" href="/site.webmanifest" />
            </Head>
            <Component {...pageProps} />;
        </>
    );
};

export default App;
