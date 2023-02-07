// import { stayService } from '../services/stay-service-local.js'
import { stayService } from '../services/stay-service.js';

export function getActionRemoveStay(stayId) {
    return {
        type: 'removeStay',
        stayId,
    };
}
export function getActionAddStay(stay) {
    return {
        type: 'addStay',
        stay,
    };
}
export function getActionUpdateStay(stay) {
    return {
        type: 'updateStay',
        stay,
    };
}

export function getActionAddStayMsg(stayId) {
    return {
        type: 'addStayMsg',
        stayId,
        txt: 'Stam txt',
    };
}

export const stayStore = {
    state: {
        stays: [],
        actualStaysLength: 0,
        filterBy: {},
        amenities: [
            'Garden view',
            'Air conditioning',
            'Elevator',
            'Heating',
            'TV',
            'Kitchen',
            'Wifi',
            'Free parking on premises',
            'Cooking basics',
            'Dedicated workspace',
            'Washer',
            'Smoke detector',
            'Essentials',
            'Dryer',
            'Carbon monoxide detector',
            'Iron',
        ],
    },
    getters: {
        actualStaysLength({ actualStaysLength }) {
            return actualStaysLength;
        },
        stays({ stays }) {
            return Object.values(stays);
        },
        amenities({ amenities }) {
            return amenities;
        },
    },
    mutations: {
        setActualStaysLength(state, { length }) {
            state.actualStaysLength = length;
        },
        setStays(state, { stays }) {
            state.stays = stays;
        },
        pushStays(state, { stays }) {
            state.stays.push(...stays);
        },
        addStay(state, { stay }) {
            state.stays.push(stay);
        },
        setFilter(state, { filterBy }) {
            state.filterBy = {
                ...state.filterBy,
                ...JSON.parse(JSON.stringify(filterBy)),
            };
        },
        updateStay(state, { stay }) {
            const idx = state.stays.findIndex((c) => c.id === stay._id);
            state.stays.splice(idx, 1, stay);
        },
        removeStay(state, { stayId }) {
            state.stays = state.stays.filter((stay) => stay._id !== stayId);
        },
        addStayMsg(state, { stayId, msg }) {
            const stay = state.stays.find((stay) => stay._id === stayId);
            if (!stay.msgs) stay.msgs = [];
            stay.msgs.push(msg);
        },
    },
    actions: {
        setFilter({ commit, dispatch }, { filterBy, isPush }) {
            commit({ type: 'setFilter', filterBy });
            dispatch({ type: 'loadStays', isPush });
            // state.filterBy = {...filterBy,...state.filterBy}
        },
        async addStay(context, { stay }) {
            try {
                stay = await stayService.save(stay);
                context.commit(getActionAddStay(stay));
                return stay;
            } catch (err) {
                console.log('stayStore: Error in addStay', err);
                throw err;
            }
        },
        async updateStay(context, { stay }) {
            try {
                stay = await stayService.save(stay);
                context.commit(getActionUpdateStay(stay));
                return stay;
            } catch (err) {
                console.log('stayStore: Error in updateStay', err);
                throw err;
            }
        },
        async loadStays({ commit, state }, { isPush = false } = {}) {
            try {
                const { stays, length } = await stayService.query(
                    state.filterBy
                );
                commit({ type: 'setActualStaysLength', length });
                commit({ type: `${isPush ? 'pushStays' : 'setStays'}`, stays });
                return stays;
            } catch (err) {
                console.log('stayStore: Error in loadStays', err);
                throw err;
            }
        },
        async removeStay(context, { stayId }) {
            try {
                await stayService.remove(stayId);
                context.commit(getActionRemoveStay(stayId));
            } catch (err) {
                console.log('stayStore: Error in removeStay', err);
                throw err;
            }
        },
        async addStayMsg(context, { stayId, txt }) {
            try {
                const msg = await stayService.addStayMsg(stayId, txt);
                context.commit({ type: 'addStayMsg', stayId, msg });
            } catch (err) {
                console.log('stayStore: Error in addStayMsg', err);
                throw err;
            }
        },
    },
};
