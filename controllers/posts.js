
const PostCardSchema = require('../models/postCard');


const getPostCard = async (req, res) =>{
    const postCards = await PostCardSchema.find();
    res.json(postCards);
}

module.exports = getPostCard;