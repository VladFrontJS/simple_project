import axios from 'axios';
import { useState, useEffect } from 'react';

import Controls from '../components/Controls';
import List from '../components/List';
import Card from '../components/Card';
import { ALL_COUNTRIES } from '../config';

const HomePage = ({ countries, setCountries }) => {
    const [filtredCountries, setfiltredCountries] = useState(countries);

    const handleSearch = (search, region) => {
        let data = [...countries];

        if (region) {
            data = data.filter(c => c.region.includes(region));
        }

        if (search) {
            data = data.filter(c => c.name.common.toLowerCase().includes(search.toLowerCase()));
        }

        setfiltredCountries(data);
    };

    useEffect(() => {
        if (!countries.length) {
            axios.get(ALL_COUNTRIES).then(({ data }) => setCountries(data));
        } else {
            setfiltredCountries(countries);
        }
    }, [countries, setCountries]);

    return (
        <>
            <Controls onSearch={handleSearch} />
            <List>
                {filtredCountries.map(country => {
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
