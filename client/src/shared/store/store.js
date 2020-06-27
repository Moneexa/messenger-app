import {StoreProvider, createStore, action, thunk } from 'easy-peasy';
import axios from 'axios';
import config from '../config.json';



// const localStorageData = JSON.parse(localStorage.getItem('userInfo') || "{}");
// default user info
let currencyInfo = {
    id: "",
    date: "",
    from: "",
    to: "",
    inputAmount: "",
    output: ""

};
export const store = createStore({
    currencyInfo: {
        list: [],
        obj: {
            id: currencyInfo.id,
            date: currencyInfo.date,
            from: currencyInfo.from,
            to: currencyInfo.to,
            inputAmount: currencyInfo.inputAmount,
            output: currencyInfo.output,

        },
      
        updateCurrencyInfoList: action((state, payload) => {
            state.list = payload;
        }),

        updateCurrencyInfo: action((state, payload) => {
            console.log(JSON.stringify(state.obj))
            console.log(payload)

            state.obj.id = payload._id || state.obj.id;
            state.obj.date = payload.date || state.obj.date;
            state.obj.from = payload.from || state.obj.from;
            state.obj.to = payload.to || state.obj.to;
            state.obj.inputAmount = payload.inputAmount || state.obj.inputAmount;
            state.obj.output = payload.output || state.obj.output;
            console.log(JSON.stringify(state.obj.output))

        }),
        listCurrencyInfo: thunk(async (actions, payload) => {
            const res = await axios.get(`${config.apiUrl}/currency-conv/`);
            console.log(res.data)
            actions.updateCurrencyInfoList(res.data);
        }),

        post: thunk(async (actions, payload) => {

            const from = payload.from;
            const input = payload.inputAmount;
            var output_ = "";
            const to = payload.to;
            const eur_usd = 1.12, eur_chf = 1.06, chf_usd = 1.05;
            if (from === "EUR" && to === "USD") {
                output_ = input * eur_usd;
            }
            else if (from === "USD" && to === "EUR") {
                output_ = input / eur_usd;
            }
            else if (from === "EUR" && to === "CHF") {
                output_ = input * eur_chf;
            }
            else if (from === "CHF" && to === "EUR") {
                output_ = input / eur_chf;
            }
            else if (from === "CHF" && to === "USD") {
                output_ = input * chf_usd;
            }
            else if (from === "USD" && to === "CHF") {
                output_ = input / chf_usd;
            }
            else {
                output_ = ""
            }

            const _obj = {
                date: payload.date,
                from: payload.from,
                to: payload.to,
                inputAmount: payload.inputAmount,
                output: output_


            }
            try {
                const res = await axios.post(`${config.apiUrl}/currency-conv/`, _obj)

                actions.updateCurrencyInfo(res.data);



            } catch (error) {

                console.log(error)


            }
        }),


    },        //notifications: thunk(notificationsReducer())
});
