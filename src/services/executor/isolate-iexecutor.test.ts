import { expect } from 'chai';
import { describe } from 'mocha';
import { IsolateExecutor } from './isolate-executor';

describe('Isolate executor', () => {
    it('executes empty function', () => {
        new IsolateExecutor('function main() {}', 'main').execute();
    });

    it('returns string', () => {
        const result = new IsolateExecutor("function main() {return 'black cat'}", 'main').execute<string>();
        expect(result).to.equal('black cat');
    });

    it('returns object', () => {
        const result = new IsolateExecutor("function main() {return {a: 1, b: 'str'}}", 'main').execute();
        expect(result).to.deep.equal({ a: 1, b: 'str' });
    });

    it('takes string', () => {
        const result = new IsolateExecutor('function main(str) { return "Hello, " + str + "!";}', 'main').execute(
            'Alex',
        );
        expect(result).to.equal('Hello, Alex!');
    });

    it('takes object', () => {
        const result = new IsolateExecutor('function main(obj) { obj.age = 34; return obj;}', 'main').execute({
            name: 'alex',
        });
        expect(result).to.deep.equal({ name: 'alex', age: 34 });
    });

    it('takes and calls callback', () => {
        const isolate = new IsolateExecutor('function main(callback) { callback(2); }', 'main').closure();

        const context = { value: 0 };
        const callback = (x: number) => (context.value = x);

        isolate(callback);
        expect(context).to.deep.equal({ value: 2 });
    });

    it('works with nested isolates', () => {
        const increment = new IsolateExecutor('function inc(val) { return val + 1 }', 'inc').closure();
        const mapAndIncrement = new IsolateExecutor(
            'function mapinc(fn, val) { return fn(val) + 1; }',
            'mapinc',
        ).closure();

        const result = mapAndIncrement(increment, 10);
        expect(result).to.equal(12);
    });

    it('passes exception from isolate to host', () => {
        const thrower = new IsolateExecutor('function main() { throw "error"; }', 'main').closure();
        expect(thrower).to.throw('error');
    });

    it('passes exception from host (callback) to isolate', () => {
        const isolate = new IsolateExecutor('function main(cb) { cb(); }', 'main').closure();

        // eslint-disable-next-line unicorn/consistent-function-scoping
        const thrower = () => {
            throw new Error('error');
        };

        expect(() => {
            isolate(thrower);
        }).to.throw('error');
    });

    it('catches exception in isolate', () => {
        const isolate = new IsolateExecutor(
            `function main(cb) {
                try {
                    cb();
                    return "not catched"; }
                catch {
                    return "catched";
                }
            }`,
            'main',
        ).closure();

        // eslint-disable-next-line unicorn/consistent-function-scoping
        const thrower = () => {
            throw new Error('error');
        };

        expect(isolate(thrower)).to.equal('catched');
    });

    it('forces time limit', () => {
        const looper = new IsolateExecutor('function main() { while(1) {} }', 'main', 32, 100).closure();
        expect(looper).to.throw('Script execution timed out');
    });

    it('forces memory limit', () => {
        const looper = new IsolateExecutor(
            'function main() { let arr = []; while(1) { arr.push(0); } }',
            'main',
            8,
            10000,
        ).closure();
        expect(looper).to.throw('Isolate was disposed during execution due to memory limit');
    });
});
