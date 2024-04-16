'use client'
import React, { useState, useEffect } from 'react';
import ArticuloServer from './ArticuloServer';

interface Articulo {
    id: string;
    titulo: string;
    cuerpo: string;
    autor: string;
}

//Cuando haces una llamada a la API para crear o actualizar un artículo, parece que la respuesta de la API incluye un objeto con las propiedades success y articulo.
interface ApiResponse {
    success: boolean;
    articulo: Articulo;
}

export default function ArticuloClient() {
    const [articulos, setArticulos] = useState<Articulo[]>([]);
    const [titulo, setTitulo] = useState<string>('');
    const [cuerpo, setCuerpo] = useState<string>('');
    const [autor, setAutor] = useState<string>('');
    const [isEditing, setIsEditing] = useState<boolean>(false);
    const [editingId, setEditingId] = useState<string | null>(null);

    async function fetchData() {
        try {
            // @ts-ignore
            const data: Articulo[] = await ArticuloServer.getArticulos();
            setArticulos(data);
        } catch (error) {
            console.error('Error al obtener los artículos:', error);
        }
    }

    useEffect(() => {
        fetchData();
    }, []);

    const handleCreate = async (event: React.FormEvent) => {
        event.preventDefault();
        try {
            // @ts-ignore
            const response: ApiResponse = await ArticuloServer.createArticulo(titulo, cuerpo, autor);
            if (response.success) {
                setArticulos([...articulos, response.articulo]);
                // Limpiar los campos después de la creación
                setTitulo('');
                setCuerpo('');
                setAutor('');
            }

        } catch (error) {
            console.error('Error al crear el artículo:', error);
        }
    };

    const handleUpdate = async (event: React.FormEvent) => {
        event.preventDefault();
        if (isEditing && editingId) {
            try {
                // @ts-ignore
                const response: ApiResponse = await ArticuloServer.updateArticulo(editingId, titulo, cuerpo, autor);
                if (response.success) {
                    setArticulos(articulos.map(art => art.id === editingId ? response.articulo : art));
                    // Restablecer el formulario y salir del modo de edición
                    setTitulo('');
                    setCuerpo('');
                    setAutor('');
                    setIsEditing(false);
                    setEditingId(null);
                }

            } catch (error) {
                console.error('Error al actualizar el artículo:', error);
            }
        }
    };

    const handleDelete = async (id: string) => {
        try {
            await ArticuloServer.deleteArticulo(id);
            setArticulos(articulos.filter(art => art.id !== id));
        } catch (error) {
            console.error('Error al eliminar el artículo:', error);
        }
    };

    const startEdit = (articulo: Articulo) => {
        setEditingId(articulo.id);
        setTitulo(articulo.titulo);
        setCuerpo(articulo.cuerpo);
        setAutor(articulo.autor);
        setIsEditing(true);
    };

    return (
        <div>
            <form onSubmit={isEditing ? handleUpdate : handleCreate}>
                <div className="mb-3">
                    <label htmlFor="formTitulo" className="form-label">Título</label>
                    <input
                        type="text"
                        className="form-control"
                        id="formTitulo"
                        placeholder="Ingrese el título"
                        value={titulo}
                        onChange={(e) => setTitulo(e.target.value)}
                        minLength={5}
                        maxLength={200}
                    />
                </div>

                <div className="mb-3">
                    <label htmlFor="formCuerpo" className="form-label">Cuerpo</label>
                    <textarea
                        className="form-control"
                        id="formCuerpo"
                        rows={3}
                        placeholder="Ingrese el cuerpo"
                        value={cuerpo}
                        onChange={(e) => setCuerpo(e.target.value)}
                        minLength={5}
                        maxLength={200}
                    />
                </div>

                <div className="mb-3">
                    <label htmlFor="formAutor" className="form-label">Autor</label>
                    <input
                        type="text"
                        className="form-control"
                        id="formAutor"
                        placeholder="Ingrese el autor"
                        value={autor}
                        onChange={(e) => setAutor(e.target.value)}
                        minLength={5}
                        maxLength={200}
                    />
                </div>

                <button type="submit" className="btn btn-primary">
                    {isEditing ? 'Actualizar' : 'Crear'}
                </button>
            </form>

            <div style={{ display: 'flex', justifyContent: 'center' }}>
                <table className="table table-bordered">
                    <thead>
                        <tr>
                            <th scope="col">Numero</th>
                            <th scope="col">Título</th>
                            <th scope="col">Cuerpo</th>
                            <th scope="col">Autor</th>
                            <th scope="col">Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {articulos.map((articulo: Articulo) => (
                            <tr key={articulo.id}>
                                <td>{articulo.id}</td>
                                <td>{articulo.titulo}</td>
                                <td>{articulo.cuerpo}</td>
                                <td>{articulo.autor}</td>
                                <td>
                                    <button type="button" className="btn btn-primary" onClick={() => startEdit(articulo)}>
                                        Editar
                                    </button>
                                    <button type="button" className="btn btn-danger" onClick={() => handleDelete(articulo.id)}>
                                        Eliminar
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
