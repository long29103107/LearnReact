const { createStore } = window.Redux;

/*
- Init state
- Reducer
- Store

*/
const initState = JSON.parse(localStorage.getItem('hobbyList')) || [];

const hobbyReducer = (state = initState, action) => {
    //Check type action
    switch (action.type) {
        case 'ADD_HOBBY':
            const newList = [...state];
            newList.push(action.payload);

            return newList;
        default:
            return state;
    }
};

const store = createStore(hobbyReducer);

//--------------------------------------------------------------

//Render redux hobby list
const renderHobbyList = (list) => {
    if (!Array.isArray(list) || list.length === 0) return;

    const ulElement = document.querySelector('#hobby-list');
    // console.log(ulElemeknt);
    if (!ulElement) return;

    //Reset previous conent of ul
    ulElement.innerHTML = '';

    for (const hobby of list) {
        const liElement = document.createElement('li');
        liElement.textContent = hobby;
        ulElement.appendChild(liElement);
    }
};

//Render initial hobby list
const initialHobbyList = store.getState();
renderHobbyList(initialHobbyList);

const hobbyFormElement = document.querySelector('#hobby-form');
if (hobbyFormElement) {
    const handleFormSubmit = (e) => {
        e.preventDefault();
        const hobbyTextElement = hobbyFormElement.querySelector('#hobby-text');
        if (!hobbyTextElement) return;

        //Create action dispatch to reducer
        const action = {
            type: 'ADD_HOBBY',
            payload: hobbyTextElement.value
        }
        store.dispatch(action);
        hobbyFormElement.reset();
    };
    hobbyFormElement.addEventListener('submit', handleFormSubmit);
}

store.subscribe(() => {
    console.log('state update', store.getState());
    const newHobbyList = store.getState();

    localStorage.setItem('hobbyList', JSON.stringify(newHobbyList));
    renderHobbyList(newHobbyList);
})