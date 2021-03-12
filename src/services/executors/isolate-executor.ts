import { Isolate } from 'isolated-vm';
import { IExecutor } from './iexecutor';

/* eslint-disable @typescript-eslint/no-explicit-any, @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call */
export class IsolateExecutor implements IExecutor {
    private ivm: any;

    constructor(private sourceCode: string, memoryLimitMb = 32) {
        this.ivm = new Isolate({ memoryLimit: memoryLimitMb });
    }

    execute<T>(functionName: string, ...arguments_: any[]): T {
        // Creating context
        const context = this.ivm.createContextSync();

        // Evaluating source code
        context.evalSync(this.sourceCode);

        // Passing arguments: functions as references, other values by copying
        const jail = context.global;
        jail.setSync('global', jail.derefInto()); // Making global object accessible globally ;)
        context.evalClosureSync(`global.args = [];`);

        for (const argument of arguments_) {
            if (typeof argument === 'function') {
                context.evalClosureSync(
                    `args.push(function(...args) {
                    $0.applySync(undefined, args, { arguments: { copy: true } });
                })`,
                    [argument],
                    { arguments: { reference: true } },
                );
            } else {
                context.evalClosureSync(`args.push($0);`, [argument], { arguments: { copy: true } });
            }
        }

        // Calling the entry point with passed args
        const result = context.evalClosureSync(`return ${functionName}(...args);`, [], {
            result: { copy: true },
        });

        // Returning result
        context.release();
        return result.result as T;
    }
}
/* eslint-enable @typescript-eslint/no-explicit-any, @typescript-eslint/no-unsafe-member-access */
/* eslint-enable @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call */
