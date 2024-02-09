import { Company_Details } from '../Modals/comapnyDetail.js'


export const getCompanyList = async (request, response) => {
    try {
        
        const details = await Company_Details.find({})

        response.status(200).json({
            status: true,
            details
        })

    } catch (error) {
        response.json({
            status: false,
            message: "Opps Error! try again."
        })
    }
}

export const addCompanyDetails = async (request, response) => {
    try {

        const { name, post, last_date, description, referrer_id } = request.body

        const details = await Company_Details.create({ name, post, last_date, description })

        if (details) {
            response.status(200).json({
                status: true,
                details
            })
        } else {
            return
        }

    } catch (error) {
        console.log(error)
        response.json({
            status: false,
            message: "Opps Error! try again."
        })
    }
}