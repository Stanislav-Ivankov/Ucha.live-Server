const modelName = 'Groups';

const categoriesController = (repository) => {
  const addCategory = async (req, res) => {
    const categoryData = req.body;
    return repository.create({ modelName, newObject: categoryData })
      .then((response) => {
        if (response.ok !== 0) {
          res.status(200).send(response._doc);
        } else {
          res.status(400).send(
            {
              error: response
            }
          );
        }
      })
      .catch(error => console.log(error));
  };

  const editCategory = async (req, res) => {
    const categoryData = req.body;
    console.log('categoryData: ', categoryData)
    return repository.update({ modelName, updatedRecord: categoryData })
      .then((response) => {
        console.log('response: ', response)
        if (response.ok !== 0) {
          res.status(200).send(response._doc);
        } else {
          res.status(400).send(
            {
              error: response
            }
          );
        }
      })
      .catch(error => console.log(error));
  };

  const removeCategory = async (req, res) => {
    const categoryData = req.body;
    return repository.remove({ modelName, record: {
      _id: req.params.id 
    }})
      .then((response) => {
        if (response.ok !== 0) {
          res.status(200).send(response._doc);
        } else {
          res.status(400).send(
            {
              error: response
            }
          );
        }
      }).catch(error => console.log(error));
  };

  const getGroups = async (req, res) => {
    return repository.find({ modelName })
      .then((response) => {
        if (response.ok !== 0) {
          res.status(200).send(response);
        } else {
          res.status(400).send(
            {
              error: response
            }
          );
        }
      })
      .catch(error => console.log(error));
  };

  const getGroupById = async (req, res) => {

    return repository.findOne({ modelName, options: { _id: req.params.id }})
      .then((response) => {
        if (response) {

          res.status(200).send(response);
        } else {
          res.status(400).send(
            {
              error: response
            }
          );
        }
      })
      .catch(error => console.log(error));
  };

  return {
    addCategory,
    editCategory,
    removeCategory,
    getGroupById,
    getGroups
  };
};

module.exports = categoriesController;