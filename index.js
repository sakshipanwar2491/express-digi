import express from 'express';
const app = express();

app.use(express.json());
let data = []
let nextId = 1

app.get('/', (req, res) => {
    res.send(data);
    console.log('hostname: ' + data);
});

app.post('/addData', (req, res) => {
    const { name } = req.body;
    const newData = { id: nextId++, name }
    data.push(newData)
    console.log('Data added: ', newData);
    res.status(201).send(newData)
});

app.delete('/deleteData/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const index = data.findIndex((item) => item.id === id);
    if (index === -1) {
        return res.status(404).send('Data not found');
    }
    data.splice(index, 1);
    console.log(`Data with id ${id} deleted`, data);
    res.status(204).send(data);
});

app.listen(4001, () => {
    console.log('Server is running on http://localhost:4001');
});