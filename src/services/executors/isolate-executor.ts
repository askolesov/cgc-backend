import { IExecutor } from './iexecutor';

export class IsolateExecutor implements IExecutor {
    constructor(private sourceCode: string) {}

    // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/no-unused-vars
    execute<T>(functionName: string, ...arguments_: any[]): T {
        // eslint-disable-next-line no-eval
        return eval(`${this.sourceCode};${functionName}(...arguments_);`) as T;
    }
}
