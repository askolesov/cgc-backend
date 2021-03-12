import { expect } from 'chai';
import { describe } from 'mocha';
import { EvalExecutor } from './eval-executor';
import { IsolateExecutor } from './isolate-executor';

const executors = [IsolateExecutor, EvalExecutor];

for (const ExecutorTypeReference of executors) {
    describe(ExecutorTypeReference.name, () => {
        it('executes empty function', () => {
            const code = 'function main() {}';
            const executor = new ExecutorTypeReference(code);
            executor.execute('main');
        });

        it('returns string', () => {
            const code = "function main() {return 'black cat'}";
            const executor = new ExecutorTypeReference(code);
            const result = executor.execute<string>('main');

            expect(result).to.equal('black cat');
        });

        it('returns object', () => {
            const code = "function main() {return {a: 1, b: 'str'}}";
            const executor = new ExecutorTypeReference(code);
            const result = executor.execute<string>('main');

            expect(result).to.deep.equal({ a: 1, b: 'str' });
        });

        it('takes object', () => {
            const code = 'function main(obj) { obj.age = 34; return obj;}';
            const executor = new ExecutorTypeReference(code);
            const result = executor.execute<string>('main', { name: 'alex' });

            expect(result).to.deep.equal({ name: 'alex', age: 34 });
        });

        it('takes and calls callback', () => {
            const code = 'function main(f) { f(2); }';
            const executor = new ExecutorTypeReference(code);

            const context = { value: 0 };
            const closure = (x: number) => (context.value = x);

            executor.execute<string>('main', closure);
            expect(context).to.deep.equal({ value: 2 });
        });
    });
}
