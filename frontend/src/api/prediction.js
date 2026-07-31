import api from "./api";

export const uploadImage = async (formData) => {
    try {
        const response = await api.post("/predict", formData)

        console.log(response.data)

        return response.data

    } catch (err) {

        console.error(err)

        throw err
    }
}