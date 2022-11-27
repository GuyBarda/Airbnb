import { utilService } from './util.service.js';
import { storageService } from './async-storage-service.js';

const KEY = 'housesDB';

export const houseService = {
    query,
    getById,
    remove,
    save,
    getEmptyhouse,
};

var gHouses = _createHouses();

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
            _createHouse('Learn Vuex', 2),
            _createHouse('Master CSS', 1),
            _createHouse('Go out', 1),
            _createHouse('Build a new library', 1),
        ];
        utilService.saveToStorage(KEY, houses);
    }
    return houses;
}

function _createHouse(txt, importance) {
    return {
        _id: utilService.makeId(),
        txt,
        isDone: false,
        createdAt: Date.now(),
        importance,
    };
}
