const fs = require('fs');
const db = require("../../db/db.json");
const id = require("../../db/currentID.json");


function saveDBFile() {
    fs.writeFileSync("db/db.json", JSON.stringify(db));
}

function saveIDFile() {
    fs.writeFileSync("db/currentID.json", JSON.stringify(id));
}

module.exports = (app) => {
    app.get("/api/notes", (req, res) => {
        res.json(db);
    });

    app.post("/api/notes", (req, res) => {
        const newReq = req.body;
        id.currentID += 1;
        newReq.id = id.currentID;
        db.push(newReq);
        res.json(newReq);

        saveDBFile();
        saveIDFile();

        console.log(newReq);
        console.log(id);
    });

    app.delete("/api/notes/:id", (req, res) => {
        let foundMatch = false;
        db.forEach((element, index) => {
            if(element.id == req.params.id) {
                foundMatch = true;
                db.splice(index,1);
                saveDBFile();
            }
        });
        
        if(!foundMatch) {
            res.json({ ok: false });
        }
        else {
            res.json({ ok: true });
        }
        
    });
};