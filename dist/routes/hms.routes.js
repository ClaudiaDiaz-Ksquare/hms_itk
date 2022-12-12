"use strict";
// Importar el repo con las operaciones como CRUD para luego crear la lógica extra de qué hacer con c/u
// se testean las rutas
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRouter = void 0;
const express_1 = require("express");
exports.UserRouter = (0, express_1.Router)();
// // CREATE [POST]
// UserRouter.post('/', async (req: Request, res: Response) => {
//     const description: string = req.body.description as string;
//     if (!description) {
//         res.status(400)
//         return res.send({
//             message: 'No description'
//         })
//     }
//     // Si tengo mi description -> crear un nuevo User y guardarlo a la DB
//     const newUserId = await createUser(description);
//     res.status(201).send({
//         id: newUserId
//     })
// })
// // READ [GET]
// UserRouter.get('/:id', async (req: Request, res: Response) => {
//     const id: number = Number(req.params['id']) as number;
//     if (id <= 0) {
//         res.status(400);
//         return res.send({
//             error: 'Invalid Id, it must be greater than 0'
//         })
//     }
//     const userFetched = await fetchUserById(id);
//     if (!userFetched) {
//         res.status(400)
//         return res.send({
//             error: "Id not found"
//         })
//     }
//     // If we get here, the Id exists
//     res.send(userFetched)
//     // Esto solito igual funciona pero es menos sólido
//     // User.findByPk(req.params.id).then((result) =>{
//     //     res.json(result)
//     // })
// })
// // // UPDATE
// UserRouter.put('/:id', async (req: Request, res: Response) => {
//     const id: number = Number(req.params['id']) as number;
//     if (id <= 0) {
//         res.status(400);
//         return res.send({
//             error: 'Invalid Id, it must be greater than 0'
//         })
//     }
//     const body = req.body.is_completed;
//     const affectedRows = await updateUserById(id, body);
//     if (!affectedRows) {
//         res.status(400)
//         return res.send({
//             error: "Something went wrong"
//         })
//     }
//     if (affectedRows[0] === 0) {
//         res.status(400)
//         return res.send({
//             error: "Update failed"
//         })
//     }
//     // If we get here, the Id exists
//     const userFetched = await fetchUserById(id);
//     res.status(200);
//     return res.send(affectedRows);
//     // User.update({
//     //     // is_completed: req.body.is_completed,
//     //     description: req.body.description,
//     // },{
//     //     where: {
//     //         id: req.params.id,
//     //     }
//     // }).then((result: any) => {
//     //     res.json(result);
//     // })
// })
// // DELETE
// UserRouter.delete('/:id', async (req: Request, res: Response) => {
//     const id: number = Number(req.params['id']) as number;
//     if (id <= 0) {
//         res.status(400);
//         return res.send({
//             error: 'Invalid Id, it must be greater than 0'
//         })
//     }
//     const deletedRows = await deleteUserById(id);
//     if (!deletedRows) {
//         return res.status(400).send({
//             error: 'Cannot delete'
//         })
//     }
//     // If we get here, the Id exists
//     return res.status(200).send({
//         message: `Row with ID ${id} deleted successfully`
//     });
//     // return res.sendStatus(200);
// })
