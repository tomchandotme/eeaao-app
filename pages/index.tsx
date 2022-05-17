import { NextPage } from 'next';
import { useState } from 'react';

import cx from 'classnames';

import Styles from 'styles/Home.module.scss';
import UniversesMap from 'components/UniversesMap';

const HomePage: NextPage = () => {
    const [selectedUniverse, setSelectedUniverse] = useState<string>();
    return (
        <div className={Styles.main}>
            <div className="window">
                <div className="title-bar">
                    <div className="title-bar-text">
                        THE MAP OF THE MULTIVERSE
                    </div>
                </div>
                <div className="window-body">
                    <UniversesMap onChange={setSelectedUniverse} />
                </div>
                <div className="status-bar">
                    <p className="status-bar-field">
                        STATUS: <b>STABLE</b>
                    </p>
                    <p className={cx('status-bar-field', Styles.current)}>
                        TARGETED UNIVERSE: {selectedUniverse ?? 'NONE'}
                    </p>
                </div>
            </div>
        </div>
    );
};

export default HomePage;
