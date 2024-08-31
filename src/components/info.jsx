import styled from 'styled-components';
import axios from 'axios';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import getObjectValuesInArray from '../helper/helper';
import { filterByCode } from '../config';

const Wrapper = styled.section`
    margin: top: 3 rem;
    width: 100%;
    display: grid;
    grid-template-columns: 100%;
    gap: 2rem;

    @media(min-width: 767px) {
        grid-template-columns: minmax(100px, 400px) 1fr;
        align-items: center;
        gap: 5rem;
    };
    @media(min-width: 1024px) {
        grid-template-columns: minmax(400px, 600px) 1fr;
    };
`;

const InfoImage = styled.img`
    display: block;
    width: 100%;
    height: 100%;
    object-fit: contain;
`;

const InfoTitle = styled.h1`
    margin: 0;
    font-weight: var(--fw-normal);
`;

const ListGroup = styled.div`
    display: flex;
    flex-direction: colunm;

    gap: 2rem;

    @media (min-width: 1024px) {
        flex-direction: row;
        gap: 4rem;
    }
`;

const List = styled.ul`
    list-style: none;
    margin: 0;
    padding: 0;
`;

const ListItem = styled.li`
    line-height: 1.8;

    & > b {
        font-weight: var(--fw-bold);
    }
`;

const Meta = styled.div`
    margin: 3rem;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 1.5rem;

    & > b {
        font-weight: var(--fw-bold);
    }

    @media (minwidth: 767px) {
        flex-direction: row;
        align-items: center;
    }
`;

const TagGroup = styled.div`
    display: flex;
    gap: 1rem;
    flex-wrap: wrap;
`;

const Tag = styled.span`
    padding: 0 1rem;
    background: var(--colors-ui-base);
    box-shadow: var(--shadow);
    line-height: 1.5;
    cursor: pointer;
`;

const Info = props => {
    const { name, flags, capital, population, region, subregion, tld, currencies = [], languages = [], borders = [] } = props;

    const [neighbors, setNeighbors] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        if (borders.length) {
            axios.get(filterByCode(borders)).then(({ data }) => {
                setNeighbors(data.map(c => c.name.common));
            });
        }
    }, [borders]);

    //Converting Data Format currencies & languages  to Array
    const Currencies = getObjectValuesInArray(currencies);
    const Languages = getObjectValuesInArray(languages);

    return (
        <Wrapper>
            <InfoImage src={flags.png} alt={name.common} />
            <div>
                <InfoTitle>{name.common}</InfoTitle>
                <ListGroup>
                    <List>
                        <ListItem>
                            <b>Nativ name: </b> {name.official}
                        </ListItem>
                        <ListItem>
                            <b>Population: </b> {population.toString()}
                        </ListItem>
                        <ListItem>
                            <b>Region: </b> {region}
                        </ListItem>

                        <ListItem>
                            <b>Sub region: </b> {subregion}
                        </ListItem>
                        <ListItem>
                            <b>Capital: </b> {capital[0]}
                        </ListItem>
                    </List>
                    <List>
                        <ListItem>
                            <b>Top level domein: </b>
                            {tld.map(d => (
                                <span key={d}>{d} </span>
                            ))}
                        </ListItem>
                        <ListItem>
                            <b>Currensies: </b>
                            {Currencies.map(c => (
                                <span key={c}>{c}; </span>
                            ))}
                        </ListItem>
                        <ListItem>
                            <b>Languages: </b>
                            {Languages.map(l => (
                                <span key={l}>{l}</span>
                            ))}
                        </ListItem>
                    </List>
                </ListGroup>
                <Meta>
                    <b>Border Countries</b>
                    {!borders.length ? (
                        <span>There is no border countries</span>
                    ) : (
                        <TagGroup>
                            {neighbors.map(b => (
                                <Tag
                                    key={b}
                                    onClick={() => {
                                        navigate(`/country/${b}`);
                                    }}
                                >
                                    {b}
                                </Tag>
                            ))}
                        </TagGroup>
                    )}
                </Meta>
            </div>
        </Wrapper>
    );
};

export default Info;
