const mongoose=require("mongoose")

//create author schema
const authorDataSchema=new mongoose.Schema({
    nameOfAuthor:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    profileImageUrl:{
        type:String
    }
},{"strict":"throw"})

//create user coment schema
const userCommentSchema=new mongoose.Schema({
    nameOfUser:{
        type:String,
        required:true
    },
    comment:{
        type:String,
        required:true
    }
},{"strict":"throw"})

const articleSchema=new mongoose.Schema({
    authorData:authorDataSchema,
   articleId:{
    type:String,
    required:true
   },
  title:{
    type:String,
    required:true
  },
  category: {  
    type: String,
    required: false // Set to true if it's required
},
  content:{
    type:String,
    required:true
  },
  dateOfCreation:{
    type:String,
    required:true
  },
  dateOfModification:{
    type:String,
    required:true
  },
  comments:[userCommentSchema],

  isArticleActive:{
    type:Boolean,
    required:true
  }
},{"strict":"throw"})

//create model for article
const Article=mongoose.model('article',articleSchema)

//export
module.exports=Article