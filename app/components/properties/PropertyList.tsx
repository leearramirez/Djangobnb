'use client';

import { useEffect, useState } from 'react';
import PropertyListItem from './PropertyListItem';


export type PropertyType = {
    id: string;
    title: string;
    image_url: string;
    price_per_night: number;
}

const PropertyList = () => {
    const [properties, setProperties] = useState<PropertyType[]>([]);
    const getProperties = async () => {
        try {
            const url = 'http://127.0.0.1:8000/api/properties/';
            const response = await fetch(url, {
                method: 'GET',
            });
            const json = await response.json();
            setProperties(json.data);
        } catch (error) {
            console.log('error', error);
        }
    };

    useEffect(() => {
        getProperties();
    }, []);

    return (
        <>
            {properties.map((property) => {
                return (
                    <PropertyListItem
                        key={property.id}
                        property={property}
                    // markFavorite={(is_favorite: any) => markFavorite(property.id, is_favorite)}
                    />
                )
            })}
        </>
    )
}


export default PropertyList;
