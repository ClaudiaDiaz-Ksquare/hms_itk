"use strict";
// Allow a patient to sign up to your system by creating an endpoint without needing to authenticate 
// Only allow admin users to be created via your DBMS shell and not expose this role to your server by any means. 
// Create a login endpoint where you need to compare the password via Hashing (you can skip all of this if you wish by using Firebase) and return a session token using JWT 
// Create a middleware that will check if a user is authenticated and what role it has 
// A user can call an endpoint to disable its account (this is a soft-delete operation) is_active = true|false 
// These requirements can be changed later. 
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.isAuthenticated = void 0;
const admin = __importStar(require("firebase-admin"));
// Esto es un middleware -> SOLO acepta estos 3 params: req res next
// Bearer eyJhbGciOiJSUzI1NiIsImtpZCI6ImFmZjFlNDJlNDE0M2I4MTQxM2VjMTI1MzQwOTcwODUxZThiNDdiM2YiLCJ0eXAiOiJKV1QifQ.eyJuYW1lIjoiQ2xhdWRpYSIsInJvbGUiOiJwYXRpZW50IiwiaXNzIjoiaHR0cHM6Ly9zZWN1cmV0b2tlbi5nb29nbGUuY29tL2htcy1pdGstNjA2MjEiLCJhdWQiOiJobXMtaXRrLTYwNjIxIiwiYXV0aF90aW1lIjoxNjcxNDkwMzQ4LCJ1c2VyX2lkIjoiakNNTUgzdmJuOGR2TTJGR0lWSVR6SDgzWWZlMiIsInN1YiI6ImpDTU1IM3Zibjhkdk0yRkdJVklUekg4M1lmZTIiLCJpYXQiOjE2NzE0OTAzNDgsImV4cCI6MTY3MTQ5Mzk0OCwiZW1haWwiOiJjbGF1ZGlhQGhvdG1haWwuY29tIiwiZW1haWxfdmVyaWZpZWQiOmZhbHNlLCJmaXJlYmFzZSI6eyJpZGVudGl0aWVzIjp7ImVtYWlsIjpbImNsYXVkaWFAaG90bWFpbC5jb20iXX0sInNpZ25faW5fcHJvdmlkZXIiOiJwYXNzd29yZCJ9fQ.L28egOlf95JfJ-b7Yx4gB0HceLKDLtY3CcddF9padf2e3PMRE4vbQfX5Q9llU8v3nEbmaIkbtRFlwLNsxypLhCFtJneu43pHm0rbIy2PGnYjvTzj-QkA9Cxp2j6wjgyhPuoRLbBT03lKMPIera7hwYYlT8j6nsNQFnKGU4CsLYMd9VU-gUuPQGMXLOBa9Hwftl28pJaAiHghXPP0i-pWqmiLEosdw6ELg4b9asY9723Ge-O0jpYLgDQ3gC0kEKDRlenFGKfMkzSY69bGuwghmzI1pNkU3nFLUlm7j9_HLyyzE-MX_t9tVk_HQ2B3MRVTqv_kkkSHfQIeZgmZINrO5A
// Auth 4. Create a middleware that will check if a user is authenticated and what role it has 
const isAuthenticated = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    // No authorization header
    const { authorization } = req.headers;
    if (!authorization) {
        return res.status(401).send({ error: 'No auth' });
    }
    // No correct scheme (Bearer)
    if (!authorization.startsWith("Bearer")) {
        return res.status(401).send({ error: 'No auth' });
    }
    // Check if the token is valid
    const splittedToken = authorization.split('Bearer ');
    if (splittedToken.length !== 2) {
        return res.status(401).send({ error: 'No auth' });
    }
    const token = splittedToken[1];
    try {
        const decodedToken = yield admin.auth().verifyIdToken(token);
        res.locals = Object.assign(Object.assign({}, res.locals), { email: decodedToken.email, uid: decodedToken.uid, role: decodedToken.role });
        return next();
    }
    catch (error) {
        console.error(error);
        return res.status(401).send({ error: 'No auth' });
    }
});
exports.isAuthenticated = isAuthenticated;
