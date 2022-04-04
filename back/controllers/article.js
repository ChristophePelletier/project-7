//https://sequelize.org/v4/manual/tutorial/querying.html

const db = require('/models')
const Article = db.articles
const Op = db.Sequelize.Op
// Create and Save a new Article
exports.create = (req, res) => {}
// Retrieve all Articles from the database.
exports.findAll = (req, res) => {}
// Find a single Article with an id
exports.findOne = (req, res) => {}
// Update an Article by the id in the request
exports.update = (req, res) => {}
// Delete an Article with the specified id in the request
exports.delete = (req, res) => {}
// Delete all Articles from the database.
exports.deleteAll = (req, res) => {}
// Find all published Articles
exports.findAllPublished = (req, res) => {}
