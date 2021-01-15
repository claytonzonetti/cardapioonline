function onlyUsers(req, res, next) {
    console.log('users aqui')
    if (!req.session.userId)
        return res.redirect('/users/login')
    
    next()
}

function onlyUsersAdm(req, res, next) {
    console.log(' adm aqui')
    console.log(req.session.token)
    
    if (req.session.token != 'ADM')
        return res.redirect('/users/login')
    
    next()
}


function isLoggedRedirectToUsers(req, res, next) {
    if (req.session.userId)
        return res.redirect('/users')

    next()
}

module.exports = {
    onlyUsers,
    isLoggedRedirectToUsers,
    onlyUsersAdm 
}