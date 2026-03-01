import { z, ZodError } from 'zod';

const schema = z.object({ email: z.string(), password: z.string(), name: z.string() });

async function run() {
    try {
        await schema.parseAsync({ email: "test@test.com", password: "pass" });
    } catch (error) {
        console.log("instanceof ZodError:", error instanceof ZodError);
        console.log("issues is set:", !!(error as any).issues);
        console.log("errors is set:", !!(error as any).errors);
        if (error instanceof ZodError) {
            try {
                const msgs = (error as any).errors.map((e: any) => e.message);
                console.log("map worked:", msgs);
            } catch (e: any) {
                console.log("map failed:", e.message);
            }
        }
    }
}
run();
