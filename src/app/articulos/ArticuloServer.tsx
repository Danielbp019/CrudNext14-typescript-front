// ArticuloServer.tsx
import axios, { AxiosResponse } from 'axios';

interface Articulo {
    titulo: string;
    cuerpo: string;
    autor: string;
}

class ArticuloServer {

    //Todos los articulos
    static async getArticulos(): Promise<Articulo[]> {
        try {
            const res: AxiosResponse<Articulo[]> = await axios.get('http://localhost:8000/api/articulos');
            return res.data;
        } catch (error) {
            console.error('Error al obtener los artículos:', error);
            throw error;
        }
    }

    //Crear articulo
    static async createArticulo(titulo: string, cuerpo: string, autor: string): Promise<Articulo> {
        try {
            const res: AxiosResponse<Articulo> = await axios.post('http://localhost:8000/api/articulos', { titulo, cuerpo, autor });
            return res.data;
        } catch (error) {
            console.error('Error al crear el artículo:', error);
            throw error;
        }
    }

    //Actualizar articulo
    static async updateArticulo(id: string, titulo: string, cuerpo: string, autor: string): Promise<Articulo> {
        try {
            const res: AxiosResponse<Articulo> = await axios.put(`http://localhost:8000/api/articulos/${id}`, { titulo, cuerpo, autor });
            return res.data;
        } catch (error) {
            console.error('Error al actualizar el artículo:', error);
            throw error;
        }
    }

    //Borrar articulo
    static async deleteArticulo(id: string): Promise<void> {
        try {
            await axios.delete(`http://localhost:8000/api/articulos/${id}`);
        } catch (error) {
            console.error('Error al eliminar el artículo:', error);
            throw error;
        }
    }
}

export default ArticuloServer;
