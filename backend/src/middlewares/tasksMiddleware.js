//middleware como o nome sugere eles ficam no meio da requisição são usados para fazer verificações para 
//garantir que esta tudo certo para passar para a proxima parte do codigo



//essa função valida o titulo. se ele esta vazio 
const validateFieldTitle = (request, response, next) => {
  const { body } = request;

  if (body.title === undefined) {
    return response.status(400).json({ message: 'The field "title" is required' });
  }

  if (body.title === '') {
    return response.status(400).json({ message: 'title cannot be empty' });
  }

  next();
};


//essa função valida o status. se  esta vazio
const validateFieldStatus = (request, response, next) => {
  const { body } = request;

  if (body.status === undefined) {
    return response.status(400).json({ message: 'The field "status" is required' });
  }

  if (body.status === '') {
    return response.status(400).json({ message: 'status cannot be empty' });
  }

  next();
};


//exporta as funções
module.exports = {
  validateFieldStatus,
  validateFieldTitle,
};
