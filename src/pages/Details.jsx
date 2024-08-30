import React from 'react';
import { useParams } from 'react-router-dom';

const Details = () => {
    const { name } = useParams();
    console.log(name);

    return <div>Detail {name}</div>;
};

export default Details;
