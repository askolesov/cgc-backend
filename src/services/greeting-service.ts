class GreetingService {
    public sayHello(name: string) {
        return `Hello, ${name}!`;
    }
}

export const greetingService = new GreetingService();
