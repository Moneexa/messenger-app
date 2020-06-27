import { createStore, action, thunk } from 'easy-peasy';
import axios from 'axios';



// const localStorageData = JSON.parse(localStorage.getItem('userInfo') || "{}");
// default user info
let currencyInfo = {
    id: "",
    date: "",
    from: "",
    to: "",
    
};

export const store = createStore({
    currencyInfo: {
        list: [],
        active: {
            id: currencyInfo.id,
            date: currencyInfo.date,
            from: currencyInfo.from,
            to: currencyInfo.to
        },
        
        updateCurrencyInfoList: action((state, payload) => {
            state.list = payload;
        }),

        updateCurrencyInfo: action((state, payload) => {
            state.active.id = payload._id || state.active.id;
            state.active.date = payload.date || state.active.date;
            state.active.from = payload.from || state.active.from;
            state.active.to = payload.to || state.active.to;

            
        }),

        
        listCurrencyInfo: thunk(async (actions, payload) => {

           
            const res = await axios.get(`${config.apiUrl}/brands/`);
            console.log(res.data)

            actions.updateBrandList(res.data);


        }),
        
        post: thunk(async (actions, payload) => {
            const obj = {
                date: payload.date,
                from: payload.from,
                to: payload.to,
                
            }
            try {
                const res = await axios.post(`${config.apiUrl}/brands/`, obj,

                )

                actions.updateCurrencyInfo(res.data);



            } catch (error) {

                console.log(error)


            }
        }),


    },        //notifications: thunk(notificationsReducer())
    });
