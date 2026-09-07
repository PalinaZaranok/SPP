
import express from 'express';
import path from 'path';
import ssrRoutes from './routes/ssrRoutes';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname, '../src/public')));
app.use('/uploads', express.static(path.join(__dirname, '../uploads')));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '../src/public/views'));



app.use(ssrRoutes);


app.use((err: any, req: any, res: any, next: any) => {
    console.error(err);
    res.status(500).send('Something is wrong');
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});