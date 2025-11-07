import express, { type NextFunction, type Request, type Response } from 'express';
import 'express-async-errors';
import { router } from './routes';
import cors from 'cors';
import path from 'path';

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(cors())
app.use(router);

app.use('/files',express.static(path.resolve(__dirname, '..', 'tmp')))

/**
 * Middleware de erro
 */
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    if (err instanceof Error) {
        // Se for uma instancia do tipo erro
        return res.status(400).json({ error: err.message });
    }

    return res.status(500).json({ status: "error", message: "internal server error" })
})

app.listen(PORT, () => {
    console.log(`Rodando na porta: ${PORT}`);
});   