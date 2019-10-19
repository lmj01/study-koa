module.exports = {
    isLogin: (ctx)=>{
        if (ctx.session && ctx.session.user) {
            return true;
        }
        return false;
    }
}