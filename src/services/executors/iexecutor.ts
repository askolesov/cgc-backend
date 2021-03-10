export interface IExecutor {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    execute<T>(functionName: string, ...arguments_: any[]): T;
}
