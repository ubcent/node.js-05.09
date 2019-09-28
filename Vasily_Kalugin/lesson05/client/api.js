const protocol = 'http';
const domen = 'localhost';
const port = 8080;

export const rootURL = `${protocol}://${domen}:${port}`;

export async function fetch(URL, options) {
    try {
        const response = await fetch(URL, options);
        if (response.ok) {
            return await response.toJson();
        } else {
            throw new Error();
        }
    } catch (err) {
        return err;
    }
}
