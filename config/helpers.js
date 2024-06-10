let MySqli = require('mysqli');

let conn = new MySqli({
    host: '160.119.253.205',
    post: '3306',
    user :'bhakiAPI',
    passwd:'*X8kl?_o2q2_;',
    db:'Dice'
});

let db = conn.emit(false,'');

module.exports = {
    database : db
}