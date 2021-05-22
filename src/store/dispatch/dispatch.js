import axios from 'axios';
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

export const createNewArticle = async (dispatch, isLetters) => {
    dispatch({ type: actionType.CREATE_DRAFT_REQUEST })
    try {
        const { data } = await axios.post("http://localhost:5000/api/drafts/new-draft", { isLetters }, {
            headers: {
                'Content-Type': 'application/json',
                'Accepts': 'application/json'
            },
        })
        dispatch({ type: actionType.CREATE_DRAFT_SUCCESS, payload: data })

    } catch (error) {
        const message = error.response && error.response.data.message
            ? error.response.data.message
            : error.message
        dispatch({ type: actionType.CREATE_DRAFT_FAIL, payload: message })
    }
}


export const getDraftList = async (dispatch, cateId) => {
    dispatch({ type: actionType.DRAFTS_LIST_REQUEST })
    try {
        const { data } = await axios.get(`http://localhost:5000/api/drafts?isLetters=${cateId === 'letters' ? true : false}`)
        dispatch({ type: actionType.DRAFTS_LIST_SUCCESS, payload: data })
    } catch (error) {
        const message = error.response && error.response.data.message
            ? error.response.data.message
            : error.message
        dispatch({ type: actionType.DRAFTS_LIST_ERROR, payload: message })
    }
}

export const deleteDraft = async (dispatch, draftId) => {
    dispatch({ type: actionType.DELETE_DRAFT_REQUEST })
    try {
        const { data } = await axios.delete(`http://localhost:5000/api/drafts/${draftId}`)
        dispatch({ type: actionType.DELETE_DRAFT_SUCCESS, payload: data })
    } catch (error) {
        const message = error.response && error.response.data.message
            ? error.response.data.message
            : error.message
        dispatch({ type: actionType.DELETE_DRAFT_FAIL, payload: message })
    }
}

export const getDraftContent = async (dispatch, draftId) => {
    dispatch({ type: actionType.DRAFT_CONTENT_REQUEST })
    try {
        const { data } = await axios.get(`http://localhost:5000/api/drafts/${draftId}`)
        dispatch({ type: actionType.DRAFT_CONTENT_SUCCESS, payload: data })
    } catch (error) {
        const message = error.response && error.response.data.message
            ? error.response.data.message
            : error.message
        dispatch({ type: actionType.DRAFT_CONTENT_FAIL, payload: message })
    }
}

export const saveUpdateDraft = async (dispatch, article) => {
    dispatch({ type: actionType.SAVE_DRAFT_REQUEST })
    try {
        const { data } = await axios.put(`http://localhost:5000/api/drafts/update-draft/${article._id}`, article, {
            headers: {
                'Content-Type': 'application/json',
                'Accepts': 'application/json'
            },
        })
        dispatch({ type: actionType.SAVE_DRAFT_SUCCESS, payload: data })
    } catch (error) {
        const message = error.response && error.response.data.message
            ? error.response.data.message
            : error.message
        dispatch({ type: actionType.SAVE_DRAFT_FAIL, payload: message })
    }
}

export const getImageUrl = async (dispatch, imageReader) => {
    dispatch({ type: actionType.IMAGE_UPLOAD_REQUEST })
    try {
        const { data } = await axios.post('http://localhost:5000/api/cloudinary/upload-image', JSON.stringify({ data: imageReader }), {
            headers: {
                'Content-Type': 'application/json',
                'Accepts': 'application/json'
            }
        })
        dispatch({ type: actionType.IMAGE_UPLOAD_SUCCESS, payload: data })
    } catch (error) {
        const message = error.response && error.response.data.message
            ? error.response.data.message
            : error.message
        dispatch({ type: actionType.IMAGE_UPLOAD_FAIL, payload: message })
    }
}

export const postArticle = async (dispatch, draft) => {
    dispatch({ type: actionType.POST_ARTICLE_REQUEST })
    try {
        const { data } = await axios.post('http://localhost:5000/api/articles/post-article', draft, {
            headers: {
                'Content-Type': 'application/json',
                'Accepts': 'application/json'
            }
        })
        dispatch({ type: actionType.POST_ARTICLE_SUCCESS, payload: data })
    } catch (error) {
        const message = error.response && error.response.data.message
            ? error.response.data.message
            : error.message
        dispatch({ type: actionType.POST_ARTICLE_FAIL, payload: message })
    }
}

export const getArticles = async (dispatch, isLetters = true) => {
    dispatch({ type: actionType.GET_ARTICLES_REQUEST })
    try {
        const { data } = await axios.get(`http://localhost:5000/api/articles/${isLetters}`)
        dispatch({ type: actionType.GET_ARTICLES_SUCCESS, payload: data })
    } catch (error) {
        const message = error.response && error.response.data.message
            ? error.response.data.message
            : error.message
        dispatch({ type: actionType.GET_ARTICLES_FAIL, payload: message })
    }
}

export const getArticleContent = async (dispatch, id) => {
    dispatch({ type: actionType.ARTICLE_CONTENT_REQUEST })
    try {
        const { data } = await axios.get(`http://localhost:5000/api/articles/get-article/${id}`)
        dispatch({ type: actionType.ARTICLE_CONTENT_SUCCESS, payload: data })
    } catch (error) {
        const message = error.response && error.response.data.message
            ? error.response.data.message
            : error.message
        dispatch({ type: actionType.ARTICLE_CONTENT_FAIL, payload: message })
    }
}