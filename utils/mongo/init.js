db.createUser(
    {
        user: "root",
        pwd: "root123",
        roles: [
            {
                role: "readWrite",
                db: "yaxt"
            }
        ]
    }
);
db.createCollection("tests");
db.createCollection("questions");
db.createCollection("answers");