const { nanoid } = require("nanoid");
const books = require('./books.js');

const handler = {
  addBook: (req, h) => {
    const { name, year, author, summary, publisher, pageCount, readPage, reading} = req.payload;

    const id = nanoid(16);
    const finished = pageCount === readPage ? true : false;
    const insertedAt = new Date().toISOString();
    const updatedAt = insertedAt;

    if(!name) {
      const response = h.response({
        status: "fail",
        message: "Gagal menambahkan buku. Mohon isi nama buku",
      });
      response.code(400);
      return response;
    }
    if(readPage > pageCount) {
      const response = h.response({
        status: "fail",
        message:
          "Gagal menambahkan buku. readPage tidak boleh lebih besar dari pageCount",
      });
      response.code(400);
      return response;
    }

    newBook = { id, name, year, author, summary, publisher, pageCount, readPage, finished, reading, insertedAt, updatedAt};
    books.push(newBook);

    const response = h.response({
      status: "success",
      message: "Buku berhasil ditambahkan",
      data: {
        bookId: id,
      },
    });
    response.code(201);
    return response;
  },




  getAllBook: (req, h) => {
    const { name, reading, finished } = req.query
    if(name) {
      let _books = books.filter((book) => book.name.toLowerCase().includes(name.toLowerCase()))
      _books = _books.map((book) => {
        return {
          id: book.id,
          name: book.name,
          publisher: book.publisher
        }
      })
      const response = h.response({
        status: "success",
        data: {
          books: _books
        }
      });
      response.code(200);
      return response;
    }

    if(reading) {
      let _books;
      if(reading === "1") _books = books.filter((book) => book.reading);
      if(reading === "0") _books = books.filter((book) => !book.reading);
      
      _books = _books.map((book) => {
        return {
          id: book.id,
          name: book.name,
          publisher: book.publisher
        }
      })

      const response = h.response({
        status: "success",
        data: {
          books: _books
        }
      });
      response.code(200);
      return response; 
    }

    if(finished) {
      let _books;
      if(finished === "1") _books = books.filter((book) => book.finished);
      if(finished === "0") _books = books.filter((book) => !book.finished);
      
      _books = _books.map((book) => {
        return {
          id: book.id,
          name: book.name,
          publisher: book.publisher
        }
      })

      const response = h.response({
        status: "success",
        data: {
          books: _books
        }
      });
      response.code(200);
      return response; 
    }

    if (books.length === 0) {
      const response = h.response({
        status: "success",
        data: [],
      });
      response.code(200);
      return response;
    }

    const response = h.response({
      status: "success",
      data: {
        books: books.map((book) => {
          return {
            id: book.id,
            name: book.name,
            publisher: book.publisher
          }
        })
      }
    });
    response.code(200);
    return response;
  },




  getBookById: (req, h) => {
    const book = books.filter(book => book.id == req.params.bookId);
    
    if (book.length == 0) {
      const response = h.response({
        status: "fail",
        message: "Buku tidak ditemukan",
      });
      response.code(404);
      return response;
    }
    
    const response = h.response({
      status: "success",
      data: {
        book: book[0]
      }
    });
    response.code(200);
    return response;
  },




  updateBook: (req, h) => {
    const { bookId } = req.params
    const { name, year, author, summary, publisher, pageCount, readPage, reading } = req.payload;

    const finished = pageCount === readPage ? true : false;
    const updatedAt = new Date().toISOString();

    const book = books.filter(book => book.id == bookId);
    const insertedAt = book[0];

    const index = books.findIndex((book) => book.id === bookId);
    updatedBook = { id: bookId, name, year, author, summary, publisher, pageCount, readPage, finished, reading, insertedAt, updatedAt};

    if (!book) {
      const response = h.response({
        status: "fail",
        message: "Buku tidak ditemukan",
      });
      response.code(404);
      return response;
    }
    if (!name) {
      const response = h.response({
        status: "fail",
        message: "Gagal memperbarui buku. Mohon isi nama buku",
      });
      response.code(400);
      return response;
    }
    if (readPage > pageCount) {
      const response = h.response({
        status: "fail",
        message:
          "Gagal memperbarui buku. readPage tidak boleh lebih besar dari pageCount",
      });
      response.code(400);
      return response;
    }
    if (index !== -1) {
      books[index] = updatedBook;
      const response = h.response({
        status: 'success',
        message: 'Buku berhasil diperbarui',
      });
      response.code(200);
      return response;
    }
    
    const response = h.response({
      status: 'fail',
      message: 'Gagal memperbarui buku. Id tidak ditemukan',
    });
    response.code(404);
    return response;
  },



  deleteBook: (req, h) => {
    const { bookId } = req.params;
    const index = books.findIndex((book) => book.id === bookId);
 
    if (index !== -1) {
      books.splice(index, 1);
      const response = h.response({
        status: 'success',
        message: 'Buku berhasil dihapus',
      });
      response.code(200);
      return response;
    }
    
    const response = h.response({
      status: 'fail',
      message: 'Buku gagal dihapus. Id tidak ditemukan',
    });
    response.code(404);
    return response;
  }
};

module.exports = handler;
