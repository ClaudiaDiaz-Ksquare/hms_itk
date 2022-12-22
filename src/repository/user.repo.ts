// // THIS FILE IS ONLY FOR SEEING THE USERS ON POSTGRES, IT'S NOT NEEDED WITH FIREBASE
// // I JUST KEPT IT FOR FURTHER REFERENCE

// import { User, Role } from "../models/user.model";


// // LIST
// export const paginatedList = async(limit:number, offset:number) =>{
//     try {
//         const res = await User.findAll({
//             attributes: ['id', 'full_name', 'email'],
//             limit,
//             offset,
//             where: {
//                 is_active: true
//             }
//         })
//         return res
//     } catch (error) {
//         console.error(error)
//         return null
//     }
// }


// // CREATE - Create operation on Postgres
// export const createUserPsql = async (id:string, full_name:string, email: string, passwd: string, role : Role) => {
//     try {
//         const newUser = await User.create({
//             id,
//             full_name,
//             email,
//             passwd,
//             role,
//         })
        
//         return newUser.id;
//     } catch (error) {
//         console.error(error);
//         return null; // por si falla, que regrese algún id aunque sea
//     }
// }


// // READ Operation
// export const fetchUserById = async (id:string) => {
//     try {
//         const userFetched = await User.findByPk(id);

//         return userFetched;
//     } catch (error) {
//         console.error(error);
//         return null;
//     }
// }

// // UPDATE Operation
// // Infer attributes para no pasar cada cosa/atributo del modelo
// export const updateUserById = async (id:string, full_name: string) => {
//     try {
//         const updatedRows = await User.update({
//             full_name,
//         }, {
//             where:{
//                 id,
//             }
//         });
        
//         return updatedRows;
//     } catch (error) {
//         console.error(error);
//         return null;
//     }
// }

// // DELETE operation (SOFT)
// export const deleteUserById = async (id:string) => {
//     try {
//         const inactiveUser = await User.update({
//             is_active: false
//         }, {
//             where: {
//                 id: id
//             }
//         })
//         return inactiveUser;
//     } catch (error) {
//         console.error(error);
//         return null;
//     }
// }

// // UNDO DELETE operation (SOFT)
// export const undoDeleteUserById = async (id:string) => {
//     try {
//         const activeUser = await User.update({
//             is_active: true
//         }, {
//             where: {
//                 id: id
//             }
//         })
//         return activeUser;
//     } catch (error) {
//         console.error(error);
//         return null;
//     }
// }