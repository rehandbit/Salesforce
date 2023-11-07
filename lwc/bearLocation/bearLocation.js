import { LightningElement, api, wire } from 'lwc';
import { getFieldValue, getRecord } from 'lightning/uiRecordApi'

const NAME_FIELD = 'Bear__c.Name';
const LOCATION_LATITUDE_FIELD = 'Bear__c.Location_Latitude__s';
const LOCATION_LONGITUDE_FIELD = 'Bear__c.Location_Longitude__s';
const bearFields = [
    NAME_FIELD,
    LOCATION_LATITUDE_FIELD,
    LOCATION_LONGITUDE_FIELD
];

export default class BearLocation extends LightningElement {
    @api recordId;
    name;
    mapMarkers = [];
    @wire(getRecord, { recordId: '$recordId', fields: bearFields })
    loadBear({ error, data }) {
        if (error) {
            // 
        } else if (data) {
            // Get Bear Data
            this.name = getFieldValue(data, NAME_FIELD);
            const Latitude = getFieldValue(data, LOCATION_LATITUDE_FIELD);
            const Longitude = getFieldValue(data, LOCATION_LONGITUDE_FIELD);

            // Transform bear data into map Markers

            this.mapMarkers = [{
                location: { Latitude, Longitude },
                title: this.name,
                description: `Coords: ${Latitude}, ${Longitude}`
            }];
        }
    }
    get cardTitle() {
        return (this.name) ? `${this.name}'s location` : 'Bear location';
    }
}