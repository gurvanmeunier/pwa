import React, { useEffect, useState } from 'react';
import haversine from '../haversine';

const MyShop = () => {
    const [myShop, setMyShop] = useState({ name: "", distance: "" });

    useEffect(() => {
        const url = "https://formacitron.github.io/shopslist/shops.json"
        fetch(url)
            .then((response) => response.json())
            .then((shops) => {
                console.log(shops)

                navigator.geolocation.getCurrentPosition((position) => {
                    console.log(position.coords.latitude, position.coords.longitude);
                    const nearest = { distance: null, shop: null }
                    for (const shop of shops) {
                        const a = { lat: position.coords.latitude, lng: position.coords.longitude }
                        const b = { latitude: shop.gps_lat, longitude: shop.gps_lng }

                        const distance = haversine(a, b)
                        if (nearest.distance == null) {
                            nearest.distance = distance;
                            nearest.shop = shop;
                        } else {
                            if (nearest.distance > distance) {
                                nearest.distance = distance;
                                nearest.shop = shop;
                            }
                        }
                    }
                    console.log(nearest);
                    setMyShop({ name: nearest.shop.name, distance: (nearest.distance / 1000).toFixed(2) });
                })
            });
    }, []);
    return (
        <>
            <h1>{myShop.name}</h1>
            <p>{myShop.distance} km</p>
        </>
    )
}

export default MyShop;