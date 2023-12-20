console.log('JS is sourced!');
function handleAddTask() {
    console.log('INSIDE ADD TASK BTN');
}



// our render function // *This function will do our rendering after our post request returns Response
function getKoalas() {
    console.log('in getKoalas');

    // ! Comment back in once the servers are up
    axios({ // ! this sends the GET request to /koalas route
        method: 'GET',
        url: '/koalas'
    }).then((response) => {
        let koalas = response.data // ! once the router has gotten the request, it sends back an array with all the koalas, as the response.data
        //* console.log('response data:', response.data);
        // * this variable gets the container to put the table rows with the koalas' info
        const tbody = document.getElementById('viewKoalas')
        // ! this clears the innerHTML of the container, so that when we concatenate in the loop, it doesn't just add, otherwise we'd get duplicates
        tbody.innerHTML = ''

        //* this loops through the array of koala objects
        for (let koala of koalas) {
            console.log(koala);
            //* this variable is the HTML that will I will add to the innerHTML of the tbody, the container
            //* the variable includes a ternary operator so that it displays either yes or no instead of true and false
            let newInnerHTML = `
        <tr>
          <td>${koala.name}</td>
          <td>${koala.age}</td>
          <td>${koala.gender}</td>
          <td>${koala.comments}</td>
          <td>${koala.ready_to_transfer ? 'Yes' : 'No'}</td>
        `
            if (koala.ready_to_transfer === false) { //* the conditional to see if ready_to_transfer is true or not
                newInnerHTML += `
              <td>
                <button onclick="markReadyToTransfer(${koala.id})">Mark as Ready</button>
              </td></tr>
              `
            } else {

                newInnerHTML += `
            </tr>
          `
            }
            //console.log(newInnerHTML);
            tbody.innerHTML += newInnerHTML //* this is what actually changes the innerHTML of container
        }
    }) // end of .then
        .catch((error) => { // catching the error
            console.log(error);
        })

} //! end getKoalas

// * the function for when the button to add a koala is clicked
function saveKoala() {
    console.log('in saveKoala');
    // *axios call to server to get koalas
    // ! Getting the values of the inputs from the DOM and storing as variables to use in the data we send to the server
    let nameInput = document.getElementById('nameIn').value
    let ageInput = document.getElementById('ageIn').value
    let genderInput = document.getElementById('genderIn').value
    let commentsInput = document.getElementById('notesIn').value
    let ready_to_transfer_Input = document.getElementById('addButton').value

    axios({ //* Save  Koala Function Makes Post Request to the server (using axios request for POST)
        method: "POST",
        url: "/koalas",
        data: { //! inserting the inputs into the object that we'll send over to server to add to the database
            name: nameInput,
            age: ageInput,
            gender: genderInput,
            ready_to_transfer: Boolean(ready_to_transfer_Input), // this Boolean() thing is giving us problems
            comments: commentsInput
        }
    }).then((response) => {
        console.log('successfully posted to the server');
        getKoalas() //! we have to render again to update with the new koala we just added
    }).catch((error) => {
        console.log(error);
    })

}

// ! a function run when Mark as Ready button is clicked on client side/DOM
function markReadyToTransfer(id) {
    axios({
        method: "PUT",
        url: `/koalas/${id}` //* interpolated the id that we send to the router
    }).then((response) => {
        console.log('successfully PUT to server');
        getKoalas() //! we have to render again because we upated the data in the database, and we want that to show on the DOM
    }).catch((error) => {
        console.log(error);
    })
}

getKoalas()
// Amazing