import {fromJS} from 'immutable';
import MAP_STYLE from './map-style-basic-v8.json';

// For more information on data-driven styles, see https://www.mapbox.com/help/gl-dds-ref/
export const dataLayer = fromJS({
    version: 8,
    sources: {
        points: {
            type: 'geojson',
            data: {
                type: 'FeatureCollection',
                features: [
                    {type: 'Feature', geometry: {type: 'Point', coordinates: [-122.45, 37.78]}}
                ]
            }
        }
    },
    layers: [
        {
            id: 'my-layer',
            type: 'circle',
            source: 'points',
            paint: {
                'circle-color': '#f00',
                'circle-radius': 4
            }
        }
    ]
});

export const defaultMapStyle = fromJS(MAP_STYLE);
