import { httpService } from './http-service.js';
import { userService } from './user-service.js';

const STORAGE_KEY = 'order';
export const orderService = {
    query,
    getById,
    save,
    remove,
    getEmptyOrder,
    addOrderMsg,
    getMyTrips,
    getMyOrders,
};

window.cs = orderService;

async function query(filterBy = { buyerId: '', hostId: '' }) {
    return httpService.get(STORAGE_KEY, filterBy);
}

async function getMyTrips(filterBy = { buyerId: '' }) {
    return httpService.get(STORAGE_KEY, filterBy);
}

async function getMyOrders(filterBy = { hostId: '' }) {
    return httpService.get(STORAGE_KEY, filterBy);
}

function getById(orderId) {
    return httpService.get(`order/${orderId}`);
}

async function remove(orderId) {
    return httpService.delete(`order/${orderId}`);
}

async function save(order) {
    var savedOrder;
    if (order._id) {
        savedOrder = await httpService.put(`order/${order._id}`, order);
    } else {
        console.log('no in')
        savedOrder = await httpService.post('order/', order);
    }
    return savedOrder;
}

async function addOrderMsg(orderId, txt) {
    const savedMsg = await httpService.post(`order/${orderId}/msg`, { txt });
    return savedMsg;
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
            loc: {},
        },
        status: 'pending',
    };
}
