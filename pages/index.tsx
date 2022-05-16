import { NextPage } from 'next';

import Styles from 'styles/Home.module.scss';
import UniversesMap from 'components/UniversesMap';

const HomePage: NextPage = () => {
    return (
        <div className={Styles.main}>
            <div className="window">
                <div className="title-bar">
                    <div className="title-bar-text">
                        THE MAP OF THE MULTIVERSE
                    </div>
                </div>
                <div className="window-body">
                    <UniversesMap />
                </div>
            </div>
        </div>
    );
};

export default HomePage;
