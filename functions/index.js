const {onRequest} = require("firebase-functions/v2/https");
const admin = require("firebase-admin");
const cors = require("cors")({origin: true});

admin.initializeApp();

exports.countBooks = onRequest((req, res) => {
  cors(req, res, async () => {
    try {
      const booksCollection = admin.firestore().collection("books");
      const snapshot = await booksCollection.get();
      const count = snapshot.size;
      res.status(200).send({count});
    } catch (error) {
      console.error("Error counting books:", error.message);
      res.status(500).send("Error counting books");
    }
  });
});

exports.addBook = onRequest((req, res) => {
  cors(req, res, async () => {
    if (req.method !== "POST") {
      return res.status(405).send({error: "Method not allowed"});
    }

    try {
      const {title, author} = req.body;
      if (!title || !author) {
        return res.status(400).send({error: "Title and author required"});
      }

      // Capitalize book title and author
      const capitalizedTitle = title.toUpperCase();
      const capitalizedAuthor = author.toUpperCase();

      // Add the new book to the Firestore
      const bookRef = admin.firestore().collection("books").doc();
      await bookRef.set({
        title: capitalizedTitle,
        author: capitalizedAuthor,
      });

      res.status(201).send({
        message: "Book added successfully",
        bookId: bookRef.id,
      });
    } catch (error) {
      console.error("Error adding book:", error.message);
      res.status(500).send({error: "Error adding book"});
    }
  });
});

exports.getAllBooks = onRequest((req, res) => {
  cors(req, res, async () => {
    try {
      const booksCollection = admin.firestore().collection("books");
      const snapshot = await booksCollection.get();

      const books = [];
      snapshot.forEach((doc) => {
        books.push({
          id: doc.id,
          ...doc.data(),
        });
      });

      res.status(200).send({books});
    } catch (error) {
      console.error("Error getting books:", error);
      res.status(500).send({error: "Error retrieving books"});
    }
  });
});
