import { utilService } from './utils-service.js';
import { storageService } from './async-storage-service.js';
import gOrders from '../../data/order.json' assert { type: 'json' };

const KEY = 'ordersDB';
// _createOrders()
export const orderService = {
    query,
    getById,
    remove,
    save,
    getEmptyorder,
};

function query() {
    return storageService.query(KEY);
}

function getById(id) {
    return storageService.get(KEY, id);
}

function getEmptyorder() {
    return {
        title: '',
        price: '',
        reviews: [],
    };
}

function remove(id) {
    return storageService.remove(KEY, id);
}

function save(order) {
    return order._id
        ? storageService.put(KEY, order)
        : storageService.post(KEY, order);
}

function _add(order) {
    order._id = utilService.makeId();
    order.createdAt = Date.now();
    gOrders.push(order);
    return order;
}

function _update(order) {
    const idx = gOrders.findIndex((currorder) => currorder._id === order._id);
    gOrders.splice(idx, 1, order);
    return order;
}

function _createOrders() {
    var orders = utilService.loadFromStorage(KEY);
    if (!orders || !orders.length) {
        orders = gOrders;
        utilService.saveToStorage(KEY, orders);
    }
    return orders;
}

function _createOrder(title, price) {
    return {
        _id: utilService.makeId(),
        title,
        createdAt: Date.now(),
        price,
    };
}
