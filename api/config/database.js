module.exports = { 
  database: `mongodb+srv://${process.env.ATLAS_USER}:${process.env.ATLAS_PWD}@cluster0.wrjz5.mongodb.net/eventBookdb?retryWrites=true&w=majority`,
};