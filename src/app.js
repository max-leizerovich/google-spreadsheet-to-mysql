import { func1 } from './something/some-file';

const a = 'haha';
console.log({ a });
func1().then(str => {
    console.log({ str });
})
