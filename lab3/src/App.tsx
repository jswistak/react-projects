import React from 'react';
import CarsListItemComponent from './components/CarsListItemComponent';
import CarsListComponent from './components/CarsListComponent';

import { CARS } from './data/Car';
const App: React.FC = () => {
    return (
        <div>
            Good luck!
            <CarsListComponent/>
            
        </div>
    );
}

export default App;
