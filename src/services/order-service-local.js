import { utilService } from './utils-service.js';
import { storageService } from './async-storage-service.js';
// import gOrders from '../../data/order.json' assert { type: 'json' };

const KEY = 'ordersDB';
// _createOrders()

export const orderService = {
    query,
    getById,
    remove,
    save,
    getEmptyOrder,
    getOrdersByUserId,
};

function query() {
    return storageService.query(KEY);
}

async function getOrdersByUserId(userId) {
    let orders = await storageService.query();
    return orders.filter((order) => order.hostId === userId);
}

function getById(id) {
    return storageService.get(KEY, id);
}

function getEmptyOrder() {
    return {
        hostId: '',
        buyer: {
            _id: '',
            fullname: '',
            imgUrl: '',
        },
        totalPrice: 0,
        startDate: Date.now() + 1000 * 60 * 60 * 24,
        endDate: Date.now() + 1000 * 60 * 60 * 24 * 5,
        guests: {
            adults: 1,
            children: 0,
            infants: 0,
            pets: 0,
        },
        stay: {
            _id: '',
            name: '',
            price: 0,
            loc: {
                
            }
        },
        msgs: [],
        status: 'pending', // pending, approved
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
