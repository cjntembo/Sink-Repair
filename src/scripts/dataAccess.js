const applicationState = {
    requests: {}
}

const API = "http://localhost:8088"

export const fetchRequests = () => {
    return fetch(`${API}/requests`)
        .then(response => response.json())
        .then(
            (serviceRequests) => {
                // Store the external state in application state
                applicationState.requests = serviceRequests
            }
        )
}


export const getRequests = () => {
    return applicationState.requests.map(request => ({...request}))
}


// The POST method on any HTTP request means "Hey API!! I want you to create something new!"
export const sendRequest = (userServiceRequest) => {
    const fetchOptions = {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(userServiceRequest)
    }


    const mainContainer = document.querySelector("#container")
    // Update your sendRequest() function's fetch call to dispatch the custom event after the POST operation has been completed.
    return fetch(`${API}/requests`, fetchOptions)
        .then(response => response.json())
        .then(() => {
            // Now your main module has to listen for the custom event and invoke the render() function to build all the HTML again
            mainContainer.dispatchEvent(new CustomEvent("stateChanged"))
        })
}

// ❗Here are the four main methods used on HTTP requests.

// Method	Description
// GET	Please give me this resource.
// POST	Please create something new.
// PUT	Please modify an existing resource.
// DELETE	Please delete an existing.



// ❗When you use the DELETE method on an HTTP request, you must identify a single resource.

// ❗
// You can't delete an entire collection with a single HTTP request. Else the Universe will implode on you!!
export const deleteRequest = (id) => {
    
    const mainContainer = document.querySelector("#container")
    return fetch(`${API}/requests/${id}`, { method: "DELETE" })
        .then(
            () => {
                mainContainer.dispatchEvent(new CustomEvent("stateChanged"))
            }
        )
}
