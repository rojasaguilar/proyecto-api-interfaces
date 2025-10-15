import zterrorlogService from "./zterrorlog-service.js";

let queryType;
let id;

export const crudErrores = async (params) => {
  if (params) {
    queryType = params.queryType;
    console.log(queryType)
    id = params.id;
    return await dicFun[queryType];
  }
};

const dicFun = {
  "getAll": zterrorlogService.GetAllErrors(),
  "getOne": zterrorlogService.GetOneError(id),
  "deleteOne": zterrorlogService.DeleteOneError(id)
//   "getOne": zterrorlogService.GetOneError(id),
};
