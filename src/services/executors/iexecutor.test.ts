import { expect } from 'chai';
import { describe } from 'mocha';
import { EvalExecutor } from './eval-executor';
import { IsolateExecutor } from './isolate-executor';

const executors = [EvalExecutor, IsolateExecutor];

for (const ExecutorTypeReference of executors) {
    describe(ExecutorTypeReference.name, () => {
        it('calls code', () => {
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
        it('summs different types', () => {
            const code = 'function main(a, b) {return a + b}';
            const executor = new ExecutorTypeReference(code);

            const result1 = executor.execute<string>('main', 'ab', 'ba');
            expect(result1).to.equal('abba');

            const result2 = executor.execute<number>('main', 2, 3);
            expect(result2).to.equal(5);
        });
    });
}
