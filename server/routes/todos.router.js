

const todosRouter = require("express").Router();
const pool = require("../modules/pool");

todosRouter.get("/", (req, res) => {
    console.log("GET route working");

    let queryText = `
    SELECT * FROM "todos" ORDER BY "id";
    `;
    pool
        .query(queryText)
        .then((result) => {
            res.send(result.rows);
        })
        .catch((error) => {
            console.log("error getting todos", error);
            res.sendStatus(500);
        });
});

todosRouter.post("/", (req, res) => {
    // Todos Destructing 
    // let { text, isComplete } = req.body;

    const text = req.body.text
    const isComplete = req.body.isComplete

    const queryText = `
    INSERT INTO "todos" 
    ("text", "isComplete")
    VALUES ($1, $2)
    `;
    const queryParams = [text, isComplete];

    pool.query(queryText, queryParams)
        .then((result) => res.sendStatus(201))
        .catch((error) => {
            console.log("error getting todos", error);
            res.sendStatus(500);
        });
});

todosRouter.delete("/:id", (req, res) => {
    const id = req.params.id;

    const queryText = `
    DELETE FROM "todos" WHERE id = ${id}
        `;
    pool
        .query(queryText)
        .then((result) =>
            res.sendStatus(202)
        )
        .catch((error) => {
            console.log("error getting todos", error);
            res.sendStatus(500);
        });
});


todosRouter.put('/:id', (req, res) => {
    const id = req.params.id;
    let { isComplete } = req.body;

    let updateQuery = `
    UPDATE "todos"
    SET "isComplete" = $1
    WHERE id = $2
    `

    const queryParams = [isComplete, id];

    pool
        .query(updateQuery, queryParams)
        .then((result) =>
            res.sendStatus(200)
        )
        .catch((error) => {
            console.log("error getting todos", error);
            res.sendStatus(500);
        });
})


module.exports = todosRouter;
