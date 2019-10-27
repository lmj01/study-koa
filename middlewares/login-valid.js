module.exports = {
    isLogin: (ctx)=>{
        if (ctx.session && ctx.session.uuid) {
            return true;
        }
        return false;
    }
}