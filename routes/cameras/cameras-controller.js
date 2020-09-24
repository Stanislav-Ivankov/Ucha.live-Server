const modelName = 'Cameras';

const camerasController = repository => {

  const getCameras = async (req, res) => {
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

  const getCameraById = async (req, res) => {
    return repository.findOne({ modelName, options: {
      _id: req.params.id 
    } })
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
  
	return {
    getCameras,
    getCameraById
  };
};

module.exports = camerasController;