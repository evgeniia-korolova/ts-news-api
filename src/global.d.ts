declare module '*.css' {
    const content: Record<string, string>;
    export default content;
}

declare global {
    namespace NodeJS {
        interface ProcessEnv {
            NODE_ENV: 'development' | 'production';
            API_URL: string;
            API_KEY: string;
        }
    }
}
