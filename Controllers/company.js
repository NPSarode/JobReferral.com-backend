import { Company_Details } from '../Modals/comapnyDetail.js'


export const getCompanyList = async (request, response) => {
    try {
        
        const details = await Company_Details.find({}).catch(err=>console.log(err))

        response.status(200).json({
            success: true,
            details
        })

    } catch (error) {
        response.json({
            success: false,
            message: "Opps Error! try again."
        })
    }
}

export const addCompanyDetails = async (request, response) => {
    try {

        const { name, post, last_date, description, referrer_id } = request.body

        const details = await Company_Details.create({ name, post, last_date, description, referrer_id })

        if (details) {
            response.status(200).json({
                success: true,
                details
            })
        } else {
            return
        }

    } catch (error) {
        console.log(error)
        response.json({
            success: false,
            message: "Opps Error! try again."
        })
    }
}