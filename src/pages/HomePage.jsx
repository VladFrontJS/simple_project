import axios from 'axios';
import { useEffect } from 'react';

import Controls from '../components/Controls';
import List from '../components/List';
import Card from '../components/Card';
import { ALL_COUNTRIES } from '../config';

const HomePage = ({ countries, setCountries }) => {
    // const [countries, setCountries] = useState([]);

    useEffect(() => {
        if (!countries.length) {
            axios.get(ALL_COUNTRIES).then(({ data }) => setCountries(data));
        }
    }, []);

    return (
        <>
            <Controls />
            <List>
                {countries.map(country => {
                    const countryInfo = {
                        img: country.flags.png,
                        name: country.name.common,
                        info: [
                            {
                                title: 'Population',
                                description: country.population.toLocaleString(),
                            },
                            {
                                title: 'Region',
                                description: country.region,
                            },
                            {
                                title: 'Capital',
                                description: country.capital[0],
                            },
                        ],
                    };

                    return <Card key={country.name.common} {...countryInfo} />;
                })}
            </List>
        </>
    );
};

export default HomePage;
