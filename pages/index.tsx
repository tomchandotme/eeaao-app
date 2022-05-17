import { NextPage } from 'next';

import Styles from 'styles/Home.module.scss';
import UniversesMap from 'components/UniversesMap';
import Head from 'next/head';

const HomePage: NextPage = () => {
    return (
        <div className={Styles.main}>
            <Head>
                <title>eeaao</title>
                <meta name="description" content="eeaao" />
                <meta name="theme-color" content="#002" />

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
            <div className="window">
                <div className="title-bar">
                    <div className="title-bar-text">
                        THE MAP OF THE MULTIVERSE
                    </div>
                </div>
                <div className="window-body">
                    <UniversesMap />
                </div>
                <div className="status-bar">
                    <p className="status-bar-field">STABLE</p>
                    <p className="status-bar-field">{}</p>
                </div>
            </div>
        </div>
    );
};

export default HomePage;
