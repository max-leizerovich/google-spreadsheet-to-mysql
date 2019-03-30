import { func1 } from './some-file';

describe('describe me', () => {
    it('Should return something', async () => {
        const resolved = await func1();
        expect(resolved).toEqual('else??');
    });
});
