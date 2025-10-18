import zterrorlogService from '../api/services/zterrorlog-service';

const getAllFunction = async (params, bitacora) => {
  const { LoggedUser, dbServer } = params;
  result = await zterrorlogService.GetAllErrors();
  result = JSON.parse(result); //PARSEAR RESULTADO A JSON

  //ASIGNAR LOS CAMPOS Y VALORES A BITACORA
  bitacora.data.push(result.data);
  bitacora.countData = result.results;
  bitacora.success = true;
  bitacora.status = 200;
  bitacora.loggedUser = LoggedUser;
  bitacora.finalRes = true;
  bitacora.dbServer = dbServer;
};

export const functionsDic = {
  getAll: (params, bitacora) => getAllFunction(params, bitacora),
};


