let errorHandler =(err)=>{
    console.log(error);
    throw new Error("500 internal error :(")    
}

module.exports = errorHandler