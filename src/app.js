import { func1 } from './something/some-file';

(async () => {
    const a = 'haha';
    console.log({ a });
    const str = await func1();
    console.log({ str });
})();
