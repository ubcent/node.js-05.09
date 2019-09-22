const express = require('express');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.static('build'));

app.listen(PORT, () => {
    console.log(`Server listening on: ${PORT}`);
});
