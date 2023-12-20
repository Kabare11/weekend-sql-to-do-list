const router = require('express').Router();
const pool = require('../modules/pool');


//! DB CONNECTION

//* POOL is the phone (911) between Database and the Server
const pool = require('../modules/pool')


//! GET REQUEST END POINT (waiting for Client.js request)

koalaRouter.get('/', (req, res) => { //* the endpoint for our GET request, and since this is a router, we don't the /koalas
    console.log('GET route working')
    //! When connecting with DataBase we need to have queryText Select
    // * SELECT is for #SPECIFICALLY with GET Requests 
    let queryText = `
    SELECT * FROM "koalas" ORDER BY "id";
    `
    pool.query(queryText) //! the query function takes our queryText and uses it with the database.sending back RESULT
        .then((result) => {
            res.send(result.rows) //* we have to send a result, and here we are sending back the array of koalas
        })
        .catch((error) => {
            console.log("error getting koalas", error);
            res.sendStatus(500) //! sending back INTERNAL SERVER ERROR if it throws an error

        })
})

// POST
koalaRouter.post('/', (req, res) => { //* our POST endpoint
    console.log("POST route working")

    // ! this section deals with SQL injection by establishinng queryParams instead of pure SQL being sent to the database
    let koala = req.body // * req.body is the new koala object that we sent here
    console.log('this is koala', koala);
    let queryText = `
INSERT INTO "koalas"
	("name", "gender", "age", "ready_to_transfer", "comments")
	VALUES ($1, $2, $3, $4, $5);
    `
    const queryParams = [koala.name, koala.gender, koala.age, koala.ready_to_transfer, koala.comments]
    pool.query(queryText, queryParams).then((result) => { //! the second argument, the params, is an array that trades out with the $1, $2, etc, in the queryText
        res.sendStatus(201)
    })
        .catch((error) => {
            console.log('oops we hit an error in the POST query', error)
            res.sendStatus(404)
        })
    // * end of POST Request for the koalaRouter

    // ! this section is to test that the post route can update the database with predetermined data
    //* let queryText = `INSERT INTO "koalas"
    //* ("name", "gender", "age", "ready_to_transfer", "comments")
    //* VALUES
    //* ('Stevi', 'M', 46, true, 'old and grumpy');
    //*     `
    //* pool.query(queryText).then((result) => {
    //*    res.sendStatus(201)
    //* end of section inserting predetermined data into the database
})

// PUT REQUEST

// ! This is a section that Im pretty sure we need(so im gonna make it ), but Gavin
// ! said we could get it done without it 
// koalaRouter.get('/byid/:id', (req,res) => {
// const idToGet = req.params.id 
// const queryText = `
//     SELECT * FROM "koalas"
//     WHERE "id" = $1;
//     `
// const queryParams = [idToGet]
// console.log('req.params', req.params);

// pool.query(queryText, queryParams).then((result) => {
//     res.sendStatus(200)
//     console.log("/koalas/byid/id result:", result.rows)
// })
// .catch((error) => {
//     console.log('some error in the byid get route', queryText);
//     res.sendStatus(error)
// })
// })
// end of byid GET router

//todo PUT IS REQUEST on Router is Update On DataBase

koalaRouter.put('/:id', (req, res) => {
    console.log("PUT route working")

    // ! this section is able to update data on the database with a predetermined value and id
    // queryText = `
    // UPDATE "koalas"
    // SET "ready_to_transfer" = TRUE
    // WHERE "id" = 3;
    // `
    // pool.query(queryText).then((result) => {
    //     res.send(result);
    // })
    //end of section that can update database with a predetermined value and id

    // ! this section is to target by id the koalas to switch ready for transfer to true
    let id = req.params.id //Todo req.params.id is the number that we sent over from the client, so the route is /koalas/4, for example


    queryText = `
UPDATE "koalas"
SET "ready_to_transfer" = TRUE
WHERE "id" = $1;
`
    let queryParams = [id]
    pool.query(queryText, queryParams).then((result) => {
        console.log('targetting by id successful')
        res.sendStatus(200);
    })

        //todo this is the end of the section to target by id the koalas to switch ready to transfer to true
        .catch((error) => {
            console.log('you did something wrong dingus', error);
            res.sendStatus(500)
        })
})

// DELETE

module.exports = koalaRouter;







































































module.exports = router;
