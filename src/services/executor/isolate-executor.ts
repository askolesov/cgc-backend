import { Isolate } from 'isolated-vm';

/* eslint-disable @typescript-eslint/no-explicit-any, @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call */
export class IsolateExecutor {
    private ivm: any;

    constructor(
        private sourceCode: string,
        private entryPoint: string,
        memoryLimitMb = 32,
        private timeLimitMs: number = 2000,
    ) {
        this.ivm = new Isolate({ memoryLimit: memoryLimitMb });
    }

    execute<T>(...arguments_: any[]): T {
        // Creating context
        const context = this.ivm.createContextSync();

        // Passing arguments: functions as references, other parameters by value
        const jail = context.global;
        jail.setSync('global', jail.derefInto()); // Making global object accessible
        context.evalClosureSync(`global.args = [];`);

        for (const argument of arguments_) {
            if (typeof argument === 'function') {
                context.evalClosureSync(
                    `args.push(function(...args) {
                    return $0.applySync(undefined, args, { arguments: { copy: true }, result: { copy: true } });
                })`,
                    [argument],
                    { arguments: { reference: true } },
                );
            } else {
                context.evalClosureSync(`args.push($0);`, [argument], { arguments: { copy: true } });
            }
        }

        // Calling the entry point with passed args
        const result = context.evalSync(`${this.sourceCode}; ${this.entryPoint}(...args)`, {
            timeout: this.timeLimitMs,
            copy: true,
        });

        // Returning result
        context.release();
        return result.result as T;
    }

    closure<T>(): (...arguments_: any[]) => T {
        return (...arguments_: any[]) => this.execute<T>(...arguments_);
    }
}
/* eslint-enable @typescript-eslint/no-explicit-any, @typescript-eslint/no-unsafe-member-access */
/* eslint-enable @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call */
