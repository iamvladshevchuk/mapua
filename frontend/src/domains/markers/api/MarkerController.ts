import axios from 'axios'

export default class MarkerController {
    static async index(): Promise<Resources.Marker[]> {
        const result = await axios.get('/api/markers')
        return result.data
    }
    
    static async store(data: Omit<Resources.Marker, "id" | "date">): Promise<Resources.Marker> {
        const result = await axios.post('/api/markers', data)
        return result.data
    }
}