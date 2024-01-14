import jsonwebtoken from 'jsonwebtoken'

export const isAuthenticate = async (request, response, next) => {

    try {
        
        const token = request.headers['authorization'].split(' ')[1]

        const isTrue = jsonwebtoken.verify(token, process.env.JWT_PRIVATE_KEY, (err, id) => {
            
            if ( err ) {

            return  response.json({
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