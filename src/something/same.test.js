import { same } from './same';

describe('describe same me', () => {
    it('Should return same', () => {
        const resolved = same();
        expect(resolved).toMatchSnapshot();
    });
});
