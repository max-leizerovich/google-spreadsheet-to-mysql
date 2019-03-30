export async function func1() {
    return new Promise(resolve => {
        console.log('something');
        resolve('else??');
    })
}
