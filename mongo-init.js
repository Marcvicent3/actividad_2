db.createUser(
    {
        user: "admin",
        pwd: "admin",
        roles: [
            {
                role: "readWrite",
                db: "urlShortener"
            }
        ]
    }
);

db.createCollection('urls', { capped: false });