const config = {
    production: {
        SECRET: process.env.SECRET,
        DATABASE: process.env.MONGODB_URI,
    }, 
    default:{
        SECRET: 'SUPERSECRETPASSWORD123',
        DATABASE: 'mongodb+srv://hawker:hawker21@cluster0.1ny8q.mongodb.net/ashwin?retryWrites=true&w=majority',
        
    }
} 

exports.get = function get(env){
    return config[env] || config.default
}