import jestOpenAPI from 'jest-openapi';
import path from "path";
import app from './app';
import request from 'supertest';


jestOpenAPI(path.join(__dirname, './openapi.spec.json'));


describe('app.js', () => {
    it('should make a GET request and satisfy OpenAPI spec', async () => {

        const res = await request(app).get('/v1/messages/user/1');

        expect(res.status).toEqual(200);

        expect(res).toSatisfyApiSpec();
    });
    it('should make a GET request and fail OpenAPI spec', async () => {

        const res = await request(app).get('/v1/messages/user/asdjgoiasd');

        expect(res.status).toEqual(500);

        expect(res).not.toSatisfyApiSpec();
    });
    it('should make a post request and satisfy OpenAPI spec', async () => {

        const payload={toUserId:1, message:"secret"};
        const res = await request(app).post('/v1/messages').send(payload);

        expect(res.status).toEqual(200);


        expect(res).toSatisfyApiSpec();

        const res2 = await request(app).get('/v1/messages/user/1');
        expect(res2.status).toEqual(200);
        expect(res2).toSatisfyApiSpec();
    });
    it('should make a post request and fail OpenAPI spec', async () => {

        const payload={toUserId:"1", message:"secret"};
        const res = await request(app).post('/v1/messages').send(payload);

        expect(res.status).toEqual(500);


        expect(res).toSatisfyApiSpec();

    });
});
