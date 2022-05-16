import { NextPage } from 'next';

import Styles from 'styles/Home.module.scss';
import UniversesMap from 'components/UniversesMap';

const HomePage: NextPage = () => {
    return (
        <div className={Styles.main}>
            <UniversesMap />
        </div>
    );
};

export default HomePage;
