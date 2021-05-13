import axios from 'axios';
import { letterArticles, parishActivityArticles } from '../../database/drafts-content';
import * as actionType from '../actionType';

//Auth dispatch
export const authenticate = (dispatch, credentials) => axios.post('https://hvmatl-backend.herokuapp.com/authentication', credentials)
    .then(res => dispatch({ type: actionType.AUTH, token: res.data.token }));

export const restoreToken = (dispatch, token) => dispatch({ type: actionType.AUTH, token: token })
//Get WeeklyNews
export const getWeeklyNews = (dispatch, from, to, token) => axios.get('https://hvmatl-backend.herokuapp.com/weeklyNews', {
    headers: {
        'Authorization': `Bearer ${token}`
    },
    params: {
        from: from,
        to: to
    }
}).then(res => dispatch({ type: actionType.GET_WEEKLY_NEWS, data: res.data }));

//Get Carousel Slides
export const getSlides = (dispatch, date, token) => axios.get('https://hvmatl-backend.herokuapp.com/carousel', {
    headers: {
        'Authorization': `Bearer ${token}`
    },
    params: {
        date: date
    }
}).then(res => dispatch({ type: actionType.GET_SLIDES, data: res.data }));

export const submitForm = (dispatch, formType, formData, token, callback) => axios.post('http://hvmatl-backend.herokuapp.com/allSoulsFeast', formData, {
    headers: {
        'Authorization': `Bearer ${token}`
    }
}).then(res => {
    updateForm(dispatch, formType, {
        memberId: "",
        requestor: "",
        email: "",
        soulName: ""
    });
    callback({
        header: "Success",
        message: "Form submitted!!"
    })
}).catch(res => {
    updateForm(dispatch, formType, {
        memberId: "",
        requestor: "",
        email: "",
        soulName: ""
    });
    callback({
        header: "Failed",
        message: "Failed to submit!!"
    })
});

export const updateForm = (dispatch, formType, updateData) => dispatch({ type: actionType.UPDATE_FORM_DATA, formType: formType, updateData: updateData });

export const createNewArticle = () => {
    axios.post("http://localhost:5000/new-draft", {}, {
        headers: {
            'Content-Type': 'application/json',
            'Accepts': 'application/json'
        },
    })
}

export const getDraftList = (dispatch, cateId) => dispatch({ type: actionType.GET_DRAFTS_LIST, payload: cateId === 'parish-activities' ? parishActivityArticles : letterArticles })

