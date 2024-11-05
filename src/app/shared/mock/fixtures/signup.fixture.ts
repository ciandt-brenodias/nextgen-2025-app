// import {
//   ResponseOptions,
//   RequestInfo,
//   STATUS,
// } from 'angular-in-memory-web-api';

// export function signUp(reqInfo: RequestInfo): ResponseOptions | undefined {
//   const reqBody = reqInfo.utils.getJsonBody(reqInfo.req);
//   const role_name = getUserRoleById(reqBody.security_profile_id);
//   reqBody.security_profile_name = role_name[0].name;
//   reqBody.entity_id = faker.random.number({ min: 4, max: 99 });
//   users.push(reqBody);
//   const response = { total_items: users.length, data: users };
//   const options: ResponseOptions = {
//     status: STATUS.OK,
//     body: ApiResponseFactory.getUserResponseWithBody(response),
//   };

//   return options;
// }
