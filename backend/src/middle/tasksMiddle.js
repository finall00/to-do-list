const validateTitle = (request, response, next) => {
  const { body } = request;

  if (body.title == undefined || body.title == '' || body.title == ' ') {
    return response.status(400).json({message: 'O campo "titulo" não pode ser vazio'});
 
}
 
  next();
};

const validateStatus = (request, response, next) => {
  const { body } = request;

  if (body.status == undefined || body.status == '' || body.status == ' ') {
    return response.status(400).json({message: 'O campo "status" não pode ser vazio'});
 
}
 
  next();
};



module.exports = {
  validateTitle,
  validateStatus,
};
