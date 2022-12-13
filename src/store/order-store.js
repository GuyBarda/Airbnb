// import { orderService } from '../services/order-service-local.js';
import { orderService } from "../services/order-service.js";

export const orderStore = {
    state: {
        orders: [],
    },
    getters: {
        orders({ orders }) {
            return orders;
        },
    },
    mutations: {
        setOrders(state, { orders }) {
            state.orders = orders;
        },
        addOrder(state, { order }) {
            state.orders.unshift(order);
        },
        removeOrder(state, { orderId }) {
            state.orders = state.orders.filter(
                (order) => order._id !== orderId
            );
        },
    },
    actions: {
        async addOrder({ commit }, { order }) {
            try {
                const savedOrder = await orderService.save(order);
                return savedOrder;
            } catch (err) {
                console.log("orderStore: Error in addOrder", err);
                throw err;
            }
        },
        async loadOrders({ commit }) {
            try {
                const orders = await orderService.query();
                commit({ type: "setOrders", orders });
            } catch (err) {
                console.log("orderStore: Error in loadOrders", err);
                throw err;
            }
        },
        async removeOrder({ commit }, { orderId }) {
            try {
                await orderService.remove(orderId);
                commit({ type: "removeOrder", orderId });
            } catch (err) {
                console.log("orderStore: Error in removeOrder", err);
                throw err;
            }
        },
    },
};
