import { utilService } from './util.service.js';
import { storageService } from './async-storage-service.js';
import gHouses from '../../data/house.json' assert {type: 'json'}


const KEY = 'housesDB';

export const houseService = {
    query,
    getById,
    remove,
    save,
    getEmptyhouse,
};

console.log(gHouses);

function query() {
    return storageService.query(KEY);
}

function getById(id) {
    return storageService.get(KEY, id);
}

function getEmptyhouse() {
    return {
        title: '',
        price: '',
        reviews: [],
    };
}

function remove(id) {
    return storageService.remove(KEY, id);
}

function save(house) {
    return house._id
        ? storageService.put(KEY, house)
        : storageService.post(KEY, house);
}

function _add(house) {
    house._id = utilService.makeId();
    house.createdAt = Date.now();
    gHouses.push(house);
    return house;
}

function _update(house) {
    const idx = gHouses.findIndex((currhouse) => currhouse._id === house._id);
    gHouses.splice(idx, 1, house);
    return house;
}

function _createHouses() {
    var houses = utilService.loadFromStorage(KEY);
    if (!houses || !houses.length) {
        houses = [
            _createHouse('bed for 3', 200),
            _createHouse('Nice house', 11),
            _createHouse('Very good home', 1321),
        ];
        utilService.saveToStorage(KEY, houses);
    }
    return houses;
}

function _createHouse(title, price) {
    return {
        _id: utilService.makeId(),
        title,
        createdAt: Date.now(),
        price,
    };
}
