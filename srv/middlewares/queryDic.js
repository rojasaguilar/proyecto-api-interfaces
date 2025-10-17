import zterrorlogService from '../api/services/zterrorlog-service.js';

const getAllFunction = async (params, bitacora) => {
  const { LoggedUser, dbServer } = params;

  try {
    let result = await zterrorlogService.GetAllErrors();
    // result = JSON.parse(result); //PARSEAR RESULTADO A JSON

    //ASIGNAR LOS CAMPOS Y VALORES A BITACORA
    bitacora.data.push(result.data);
    bitacora.countData = result.results;
    bitacora.success = true;
    bitacora.status = 200;
    bitacora.loggedUser = LoggedUser;
    bitacora.finalRes = true;
    bitacora.dbServer = dbServer;

    return bitacora;
  } catch (errorBita) {
    bitacora.countData = 0;
    bitacora.success = false;
    bitacora.status = 525;
    bitacora.loggedUser = LoggedUser;
    bitacora.finalRes = true;
    bitacora.dbServer = dbServer;
    bitacora.messageDEV = errorBita.message;
    bitacora.messageUSR = 'Error al extraer los usuarios';
    return bitacora;
  }
};

const getOneFunction = async (params, bitacora) => {
  const { LoggedUser, dbServer, id } = params;

  try {
    if (!id) {
      throw new Error('Missing ID parameter');
    }

    let result = await zterrorlogService.GetOneError(id);
    result = JSON.parse(result); //PARSEAR RESULTADO A JSON

    //ASIGNAR LOS CAMPOS Y VALORES A BITACORA
    bitacora.data.push(result.data);
    bitacora.countData = result.results;
    bitacora.success = true;
    bitacora.status = 200;
    bitacora.loggedUser = LoggedUser;
    bitacora.finalRes = true;
    bitacora.dbServer = dbServer;
    bitacora.messageUSR =
      'No se pudieron extraer los errores, intenta mas tarde';
    bitacora.messageDEV = 'Data succesfully recovered';
    return bitacora;
  } catch (errorBita) {
    //ASIGNAR LOS CAMPOS Y VALORES A BITACORA error
    bitacora.countData = 0;
    bitacora.success = false;
    bitacora.status = 525;
    bitacora.loggedUser = LoggedUser;
    bitacora.finalRes = true;
    bitacora.dbServer = dbServer;
    bitacora.messageDEV = errorBita.message;
    bitacora.messageUSR = 'Error al extraer el usuario';
    return bitacora;
  }
};
export const functionsDic = {
  getAll: (params, bitacora) => getAllFunction(params, bitacora),
  getOne: (params, bitacora) => getOneFunction(params, bitacora),
};
