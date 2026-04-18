export declare class AuthService {
    register(userData: any): Promise<{
        token: string;
        user: {
            id: any;
            name: any;
            role: any;
        };
    }>;
    login(credentials: any): Promise<{
        token: string;
        user: {
            id: any;
            name: any;
            role: any;
        };
    }>;
    private generateToken;
}
