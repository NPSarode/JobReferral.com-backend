import jsonwebtoken from 'jsonwebtoken'

export const isAuthenticate = async (request, response, next) => {

    try {

        const token = request.headers['authorization']

        const isTrue = jsonwebtoken.verify(token, process.env.JWT_PRIVATE_KEY, (err, id) => {
            
            if ( err ) {

            return  response.status(401).json({
                    status: false,
                    message: "Unauthorized User"
                })
            }

            return id
         })

        if ( isTrue )
            next()

    } catch (error) {
        
        console.log(error)

    }
}