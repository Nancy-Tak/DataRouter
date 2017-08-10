/**
 * Created by Ethan on 2016/12/23.
 * 21:58
 *
 */
import cookie from 'react-cookie';
//获取COOKIS 权限 fuck
const authFun = function(id, callback) {
    let authObj;
    let auth = cookie.load('DRM_AUTH');
    let username = cookie.load('DRM_USERNAME');
    if(auth) {
        let auths = auth.split("-");
        let authObj = [];
        for(var i = 0; i < auths.length; i++) {
            var obj = {};
            obj.key = auths[i];
            authObj.push(obj);
        }
        return authObj;
        
    }
};
function checkAuth(ids, replace, urls) {
    let auth = authFun();
    if(!auth) {
        replace && replace('', '/');
        return false;
    }
    for(let i = 0; i < auth.length; i++) {
        let authItem = auth[i];
        for(let j = 0; j < ids.length; j++) {
            let id = ids[j];
            if(authItem.key && id === authItem.key) {
                replace && replace('', urls[j]);
                return;
            }
        }
    }
    return;
}
function getAuth(id) {
    let auth = authFun();
    // console.log(auth)
    if(!auth) {
        replace && replace('', '/');
        return false;
    }
    for(let i = 0; i < auth.length; i++) {
        let authItem = auth[i];
        if(authItem.key && id === authItem.key) {
            return true;
        }
    }
    return false;
};
export default  {
    checkAuth,
    getAuth
}