import { httpService } from './http-service.js';

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
    return order._id
        ? await httpService.put(`order/${order._id}`, order)
        : await httpService.post('order/', order);
}

async function addOrderMsg(orderId, txt) {
    return await httpService.post(`order/${orderId}/msg`, { txt });
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
